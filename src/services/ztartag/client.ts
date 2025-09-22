// Ztartag Universal Identity Integration
import type { ZtartagAuthResponse } from '../../types/api';
import type { ZtartagProfile } from '../../types/user';

const ZTARTAG_API_BASE = import.meta.env.VITE_ZTARTAG_API_URL || 'https://api.ztartag.com';
const ZTARTAG_CLIENT_ID = import.meta.env.VITE_ZTARTAG_CLIENT_ID || 'your-ztartag-client-id';

export class ZtartagService {
  private static instance: ZtartagService;
  private accessToken: string | null = null;

  private constructor() {
    // Load token from localStorage if available
    this.accessToken = localStorage.getItem('ztartag_access_token');
  }

  public static getInstance(): ZtartagService {
    if (!ZtartagService.instance) {
      ZtartagService.instance = new ZtartagService();
    }
    return ZtartagService.instance;
  }

  /**
   * Initiate OAuth flow with Ztartag
   */
  public async initiateAuth(): Promise<string> {
    const state = crypto.randomUUID();
    const nonce = crypto.randomUUID();
    
    // Store state and nonce for validation
    localStorage.setItem('ztartag_auth_state', state);
    localStorage.setItem('ztartag_auth_nonce', nonce);
    
    const params = new URLSearchParams({
      client_id: ZTARTAG_CLIENT_ID,
      response_type: 'code',
      scope: 'profile email wallet',
      redirect_uri: `${window.location.origin}/auth/ztartag/callback`,
      state,
      nonce,
    });

    const authUrl = `${ZTARTAG_API_BASE}/oauth/authorize?${params.toString()}`;
    
    // Open in popup or redirect
    if (window.innerWidth < 768) {
      // Mobile: redirect
      window.location.href = authUrl;
      return authUrl;
    } else {
      // Desktop: popup
      const popup = window.open(
        authUrl,
        'ztartag-auth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );
      
      return new Promise((resolve, reject) => {
        const checkClosed = setInterval(() => {
          if (popup?.closed) {
            clearInterval(checkClosed);
            reject(new Error('Authentication popup was closed'));
          }
        }, 1000);

        // Listen for message from popup
        const messageHandler = (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;
          
          if (event.data.type === 'ZTARTAG_AUTH_SUCCESS') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageHandler);
            popup?.close();
            resolve(event.data.code);
          } else if (event.data.type === 'ZTARTAG_AUTH_ERROR') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageHandler);
            popup?.close();
            reject(new Error(event.data.error));
          }
        };

        window.addEventListener('message', messageHandler);
      });
    }
  }

  /**
   * Exchange authorization code for access token
   */
  public async exchangeCodeForToken(code: string, state: string): Promise<ZtartagAuthResponse> {
    const storedState = localStorage.getItem('ztartag_auth_state');
    const storedNonce = localStorage.getItem('ztartag_auth_nonce');

    if (state !== storedState) {
      throw new Error('Invalid state parameter');
    }

    const response = await fetch(`${ZTARTAG_API_BASE}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: ZTARTAG_CLIENT_ID,
        client_secret: import.meta.env.VITE_ZTARTAG_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${window.location.origin}/auth/ztartag/callback`,
        nonce: storedNonce,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const authData: ZtartagAuthResponse = await response.json();
    
    // Store tokens
    this.accessToken = authData.access_token;
    localStorage.setItem('ztartag_access_token', authData.access_token);
    localStorage.setItem('ztartag_refresh_token', authData.refresh_token);
    
    // Clear auth state
    localStorage.removeItem('ztartag_auth_state');
    localStorage.removeItem('ztartag_auth_nonce');

    return authData;
  }

  /**
   * Get current user profile from Ztartag
   */
  public async getCurrentProfile(): Promise<ZtartagProfile | null> {
    if (!this.accessToken) {
      return null;
    }

    try {
      const response = await fetch(`${ZTARTAG_API_BASE}/api/v1/user/profile`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, try to refresh
          await this.refreshToken();
          return this.getCurrentProfile();
        }
        throw new Error('Failed to fetch profile');
      }

      const profile: ZtartagProfile = await response.json();
      return profile;
    } catch (error) {
      console.error('Error fetching Ztartag profile:', error);
      return null;
    }
  }

  /**
   * Refresh access token
   */
  public async refreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('ztartag_refresh_token');
    if (!refreshToken) {
      return false;
    }

    try {
      const response = await fetch(`${ZTARTAG_API_BASE}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: ZTARTAG_CLIENT_ID,
          client_secret: import.meta.env.VITE_ZTARTAG_CLIENT_SECRET,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        this.signOut();
        return false;
      }

      const authData: ZtartagAuthResponse = await response.json();
      
      this.accessToken = authData.access_token;
      localStorage.setItem('ztartag_access_token', authData.access_token);
      if (authData.refresh_token) {
        localStorage.setItem('ztartag_refresh_token', authData.refresh_token);
      }

      return true;
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.signOut();
      return false;
    }
  }

  /**
   * Sign out from Ztartag
   */
  public signOut(): void {
    this.accessToken = null;
    localStorage.removeItem('ztartag_access_token');
    localStorage.removeItem('ztartag_refresh_token');
    localStorage.removeItem('ztartag_auth_state');
    localStorage.removeItem('ztartag_auth_nonce');
  }

  /**
   * Check if user is authenticated with Ztartag
   */
  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  /**
   * Get user's wallet information from Ztartag
   */
  public async getWalletInfo(): Promise<any> {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${ZTARTAG_API_BASE}/api/v1/user/wallet`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch wallet info');
    }

    return response.json();
  }

  /**
   * Get user's NFT collection from Ztartag
   */
  public async getNFTCollection(): Promise<any[]> {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${ZTARTAG_API_BASE}/api/v1/user/nfts`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch NFT collection');
    }

    return response.json();
  }

  /**
   * Verify user's identity signature
   */
  public async verifySignature(message: string, signature: string): Promise<boolean> {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${ZTARTAG_API_BASE}/api/v1/user/verify-signature`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        signature,
      }),
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return result.valid === true;
  }
}

export default ZtartagService.getInstance();