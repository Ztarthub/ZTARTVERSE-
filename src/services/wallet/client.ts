// Ztart Wallet Integration
import type { WalletConnectionResponse } from '../../types/api';

export interface ZtartWalletProvider {
  isZtartWallet: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, handler: (...args: any[]) => void) => void;
  removeListener: (event: string, handler: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    ztart?: ZtartWalletProvider;
    ethereum?: any;
  }
}

export class WalletService {
  private static instance: WalletService;
  private provider: ZtartWalletProvider | null = null;
  private isConnected = false;
  private currentAccount: string | null = null;

  private constructor() {
    this.initializeProvider();
  }

  public static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  private initializeProvider(): void {
    // Check for Ztart Wallet first (preferred)
    if (window.ztart && window.ztart.isZtartWallet) {
      this.provider = window.ztart;
      console.log('Ztart Wallet detected');
    } 
    // Fallback to MetaMask or other Ethereum providers
    else if (window.ethereum) {
      this.provider = window.ethereum;
      console.log('Ethereum wallet detected');
    }

    if (this.provider) {
      this.setupEventListeners();
    }
  }

  private setupEventListeners(): void {
    if (!this.provider) return;

    this.provider.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        this.handleDisconnect();
      } else {
        this.currentAccount = accounts[0];
        this.isConnected = true;
      }
    });

    this.provider.on('chainChanged', (chainId: string) => {
      console.log('Chain changed:', chainId);
      // Handle chain change
    });

    this.provider.on('disconnect', () => {
      this.handleDisconnect();
    });
  }

  private handleDisconnect(): void {
    this.isConnected = false;
    this.currentAccount = null;
    // Notify app about disconnection
    window.dispatchEvent(new CustomEvent('wallet:disconnected'));
  }

  /**
   * Check if wallet is available
   */
  public isWalletAvailable(): boolean {
    return !!this.provider;
  }

  /**
   * Connect to wallet
   */
  public async connect(): Promise<WalletConnectionResponse> {
    if (!this.provider) {
      throw new Error('No wallet provider found. Please install Ztart Wallet or MetaMask.');
    }

    try {
      // Request account access
      const accounts = await this.provider.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      this.currentAccount = accounts[0];
      this.isConnected = true;

      // Get network info
      const chainId = await this.provider.request({
        method: 'eth_chainId',
      });

      // Get balances
      const balances = await this.getBalances();

      const response = {
        connected: true,
        address: this.currentAccount!,
        network: this.getNetworkName(chainId),
        balance: balances,
        provider: this.provider.isZtartWallet ? 'ztart' : 'ethereum',
      };

      // Notify app about connection
      window.dispatchEvent(new CustomEvent('wallet:connected', { detail: response }));

      return response;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  /**
   * Disconnect wallet
   */
  public async disconnect(): Promise<void> {
    this.isConnected = false;
    this.currentAccount = null;
    
    // Notify app about disconnection
    window.dispatchEvent(new CustomEvent('wallet:disconnected'));
  }

  /**
   * Get current connection status
   */
  public getConnectionStatus(): WalletConnectionResponse | null {
    if (!this.isConnected || !this.currentAccount) {
      return null;
    }

    return {
      connected: true,
      address: this.currentAccount!,
      network: 'unknown', // Would be fetched from provider
      balance: { ztart: 0, eth: 0, btc: 0 }, // Would be fetched from provider
      provider: this.provider?.isZtartWallet ? 'ztart' : 'ethereum',
    };
  }

  /**
   * Get token balances
   */
  public async getBalances(): Promise<{ ztart: number; eth: number; btc: number }> {
    if (!this.provider || !this.currentAccount) {
      return { ztart: 0, eth: 0, btc: 0 };
    }

    try {
      // Get ETH balance
      const ethBalance = await this.provider.request({
        method: 'eth_getBalance',
        params: [this.currentAccount, 'latest'],
      });

      const ethValue = parseInt(ethBalance, 16) / Math.pow(10, 18);

      // Get ZTART token balance (ERC-20)
      const ztartBalance = await this.getERC20Balance(
        this.currentAccount,
        import.meta.env.VITE_ZTART_TOKEN_ADDRESS || '0x...'
      );

      return {
        ztart: ztartBalance,
        eth: ethValue,
        btc: 0, // Would need separate API for Bitcoin
      };
    } catch (error) {
      console.error('Failed to get balances:', error);
      return { ztart: 0, eth: 0, btc: 0 };
    }
  }

  /**
   * Get ERC-20 token balance
   */
  private async getERC20Balance(address: string, tokenAddress: string): Promise<number> {
    if (!this.provider) return 0;

    try {
      // ERC-20 balanceOf function signature
      const data = '0x70a08231' + address.slice(2).padStart(64, '0');

      const result = await this.provider.request({
        method: 'eth_call',
        params: [
          {
            to: tokenAddress,
            data,
          },
          'latest',
        ],
      });

      const balance = parseInt(result, 16);
      return balance / Math.pow(10, 18); // Assuming 18 decimals
    } catch (error) {
      console.error('Failed to get ERC-20 balance:', error);
      return 0;
    }
  }

  /**
   * Send ZTART tokens
   */
  public async sendZtartTokens(to: string, amount: number): Promise<string> {
    if (!this.provider || !this.currentAccount) {
      throw new Error('Wallet not connected');
    }

    try {
      const tokenAddress = import.meta.env.VITE_ZTART_TOKEN_ADDRESS || '0x...';
      const value = (amount * Math.pow(10, 18)).toString(16); // Convert to wei

      // ERC-20 transfer function signature
      const transferData = '0xa9059cbb' + 
        to.slice(2).padStart(64, '0') + 
        value.padStart(64, '0');

      const txHash = await this.provider.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: this.currentAccount,
            to: tokenAddress,
            data: transferData,
            gas: '0x5208', // 21000 gas limit
          },
        ],
      });

      return txHash;
    } catch (error) {
      console.error('Failed to send ZTART tokens:', error);
      throw error;
    }
  }

  /**
   * Sign message
   */
  public async signMessage(message: string): Promise<string> {
    if (!this.provider || !this.currentAccount) {
      throw new Error('Wallet not connected');
    }

    try {
      const signature = await this.provider.request({
        method: 'personal_sign',
        params: [message, this.currentAccount],
      });

      return signature;
    } catch (error) {
      console.error('Failed to sign message:', error);
      throw error;
    }
  }

  /**
   * Get network name from chain ID
   */
  private getNetworkName(chainId: string): string {
    const networks: Record<string, string> = {
      '0x1': 'mainnet',
      '0x3': 'ropsten',
      '0x4': 'rinkeby',
      '0x5': 'goerli',
      '0x89': 'polygon',
      '0xa4b1': 'arbitrum',
    };

    return networks[chainId] || 'unknown';
  }

  /**
   * Switch to specific network
   */
  public async switchNetwork(chainId: string): Promise<void> {
    if (!this.provider) {
      throw new Error('No wallet provider');
    }

    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (error: any) {
      // If network doesn't exist, add it
      if (error.code === 4902) {
        await this.addNetwork(chainId);
      } else {
        throw error;
      }
    }
  }

  /**
   * Add new network to wallet
   */
  private async addNetwork(chainId: string): Promise<void> {
    if (!this.provider) return;

    const networks: Record<string, any> = {
      '0x89': {
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://polygon-rpc.com'],
        blockExplorerUrls: ['https://polygonscan.com'],
      },
    };

    const networkConfig = networks[chainId];
    if (!networkConfig) {
      throw new Error('Unsupported network');
    }

    await this.provider.request({
      method: 'wallet_addEthereumChain',
      params: [networkConfig],
    });
  }
}

export default WalletService.getInstance();