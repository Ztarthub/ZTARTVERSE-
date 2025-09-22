import { useState, useEffect } from 'react';
import { ArrowLeft, Users, MessageCircle, MapPin, Store, Calendar, Zap, Crown, Star } from 'lucide-react';
import type { Zone, Business, ZoneEvent } from '../../types/game';
import type { User } from '../../types/user';

interface ZoneViewProps {
  zone: Zone;
  onBack: () => void;
  onEnterZone: (zone: Zone) => void;
  className?: string;
}

export default function ZoneView({ zone, onBack, onEnterZone, className = '' }: ZoneViewProps) {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [events, setEvents] = useState<ZoneEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, this would come from Supabase
    const mockUsers: User[] = [
      {
        ztartag: {
          id: 'user1',
          username: 'cryptoking',
          displayName: 'Crypto King',
          avatar: '/avatars/user1.jpg',
          verified: true,
          publicKey: '0x123...',
          createdAt: new Date(),
          reputation: 2850,
        },
        gameProfile: {
          userId: 'user1',
          level: 42,
          experience: 128500,
          achievements: [],
          currentLocation: {
            earth: 'earth',
            region: zone.regionId,
            zone: zone.id,
            coordinates: { lat: zone.center.lat, lng: zone.center.lng },
            lastUpdated: new Date(),
          },
          wallet: {
            address: '0x123...',
            ztartCoinBalance: 15420,
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
      },
      // Add more mock users...
    ];

    const mockBusinesses: Business[] = [
      {
        id: 'business1',
        name: 'Ztart Café',
        type: 'food',
        owner: 'owner1',
        position: { lat: zone.center.lat + 0.001, lng: zone.center.lng + 0.001 },
        acceptsZtartCoin: true,
        products: [],
        services: [],
        hours: {
          monday: { open: '08:00', close: '22:00', closed: false },
          tuesday: { open: '08:00', close: '22:00', closed: false },
          wednesday: { open: '08:00', close: '22:00', closed: false },
          thursday: { open: '08:00', close: '22:00', closed: false },
          friday: { open: '08:00', close: '23:00', closed: false },
          saturday: { open: '09:00', close: '23:00', closed: false },
          sunday: { open: '09:00', close: '21:00', closed: false },
        },
        rating: 4.8,
        reviews: [],
      },
      {
        id: 'business2',
        name: 'NFT Gallery Prime',
        type: 'nft_gallery',
        owner: 'owner2',
        position: { lat: zone.center.lat - 0.001, lng: zone.center.lng + 0.001 },
        acceptsZtartCoin: true,
        products: [],
        services: [],
        hours: {
          monday: { open: '10:00', close: '20:00', closed: false },
          tuesday: { open: '10:00', close: '20:00', closed: false },
          wednesday: { open: '10:00', close: '20:00', closed: false },
          thursday: { open: '10:00', close: '20:00', closed: false },
          friday: { open: '10:00', close: '22:00', closed: false },
          saturday: { open: '10:00', close: '22:00', closed: false },
          sunday: { open: '12:00', close: '18:00', closed: false },
        },
        rating: 4.6,
        reviews: [],
      },
    ];

    const mockEvents: ZoneEvent[] = [
      {
        id: 'event1',
        zoneId: zone.id,
        name: 'Summer Music Festival',
        description: 'Join us for an amazing musical experience with top artists',
        type: 'special',
        startTime: new Date(Date.now() + 3600000), // 1 hour from now
        endTime: new Date(Date.now() + 7200000), // 2 hours from now
        rewards: [
          { type: 'experience', amount: 500 },
          { type: 'ztart_coin', amount: 100 },
        ],
        participants: 245,
        maxParticipants: 500,
        position: zone.center,
      },
    ];

    setTimeout(() => {
      setActiveUsers(mockUsers);
      setBusinesses(mockBusinesses);
      setEvents(mockEvents);
      setLoading(false);
    }, 600);
  }, [zone.id]);

  const getWeatherIcon = (condition: string) => {
    const icons: Record<string, string> = {
      sunny: '☀️',
      cloudy: '☁️',
      rainy: '🌧️',
      snowy: '❄️',
      foggy: '🌫️',
      stormy: '⛈️',
    };
    return icons[condition] || '☀️';
  };

  const getBusinessTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      retail: Store,
      food: Store,
      entertainment: Star,
      services: Store,
      virtual: Zap,
      nft_gallery: Crown,
    };
    return icons[type] || Store;
  };

  const utilization = (zone.activeUsers / zone.maxUsers) * 100;

  if (loading) {
    return (
      <div className={`glass-effect p-8 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-white/10 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-effect p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-ztart-primary to-ztart-secondary bg-clip-text text-transparent">
              {zone.name}
            </h1>
            <p className="text-ztart-light opacity-70">{zone.description}</p>
          </div>
        </div>
        <button
          onClick={() => onEnterZone(zone)}
          className="btn-primary px-6 py-3 text-lg"
        >
          Enter Zone
        </button>
      </div>

      {/* Zone Stats & Environment */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-ztart-primary">{zone.activeUsers}</div>
          <div className="text-sm text-ztart-light opacity-70">Active Users</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-ztart-secondary">{businesses.length}</div>
          <div className="text-sm text-ztart-light opacity-70">Businesses</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-ztart-accent">{events.length}</div>
          <div className="text-sm text-ztart-light opacity-70">Live Events</div>
        </div>
        <div className="card text-center relative">
          <div className="text-2xl">{getWeatherIcon(zone.environment.weather.condition)}</div>
          <div className="text-sm text-ztart-light opacity-70">{zone.environment.weather.temperature}°C</div>
        </div>
      </div>

      {/* Zone Capacity */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Zone Capacity</h3>
          <span className="text-ztart-accent font-semibold">{utilization.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full transition-all ${
              utilization > 80 ? 'bg-red-400' : 
              utilization > 60 ? 'bg-yellow-400' : 'bg-green-400'
            }`}
            style={{ width: `${utilization}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-ztart-light opacity-70">
          <span>{zone.activeUsers} users online</span>
          <span>Max capacity: {zone.maxUsers}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Users */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-ztart-primary" />
              Active Users
            </h3>
            <span className="text-ztart-accent text-sm">{activeUsers.length} online</span>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {activeUsers.slice(0, 10).map((user) => (
              <div key={user.ztartag.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ztart-primary to-ztart-secondary flex items-center justify-center text-white font-bold">
                  {user.ztartag.displayName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-white">{user.ztartag.displayName}</span>
                    {user.ztartag.verified && <Star className="w-4 h-4 text-yellow-400" />}
                  </div>
                  <div className="text-sm text-ztart-light opacity-70">
                    Level {user.gameProfile.level} • {user.gameProfile.wallet.ztartCoinBalance.toLocaleString()} ZTART
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-xs text-ztart-light">Online</span>
                </div>
              </div>
            ))}
            {activeUsers.length > 10 && (
              <div className="text-center text-ztart-light opacity-70 text-sm py-2">
                +{activeUsers.length - 10} more users online
              </div>
            )}
          </div>
        </div>

        {/* Businesses */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Store className="w-5 h-5 text-ztart-secondary" />
              Businesses
            </h3>
            <span className="text-ztart-accent text-sm">{businesses.length} open</span>
          </div>
          <div className="space-y-3">
            {businesses.map((business) => {
              const BusinessIcon = getBusinessTypeIcon(business.type);
              return (
                <div key={business.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-ztart-secondary/20 flex items-center justify-center">
                    <BusinessIcon className="w-5 h-5 text-ztart-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{business.name}</span>
                      {business.acceptsZtartCoin && (
                        <span className="text-xs bg-ztart-primary px-2 py-1 rounded text-white">ZTART</span>
                      )}
                    </div>
                    <div className="text-sm text-ztart-light opacity-70 capitalize">
                      {business.type.replace('_', ' ')} • ⭐ {business.rating}
                    </div>
                  </div>
                  <MapPin className="w-4 h-4 text-ztart-accent" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events */}
      {events.length > 0 && (
        <div className="card mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-ztart-accent" />
              Live Events
            </h3>
            <span className="text-ztart-accent text-sm">{events.length} active</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <div key={event.id} className="p-4 rounded-lg bg-gradient-to-br from-ztart-primary/10 to-ztart-secondary/10 border border-ztart-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{event.name}</h4>
                  <span className="text-xs bg-ztart-accent px-2 py-1 rounded text-white">Live</span>
                </div>
                <p className="text-sm text-ztart-light opacity-70 mb-3">{event.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{event.participants}/{event.maxParticipants}</span>
                  </div>
                  <button className="btn-secondary text-sm px-3 py-1">
                    Join Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zone Chat Preview */}
      <div className="card mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-ztart-accent" />
            Zone Chat
          </h3>
          <button className="text-ztart-accent text-sm hover:underline">
            View All Messages
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="font-medium text-ztart-primary">CryptoKing:</span>
            <span className="text-ztart-light">Welcome to {zone.name}! Great weather today ☀️</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-ztart-secondary">MetaBuilder:</span>
            <span className="text-ztart-light">Check out the new NFT gallery, amazing collection!</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-ztart-accent">ZoneGuide:</span>
            <span className="text-ztart-light">Summer Music Festival starts in 1 hour! 🎵</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <button
          onClick={() => onEnterZone(zone)}
          className="btn-primary px-8 py-4 text-xl"
        >
          🚀 Enter {zone.name}
        </button>
        <p className="text-ztart-light opacity-70 text-sm mt-2">
          Join {zone.activeUsers.toLocaleString()} other users exploring this zone
        </p>
      </div>
    </div>
  );
}