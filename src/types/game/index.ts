// Ztartverse Game Types

export interface World {
  earth: EarthLevel;
  regions: Region[];
  activeUsers: number;
  events: WorldEvent[];
}

export interface EarthLevel {
  id: 'earth';
  name: 'Earth';
  description: 'The entire planet Earth in Ztartverse';
  regions: string[]; // Region IDs
  totalZones: number;
  activeUsers: number;
}

export interface Region {
  id: string;
  name: string;
  description: string;
  country: string;
  continent: string;
  zones: Zone[];
  bounds: GeoBounds;
  activeUsers: number;
  events: RegionEvent[];
  thumbnail: string;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  regionId: string;
  type: ZoneType;
  bounds: GeoBounds;
  center: Coordinates;
  activeUsers: number;
  maxUsers: number;
  features: ZoneFeature[];
  businesses: Business[];
  events: ZoneEvent[];
  environment: Environment;
  thumbnail: string;
}

export type ZoneType = 
  | 'urban' 
  | 'suburban' 
  | 'rural' 
  | 'commercial' 
  | 'residential' 
  | 'industrial' 
  | 'natural' 
  | 'landmark';

export interface GeoBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
  altitude?: number;
}

export interface ZoneFeature {
  id: string;
  name: string;
  type: FeatureType;
  position: Coordinates;
  interactive: boolean;
  metadata: Record<string, any>;
}

export type FeatureType = 
  | 'building' 
  | 'landmark' 
  | 'shop' 
  | 'restaurant' 
  | 'park' 
  | 'station' 
  | 'monument' 
  | 'portal';

export interface Business {
  id: string;
  name: string;
  type: BusinessType;
  owner: string; // User ID
  position: Coordinates;
  acceptsZtartCoin: boolean;
  products: Product[];
  services: Service[];
  hours: BusinessHours;
  rating: number;
  reviews: Review[];
}

export type BusinessType = 
  | 'retail' 
  | 'food' 
  | 'entertainment' 
  | 'services' 
  | 'virtual' 
  | 'nft_gallery';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'ZTART' | 'USD' | 'EUR';
  image: string;
  category: string;
  inStock: boolean;
  isVirtual: boolean;
  metadata: Record<string, any>;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'ZTART' | 'USD' | 'EUR';
  duration: number; // minutes
  available: boolean;
  category: string;
}

export interface BusinessHours {
  monday: TimeSlot;
  tuesday: TimeSlot;
  wednesday: TimeSlot;
  thursday: TimeSlot;
  friday: TimeSlot;
  saturday: TimeSlot;
  sunday: TimeSlot;
}

export interface TimeSlot {
  open: string; // HH:MM
  close: string; // HH:MM
  closed: boolean;
}

export interface Review {
  id: string;
  userId: string;
  businessId: string;
  rating: number;
  comment: string;
  timestamp: Date;
  helpful: number;
}

export interface Environment {
  weather: Weather;
  timeOfDay: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night';
  season: 'spring' | 'summer' | 'fall' | 'winter';
  lighting: LightingConditions;
  atmosphere: AtmosphereSettings;
}

export interface Weather {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'foggy' | 'stormy';
  temperature: number; // Celsius
  humidity: number; // Percentage
  windSpeed: number; // km/h
  windDirection: number; // Degrees
}

export interface LightingConditions {
  ambient: number; // 0-1
  sun: {
    intensity: number; // 0-1
    angle: number; // Degrees
    color: string; // Hex color
  };
  shadows: boolean;
}

export interface AtmosphereSettings {
  fog: {
    enabled: boolean;
    density: number; // 0-1
    color: string; // Hex color
  };
  particles: {
    enabled: boolean;
    type: 'none' | 'rain' | 'snow' | 'leaves' | 'dust';
    intensity: number; // 0-1
  };
}

// Events
export interface WorldEvent {
  id: string;
  name: string;
  description: string;
  type: 'global' | 'seasonal' | 'special';
  startTime: Date;
  endTime: Date;
  rewards: EventReward[];
  participants: number;
  maxParticipants?: number;
}

export interface RegionEvent extends WorldEvent {
  regionId: string;
}

export interface ZoneEvent extends WorldEvent {
  zoneId: string;
  position: Coordinates;
}

export interface EventReward {
  type: 'experience' | 'ztart_coin' | 'nft' | 'achievement';
  amount?: number;
  item?: string;
  rarity?: string;
}