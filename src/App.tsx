import { useState, useEffect } from 'react';
import { User, Settings, LogOut, Wallet, Globe } from 'lucide-react';
import MapNavigation from './components/map/MapNavigation';
import UserProfile from './components/profile/UserProfile';
import type { Zone } from './types/game';
import type { User as UserType } from './types/user';
import ZtartagService from './services/ztartag/client';
import WalletService from './services/wallet/client';

function App() {
  const [currentView, setCurrentView] = useState<'map' | 'profile' | 'zone'>('map');
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentZone, setCurrentZone] = useState<Zone | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthStatus();
    checkWalletConnection();
  }, []);

  const checkAuthStatus = async () => {
    const isAuth = ZtartagService.isAuthenticated();
    setIsAuthenticated(isAuth);
    
    if (isAuth) {
      try {
        const profile = await ZtartagService.getCurrentProfile();
        if (profile) {
          // Here you would typically create a full User object
          // For now, we'll use null and let UserProfile create a mock user
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    }
  };

  const checkWalletConnection = () => {
    const status = WalletService.getConnectionStatus();
    setWalletConnected(status?.connected || false);
  };

  const handleAuthWithZtartag = async () => {
    try {
      await ZtartagService.initiateAuth();
      // The actual token exchange would happen in the callback
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const handleConnectWallet = async () => {
    try {
      const result = await WalletService.connect();
      setWalletConnected(result.connected);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const handleSignOut = () => {
    ZtartagService.signOut();
    WalletService.disconnect();
    setIsAuthenticated(false);
    setWalletConnected(false);
    setUser(null);
  };

  const handleZoneEnter = (zone: Zone) => {
    setCurrentZone(zone);
    setCurrentView('zone');
  };

  const handleBackToMap = () => {
    setCurrentView('map');
    setCurrentZone(null);
  };

  // Navigation header
  const Header = () => (
    <header className="glass-effect border-b border-white/10 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-ztart-primary to-ztart-secondary bg-clip-text text-transparent">
            Ztartverse™
          </h1>
          <span className="text-sm text-ztart-light opacity-70">
            Modular Metaverse Platform
          </span>
        </div>

        <nav className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('map')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              currentView === 'map'
                ? 'bg-ztart-primary text-white'
                : 'text-ztart-light hover:text-white hover:bg-white/10'
            }`}
          >
            <Globe className="w-4 h-4" />
            Map
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              currentView === 'profile'
                ? 'bg-ztart-primary text-white'
                : 'text-ztart-light hover:text-white hover:bg-white/10'
            }`}
          >
            <User className="w-4 h-4" />
            Profile
          </button>
        </nav>

        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <button
              onClick={handleAuthWithZtartag}
              className="btn-primary"
            >
              Connect Ztartag
            </button>
          ) : (
            <>
              {!walletConnected ? (
                <button
                  onClick={handleConnectWallet}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </button>
              ) : (
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Wallet Connected
                </div>
              )}
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={handleSignOut}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-red-400"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );

  // Zone experience view (placeholder for actual 3D experience)
  const ZoneExperience = ({ zone }: { zone: Zone }) => (
    <div className="glass-effect p-8 text-center">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-ztart-primary to-ztart-secondary bg-clip-text text-transparent mb-2">
            Welcome to {zone.name}!
          </h1>
          <p className="text-ztart-light opacity-70">
            {zone.description}
          </p>
        </div>

        <div className="bg-gradient-to-br from-ztart-primary/10 to-ztart-secondary/10 rounded-2xl p-8 border border-ztart-primary/20">
          <div className="text-6xl mb-4">🌐</div>
          <h2 className="text-2xl font-semibold mb-4">3D Zone Experience</h2>
          <p className="text-ztart-light opacity-70 mb-6">
            This is where the full 3D metaverse experience would be loaded.
            Users would see:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <ul className="space-y-2 text-ztart-light">
              <li>• Interactive 3D environment</li>
              <li>• Other users' avatars in real-time</li>
              <li>• Businesses and points of interest</li>
              <li>• Live events and activities</li>
            </ul>
            <ul className="space-y-2 text-ztart-light">
              <li>• Chat and voice communication</li>
              <li>• AR integration for mobile</li>
              <li>• NFT displays and virtual items</li>
              <li>• ZTART coin transactions</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleBackToMap}
            className="btn-secondary"
          >
            ← Back to Map
          </button>
          <button className="btn-primary">
            🎮 Launch 3D Experience
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-ztart-dark via-slate-900 to-ztart-dark">
      <Header />
      
      <main className="container mx-auto px-4 pb-8">
        {currentView === 'map' && (
          <MapNavigation onZoneEnter={handleZoneEnter} />
        )}
        
        {currentView === 'profile' && (
          <UserProfile user={user} />
        )}
        
        {currentView === 'zone' && currentZone && (
          <ZoneExperience zone={currentZone} />
        )}
      </main>

      {/* Footer */}
      <footer className="glass-effect border-t border-white/10 mt-12 p-6 text-center text-ztart-light opacity-70">
        <div className="space-y-2">
          <p className="text-sm">
            Ztartverse™ - A modular metaverse platform integrated with Ztartag identity and Ztart ecosystem
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <span>🔐 Supabase Backend</span>
            <span>🆔 Ztartag Identity</span>
            <span>💰 Ztart Wallet Compatible</span>
            <span>🌐 Multiplayer Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
