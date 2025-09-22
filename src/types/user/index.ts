// Ztartverse User Types

export interface ZtartagProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified: boolean;
  publicKey: string;
  createdAt: Date;
  reputation: number;
}

export interface GameProfile {
  userId: string;
  level: number;
  experience: number;
  achievements: Achievement[];
  currentLocation: Location;
  wallet: WalletInfo;
  preferences: UserPreferences;
  status: UserStatus;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
  points: number;
}

export interface Location {
  earth: string; // Earth level
  region: string; // Region level
  zone: string; // Zone level
  coordinates: {
    lat: number;
    lng: number;
    altitude?: number;
  };
  lastUpdated: Date;
}

export interface WalletInfo {
  address: string;
  ztartCoinBalance: number;
  nfts: NFTAsset[];
  transactions: Transaction[];
}

export interface NFTAsset {
  id: string;
  name: string;
  description: string;
  image: string;
  collection: string;
  attributes: Record<string, any>;
  rarity: number;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'purchase' | 'reward';
  amount: number;
  currency: 'ZTART' | 'ETH' | 'BTC';
  from?: string;
  to?: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    push: boolean;
    email: boolean;
    inApp: boolean;
  };
  privacy: {
    showLocation: boolean;
    showProfile: boolean;
    allowDirectMessages: boolean;
  };
  graphics: {
    quality: 'low' | 'medium' | 'high' | 'ultra';
    effects: boolean;
    shadows: boolean;
  };
}

export type UserStatus = 'online' | 'away' | 'busy' | 'invisible' | 'offline';

export interface User {
  ztartag: ZtartagProfile;
  gameProfile: GameProfile;
  isOnline: boolean;
  lastSeen: Date;
}