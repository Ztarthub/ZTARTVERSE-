import { useState, useEffect } from 'react';
import { 
  User as UserIcon, 
  Star, 
  Trophy, 
  Coins, 
  MapPin, 
  Calendar, 
  Zap, 
  Crown,
  Gift,
  TrendingUp,
  Settings
} from 'lucide-react';
import type { User, Achievement } from '../../types/user';

interface UserProfileProps {
  user?: User | null;
  className?: string;
}

export default function UserProfile({ user, className = '' }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'wallet' | 'stats'>('overview');
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    if (user) {
      // Mock recent achievements
      const mockAchievements: Achievement[] = [
        {
          id: 'first_zone',
          name: 'Zone Explorer',
          description: 'Visited your first zone in Ztartverse',
          icon: '🗺️',
          rarity: 'common',
          unlockedAt: new Date(Date.now() - 86400000), // 1 day ago
          points: 100,
        },
        {
          id: 'social_butterfly',
          name: 'Social Butterfly',
          description: 'Interacted with 10 different users',
          icon: '🦋',
          rarity: 'uncommon',
          unlockedAt: new Date(Date.now() - 172800000), // 2 days ago
          points: 250,
        },
        {
          id: 'ztart_spender',
          name: 'ZTART Spender',
          description: 'Made your first purchase with ZTART coins',
          icon: '💰',
          rarity: 'rare',
          unlockedAt: new Date(Date.now() - 259200000), // 3 days ago
          points: 500,
        },
      ];
      setRecentAchievements(mockAchievements);
    }
  }, [user]);

  // Mock user if none provided (for demo purposes)
  const mockUser: User = {
    ztartag: {
      id: 'demo-user',
      username: 'ztartdemo',
      displayName: 'Ztart Demo User',
      avatar: '/avatars/demo-user.jpg',
      verified: true,
      publicKey: '0xDemo123...',
      createdAt: new Date('2024-01-15'),
      reputation: 3420,
    },
    gameProfile: {
      userId: 'demo-user',
      level: 28,
      experience: 45650,
      achievements: recentAchievements,
      currentLocation: {
        earth: 'earth',
        region: 'north-america',
        zone: 'manhattan-central',
        coordinates: { lat: 40.765, lng: -73.965 },
        lastUpdated: new Date(),
      },
      wallet: {
        address: '0xDemo123456789...',
        ztartCoinBalance: 12840,
        nfts: [],
        transactions: [],
      },
      preferences: {
        theme: 'dark',
        language: 'en',
        notifications: { push: true, email: true, inApp: true },
        privacy: { showLocation: true, showProfile: true, allowDirectMessages: true },
        graphics: { quality: 'high', effects: true, shadows: true },
      },
      status: 'online',
    },
    isOnline: true,
    lastSeen: new Date(),
  };

  const currentUser = user || mockUser;

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: 'text-gray-400',
      uncommon: 'text-green-400',
      rare: 'text-blue-400',
      epic: 'text-purple-400',
      legendary: 'text-yellow-400',
    };
    return colors[rarity as keyof typeof colors] || 'text-gray-400';
  };

  const getRarityBg = (rarity: string) => {
    const colors = {
      common: 'bg-gray-400/20',
      uncommon: 'bg-green-400/20',
      rare: 'bg-blue-400/20',
      epic: 'bg-purple-400/20',
      legendary: 'bg-yellow-400/20',
    };
    return colors[rarity as keyof typeof colors] || 'bg-gray-400/20';
  };

  const experienceToNextLevel = 50000; // Mock calculation
  const experienceProgress = ((currentUser.gameProfile.experience % experienceToNextLevel) / experienceToNextLevel) * 100;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: UserIcon },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'wallet', label: 'Wallet', icon: Coins },
    { id: 'stats', label: 'Stats', icon: TrendingUp },
  ];

  return (
    <div className={`glass-effect p-6 ${className}`}>
      {/* Profile Header */}
      <div className="flex items-start gap-6 mb-8">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-ztart-primary to-ztart-secondary flex items-center justify-center text-white text-3xl font-bold">
            {currentUser.ztartag.displayName.charAt(0)}
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-white">{currentUser.ztartag.displayName}</h1>
            {currentUser.ztartag.verified && <Star className="w-6 h-6 text-yellow-400" />}
          </div>
          <p className="text-ztart-light opacity-70 mb-2">@{currentUser.ztartag.username}</p>
          
          {/* Level & Experience */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-ztart-accent" />
              <span className="text-ztart-accent font-semibold">Level {currentUser.gameProfile.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-ztart-secondary" />
              <span className="text-ztart-light">{currentUser.ztartag.reputation.toLocaleString()} reputation</span>
            </div>
          </div>

          {/* Experience Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm text-ztart-light">
              <span>Experience</span>
              <span>{currentUser.gameProfile.experience.toLocaleString()} XP</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-ztart-primary to-ztart-secondary h-2 rounded-full transition-all"
                style={{ width: `${experienceProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-ztart-primary">{currentUser.gameProfile.level}</div>
          <div className="text-sm text-ztart-light opacity-70">Level</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-ztart-secondary">{recentAchievements.length}</div>
          <div className="text-sm text-ztart-light opacity-70">Achievements</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-ztart-accent">{currentUser.gameProfile.wallet.ztartCoinBalance.toLocaleString()}</div>
          <div className="text-sm text-ztart-light opacity-70">ZTART</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-400">42</div>
          <div className="text-sm text-ztart-light opacity-70">NFTs</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white/5 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-ztart-primary text-white'
                  : 'text-ztart-light hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Current Location */}
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-ztart-accent" />
                <h3 className="text-lg font-semibold">Current Location</h3>
              </div>
              <div className="text-ztart-light">
                <p>🌍 Earth &gt; 🗺️ North America &gt; 📍 Manhattan Central</p>
                <p className="text-sm opacity-70 mt-1">
                  Last updated: {currentUser.gameProfile.currentLocation.lastUpdated.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-ztart-secondary" />
                <h3 className="text-lg font-semibold">Recent Activity</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-ztart-light">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Visited Central Park zone</span>
                  <span className="text-xs opacity-70">2 hours ago</span>
                </div>
                <div className="flex items-center gap-2 text-ztart-light">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Purchased coffee with ZTART coins</span>
                  <span className="text-xs opacity-70">4 hours ago</span>
                </div>
                <div className="flex items-center gap-2 text-ztart-light">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Unlocked "Social Butterfly" achievement</span>
                  <span className="text-xs opacity-70">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-4">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className={`card ${getRarityBg(achievement.rarity)} border border-current`}>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-semibold text-white">{achievement.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${getRarityColor(achievement.rarity)} ${getRarityBg(achievement.rarity)}`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className="text-ztart-light opacity-70 text-sm mb-2">{achievement.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-ztart-accent">
                        <Gift className="w-4 h-4" />
                        <span>{achievement.points} points</span>
                      </div>
                      <div className="text-ztart-light opacity-70">
                        Unlocked {achievement.unlockedAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center pt-4">
              <button className="btn-secondary">
                View All Achievements
              </button>
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="space-y-6">
            {/* Balance Overview */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Wallet Balance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-ztart-primary/20 to-ztart-secondary/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-ztart-primary">{currentUser.gameProfile.wallet.ztartCoinBalance.toLocaleString()}</div>
                  <div className="text-sm text-ztart-light opacity-70">ZTART Coins</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">2.45</div>
                  <div className="text-sm text-ztart-light opacity-70">ETH</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-400">0.0012</div>
                  <div className="text-sm text-ztart-light opacity-70">BTC</div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Earned ZTART</div>
                      <div className="text-sm text-ztart-light opacity-70">Achievement reward</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-400">+500 ZTART</div>
                    <div className="text-xs text-ztart-light opacity-70">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-400/20 rounded-full flex items-center justify-center">
                      <Coins className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Coffee Purchase</div>
                      <div className="text-sm text-ztart-light opacity-70">Ztart Café</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-400">-25 ZTART</div>
                    <div className="text-xs text-ztart-light opacity-70">4 hours ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="font-semibold mb-3">Exploration Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ztart-light opacity-70">Regions Visited</span>
                  <span className="text-white">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ztart-light opacity-70">Zones Explored</span>
                  <span className="text-white">48</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ztart-light opacity-70">Total Distance</span>
                  <span className="text-white">2,847 km</span>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h4 className="font-semibold mb-3">Social Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ztart-light opacity-70">Users Met</span>
                  <span className="text-white">187</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ztart-light opacity-70">Messages Sent</span>
                  <span className="text-white">1,432</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ztart-light opacity-70">Events Joined</span>
                  <span className="text-white">23</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}