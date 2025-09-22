import { useState, useEffect } from 'react';
import { Globe, Users, MapPin, Zap } from 'lucide-react';
import type { Region } from '../../types/game';

interface EarthViewProps {
  onRegionSelect: (region: Region) => void;
  className?: string;
}

export default function EarthView({ onRegionSelect, className = '' }: EarthViewProps) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, this would come from Supabase
    const mockRegions: Region[] = [
      {
        id: 'north-america',
        name: 'North America',
        description: 'The northern continent of the Americas',
        country: 'Multiple',
        continent: 'North America',
        zones: [],
        bounds: { north: 83.6, south: 5.5, east: -52.2, west: -168.0 },
        activeUsers: 15420,
        events: [],
        thumbnail: '/regions/north-america.jpg',
      },
      {
        id: 'europe',
        name: 'Europe',
        description: 'The historic heart of civilization',
        country: 'Multiple',
        continent: 'Europe',
        zones: [],
        bounds: { north: 81.0, south: 34.5, east: 69.1, west: -31.3 },
        activeUsers: 12890,
        events: [],
        thumbnail: '/regions/europe.jpg',
      },
      {
        id: 'asia',
        name: 'Asia',
        description: 'The largest and most populous continent',
        country: 'Multiple',
        continent: 'Asia',
        zones: [],
        bounds: { north: 81.0, south: -11.0, east: 180.0, west: 26.0 },
        activeUsers: 28340,
        events: [],
        thumbnail: '/regions/asia.jpg',
      },
      {
        id: 'africa',
        name: 'Africa',
        description: 'The cradle of humanity',
        country: 'Multiple',
        continent: 'Africa',
        zones: [],
        bounds: { north: 37.3, south: -34.8, east: 51.4, west: -17.5 },
        activeUsers: 8920,
        events: [],
        thumbnail: '/regions/africa.jpg',
      },
      {
        id: 'south-america',
        name: 'South America',
        description: 'The southern continent of the Americas',
        country: 'Multiple',
        continent: 'South America',
        zones: [],
        bounds: { north: 12.5, south: -55.0, east: -34.4, west: -81.3 },
        activeUsers: 6750,
        events: [],
        thumbnail: '/regions/south-america.jpg',
      },
      {
        id: 'oceania',
        name: 'Oceania',
        description: 'Islands of the Pacific Ocean',
        country: 'Multiple',
        continent: 'Oceania',
        zones: [],
        bounds: { north: -8.0, south: -47.0, east: 180.0, west: 110.0 },
        activeUsers: 3240,
        events: [],
        thumbnail: '/regions/oceania.jpg',
      },
    ];

    setTimeout(() => {
      setRegions(mockRegions);
      setLoading(false);
    }, 1000);
  }, []);

  const totalUsers = regions.reduce((sum, region) => sum + region.activeUsers, 0);

  const continents = [
    'North America',
    'South America', 
    'Europe',
    'Africa',
    'Asia',
    'Oceania'
  ];

  const filteredRegions = selectedContinent 
    ? regions.filter(r => r.continent === selectedContinent)
    : regions;

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
          <Globe className="w-8 h-8 text-ztart-accent" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-ztart-primary to-ztart-secondary bg-clip-text text-transparent">
            Ztartverse™ Earth
          </h1>
        </div>
        <div className="flex items-center gap-2 text-ztart-light">
          <Users className="w-5 h-5" />
          <span className="font-semibold">{totalUsers.toLocaleString()}</span>
          <span className="text-sm opacity-70">active users</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-ztart-primary">{regions.length}</div>
          <div className="text-sm text-ztart-light opacity-70">Regions</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-ztart-secondary">{totalUsers.toLocaleString()}</div>
          <div className="text-sm text-ztart-light opacity-70">Active Users</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-ztart-accent">247</div>
          <div className="text-sm text-ztart-light opacity-70">Total Zones</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-400">12</div>
          <div className="text-sm text-ztart-light opacity-70">Live Events</div>
        </div>
      </div>

      {/* Continent Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedContinent(null)}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedContinent === null
              ? 'bg-ztart-primary text-white'
              : 'bg-white/10 text-ztart-light hover:bg-white/20'
          }`}
        >
          All Continents
        </button>
        {continents.map((continent) => (
          <button
            key={continent}
            onClick={() => setSelectedContinent(continent)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedContinent === continent
                ? 'bg-ztart-primary text-white'
                : 'bg-white/10 text-ztart-light hover:bg-white/20'
            }`}
          >
            {continent}
          </button>
        ))}
      </div>

      {/* Regions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRegions.map((region) => (
          <div
            key={region.id}
            onClick={() => onRegionSelect(region)}
            className="card hover:bg-white/20 transition-all cursor-pointer group"
          >
            {/* Region Thumbnail */}
            <div className="w-full h-32 bg-gradient-to-br from-ztart-primary/20 to-ztart-secondary/20 rounded-lg mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-2 right-2">
                <div className="flex items-center gap-1 text-white text-sm">
                  <Zap className="w-4 h-4" />
                  <span className="font-semibold">{region.activeUsers.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Region Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white group-hover:text-ztart-accent transition-colors">
                  {region.name}
                </h3>
                <MapPin className="w-5 h-5 text-ztart-accent" />
              </div>
              
              <p className="text-ztart-light opacity-70 text-sm line-clamp-2">
                {region.description}
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-ztart-accent text-sm font-medium">
                  {region.continent}
                </span>
                <div className="flex items-center gap-1 text-ztart-light text-sm">
                  <Users className="w-4 h-4" />
                  <span>{region.activeUsers.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-white/10 text-center text-ztart-light opacity-70">
        <p className="text-sm">
          Select a region to explore zones and connect with other users
        </p>
      </div>
    </div>
  );
}