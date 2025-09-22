// Ztartverse API Types

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  stack?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Supabase related types
export interface DatabaseUser {
  id: string;
  email: string;
  ztartag_id?: string;
  created_at: string;
  updated_at: string;
  last_sign_in_at?: string;
  email_confirmed_at?: string;
  phone?: string;
  phone_confirmed_at?: string;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
}

export interface DatabaseProfile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  level: number;
  experience: number;
  ztart_coin_balance: number;
  current_location: {
    earth: string;
    region: string;
    zone: string;
    coordinates: {
      lat: number;
      lng: number;
      altitude?: number;
    };
  };
  preferences: Record<string, any>;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  metadata?: Record<string, any>;
}

export interface DatabaseTransaction {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  currency: string;
  from_address?: string;
  to_address?: string;
  metadata?: Record<string, any>;
  status: string;
  created_at: string;
  updated_at: string;
}

// Real-time multiplayer types
export interface RealtimeMessage {
  type: MessageType;
  payload: any;
  sender: string;
  timestamp: Date;
  channel: string;
}

export type MessageType = 
  | 'user_join'
  | 'user_leave'
  | 'user_move'
  | 'chat_message'
  | 'game_event'
  | 'zone_update'
  | 'transaction'
  | 'achievement_unlock';

export interface UserPresence {
  user_id: string;
  username: string;
  location: {
    zone_id: string;
    coordinates: {
      lat: number;
      lng: number;
      altitude?: number;
    };
  };
  status: string;
  last_seen: Date;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  username: string;
  message: string;
  zone_id: string;
  timestamp: Date;
  type: 'text' | 'emoji' | 'system';
  metadata?: Record<string, any>;
}

// External integrations
export interface ZtartagAuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    username: string;
    display_name: string;
    avatar: string;
    verified: boolean;
    public_key: string;
  };
  expires_in: number;
}

export interface WalletConnectionResponse {
  connected: boolean;
  address: string;
  network: string;
  balance: {
    ztart: number;
    eth: number;
    btc: number;
  };
  provider: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  animation_url?: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
    display_type?: string;
  }>;
  background_color?: string;
  youtube_url?: string;
}