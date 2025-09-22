import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Users, Calendar, Star, Building, TreePine } from 'lucide-react';
import type { Region, Zone } from '../../types/game';

interface RegionViewProps {
  region: Region;
  onZoneSelect: (zone: Zone) => void;
  onBack: () => void;
  className?: string;
}

export default function RegionView({ region, onZoneSelect, onBack, className = '' }: RegionViewProps) {
  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedZoneType, setSelectedZoneType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, this would come from Supabase
    const mockZones: Zone[] = [
      {
        id: 'manhattan-central',
        name: 'Central Manhattan',
        description: 'The bustling heart of New York City with iconic landmarks and endless opportunities',
        regionId: region.id,
        type: 'urban',
        bounds: { north: 40.785, south: 40.745, east: -73.945, west: -73.985 },
        center: { lat: 40.765, lng: -73.965 },
        activeUsers: 2840,
        maxUsers: 5000,
        features: [],
        businesses: [],
        events: [],
        environment: {
          weather: { condition: 'sunny', temperature: 22, humidity: 65, windSpeed: 15, windDirection: 180 },
          timeOfDay: 'afternoon',
          season: 'summer',
          lighting: { ambient: 0.8, sun: { intensity: 0.9, angle: 45, color: '#FFD700' }, shadows: true },
          atmosphere: { fog: { enabled: false, density: 0, color: '#FFFFFF' }, particles: { enabled: false, type: 'none', intensity: 0 } }
        },
        thumbnail: '/zones/manhattan-central.jpg',
      },
      {
        id: 'brooklyn-heights',
        name: 'Brooklyn Heights',
        description: 'Historic neighborhood with stunning views of Manhattan skyline',
        regionId: region.id,
        type: 'residential',
        bounds: { north: 40.705, south: 40.690, east: -73.990, west: -74.005 },
        center: { lat: 40.6975, lng: -73.9975 },
        activeUsers: 1420,
        maxUsers: 3000,
        features: [],
        businesses: [],
        events: [],
        environment: {
          weather: { condition: 'cloudy', temperature: 20, humidity: 70, windSpeed: 12, windDirection: 270 },
          timeOfDay: 'afternoon',
          season: 'summer',
          lighting: { ambient: 0.7, sun: { intensity: 0.6, angle: 45, color: '#FFD700' }, shadows: true },
          atmosphere: { fog: { enabled: false, density: 0, color: '#FFFFFF' }, particles: { enabled: false, type: 'none', intensity: 0 } }
        },
        thumbnail: '/zones/brooklyn-heights.jpg',
      },
      {
        id: 'central-park',
        name: 'Central Park',
        description: 'Urban oasis in the heart of Manhattan, perfect for relaxation and recreation',
        regionId: region.id,
        type: 'natural',
        bounds: { north: 40.800, south: 40.764, east: -73.949, west: -73.982 },
        center: { lat: 40.782, lng: -73.9665 },
        activeUsers: 890,
        maxUsers: 2000,
        features: [],
        businesses: [],
        events: [],
        environment: {
          weather: { condition: 'sunny', temperature: 24, humidity: 55, windSpeed: 8, windDirection: 90 },
          timeOfDay: 'afternoon',
          season: 'summer',
          lighting: { ambient: 0.9, sun: { intensity: 1.0, angle: 60, color: '#FFD700' }, shadows: true },
          atmosphere: { fog: { enabled: false, density: 0, color: '#FFFFFF' }, particles: { enabled: true, type: 'leaves', intensity: 0.3 } }
        },
        thumbnail: '/zones/central-park.jpg',
      },
      {
        id: 'times-square',
        name: 'Times Square',
        description: 'The crossroads of the world, buzzing with energy and neon lights',
        regionId: region.id,
        type: 'commercial',
        bounds: { north: 40.760, south: 40.754, east: -73.983, west: -73.987 },
        center: { lat: 40.757, lng: -73.985 },
        activeUsers: 3250,
        maxUsers: 6000,
        features: [],
        businesses: [],
        events: [],
        environment: {
          weather: { condition: 'sunny', temperature: 26, humidity: 60, windSpeed: 10, windDirection: 180 },
          timeOfDay: 'evening',
          season: 'summer',
          lighting: { ambient: 0.6, sun: { intensity: 0.3, angle: 15, color: '#FF6B35' }, shadows: false },
          atmosphere: { fog: { enabled: false, density: 0, color: '#FFFFFF' }, particles: { enabled: false, type: 'none', intensity: 0 } }
        },
        thumbnail: '/zones/times-square.jpg',
      },
    ];

    setTimeout(() => {
      setZones(mockZones);
      setLoading(false);
    }, 800);
  }, [region.id]);

  const zoneTypes = [
    { value: 'urban', label: 'Urban', icon: Building, color: 'text-blue-400' },
    { value: 'residential', label: 'Residential', icon: Building, color: 'text-green-400' },
    { value: 'commercial', label: 'Commercial', icon: Building, color: 'text-yellow-400' },
    { value: 'natural', label: 'Natural', icon: TreePine, color: 'text-emerald-400' },
    { value: 'landmark', label: 'Landmark', icon: Star, color: 'text-purple-400' },
  ];

  const filteredZones = selectedZoneType 
    ? zones.filter(z => z.type === selectedZoneType)
    : zones;

  const totalActiveUsers = zones.reduce((sum, zone) => sum + zone.activeUsers, 0);

  const getZoneTypeIcon = (type: string) => {
    const zoneType = zoneTypes.find(zt => zt.value === type);
    return zoneType?.icon || Building;
  };

  const getZoneTypeColor = (type: string) => {
    const zoneType = zoneTypes.find(zt => zt.value === type);
    return zoneType?.color || 'text-gray-400';
  };

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

  if (loading) {
    return (
      <div className={`glass-effect p-8 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-white/10 rounded-lg"></div>
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
              {region.name}
            </h1>
            <p className="text-ztart-light opacity-70">{region.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-ztart-light">
          <Users className="w-5 h-5" />
          <span className="font-semibold">{totalActiveUsers.toLocaleString()}</span>
          <span className="text-sm opacity-70">active users</span>
        </div>
      </div>

      {/* Region Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-ztart-primary">{zones.length}</div>
          <div className="text-sm text-ztart-light opacity-70">Zones</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-ztart-secondary">{totalActiveUsers.toLocaleString()}</div>
          <div className="text-sm text-ztart-light opacity-70">Active Users</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-ztart-accent">8</div>
          <div className="text-sm text-ztart-light opacity-70">Live Events</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-400">42</div>
          <div className="text-sm text-ztart-light opacity-70">Businesses</div>
        </div>
      </div>

      {/* Zone Type Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedZoneType(null)}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedZoneType === null
              ? 'bg-ztart-primary text-white'
              : 'bg-white/10 text-ztart-light hover:bg-white/20'
          }`}
        >
          All Zones
        </button>
        {zoneTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.value}
              onClick={() => setSelectedZoneType(type.value)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                selectedZoneType === type.value
                  ? 'bg-ztart-primary text-white'
                  : 'bg-white/10 text-ztart-light hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              {type.label}
            </button>
          );
        })}
      </div>

      {/* Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredZones.map((zone) => {
          const ZoneIcon = getZoneTypeIcon(zone.type);
          const utilization = (zone.activeUsers / zone.maxUsers) * 100;
          
          return (
            <div
              key={zone.id}
              onClick={() => onZoneSelect(zone)}
              className="card hover:bg-white/20 transition-all cursor-pointer group"
            >
              {/* Zone Thumbnail */}
              <div className="w-full h-40 bg-gradient-to-br from-ztart-primary/20 to-ztart-secondary/20 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Weather Info */}
                <div className="absolute top-2 left-2">
                  <div className="flex items-center gap-1 text-white text-sm bg-black/30 rounded px-2 py-1">
                    <span>{getWeatherIcon(zone.environment.weather.condition)}</span>
                    <span>{zone.environment.weather.temperature}°C</span>
                  </div>
                </div>
                
                {/* Active Users */}
                <div className="absolute top-2 right-2">
                  <div className="flex items-center gap-1 text-white text-sm bg-black/30 rounded px-2 py-1">
                    <Users className="w-4 h-4" />
                    <span>{zone.activeUsers}</span>
                  </div>
                </div>
                
                {/* Zone Type */}
                <div className="absolute bottom-2 left-2">
                  <div className={`flex items-center gap-1 text-sm ${getZoneTypeColor(zone.type)}`}>
                    <ZoneIcon className="w-4 h-4" />
                    <span className="capitalize font-medium">{zone.type}</span>
                  </div>
                </div>
              </div>

              {/* Zone Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white group-hover:text-ztart-accent transition-colors">
                    {zone.name}
                  </h3>
                  <MapPin className="w-5 h-5 text-ztart-accent" />
                </div>
                
                <p className="text-ztart-light opacity-70 text-sm line-clamp-2">
                  {zone.description}
                </p>

                {/* Utilization Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-ztart-light">
                    <span>Zone Capacity</span>
                    <span>{utilization.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        utilization > 80 ? 'bg-red-400' : 
                        utilization > 60 ? 'bg-yellow-400' : 'bg-green-400'
                      }`}
                      style={{ width: `${utilization}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-ztart-light text-sm">
                    <Calendar className="w-4 h-4" />
                    <span className="capitalize">{zone.environment.timeOfDay}</span>
                  </div>
                  <div className="flex items-center gap-1 text-ztart-light text-sm">
                    <span>{zone.activeUsers.toLocaleString()}</span>
                    <span>/</span>
                    <span>{zone.maxUsers.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-white/10 text-center text-ztart-light opacity-70">
        <p className="text-sm">
          Select a zone to enter and start your Ztartverse™ experience
        </p>
      </div>
    </div>
  );
}