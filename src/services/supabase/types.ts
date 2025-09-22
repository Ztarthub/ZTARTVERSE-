// Supabase Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          username: string;
          display_name: string;
          avatar_url: string | null;
          level: number;
          experience: number;
          ztart_coin_balance: number;
          current_location: Json;
          preferences: Json;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          username: string;
          display_name: string;
          avatar_url?: string | null;
          level?: number;
          experience?: number;
          ztart_coin_balance?: number;
          current_location?: Json;
          preferences?: Json;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          username?: string;
          display_name?: string;
          avatar_url?: string | null;
          level?: number;
          experience?: number;
          ztart_coin_balance?: number;
          current_location?: Json;
          preferences?: Json;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string;
          rarity: string;
          points: number;
          category: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          icon: string;
          rarity: string;
          points: number;
          category: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          icon?: string;
          rarity?: string;
          points?: number;
          category?: string;
          created_at?: string;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          unlocked_at: string;
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_id: string;
          unlocked_at?: string;
          metadata?: Json | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          achievement_id?: string;
          unlocked_at?: string;
          metadata?: Json | null;
        };
      };
      zones: {
        Row: {
          id: string;
          name: string;
          description: string;
          region_id: string;
          type: string;
          bounds: Json;
          center: Json;
          max_users: number;
          features: Json;
          environment: Json;
          thumbnail: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          region_id: string;
          type: string;
          bounds: Json;
          center: Json;
          max_users?: number;
          features?: Json;
          environment?: Json;
          thumbnail: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          region_id?: string;
          type?: string;
          bounds?: Json;
          center?: Json;
          max_users?: number;
          features?: Json;
          environment?: Json;
          thumbnail?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      regions: {
        Row: {
          id: string;
          name: string;
          description: string;
          country: string;
          continent: string;
          bounds: Json;
          thumbnail: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          country: string;
          continent: string;
          bounds: Json;
          thumbnail: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          country?: string;
          continent?: string;
          bounds?: Json;
          thumbnail?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      businesses: {
        Row: {
          id: string;
          name: string;
          type: string;
          owner_id: string;
          zone_id: string;
          position: Json;
          accepts_ztart_coin: boolean;
          products: Json;
          services: Json;
          hours: Json;
          rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          owner_id: string;
          zone_id: string;
          position: Json;
          accepts_ztart_coin?: boolean;
          products?: Json;
          services?: Json;
          hours?: Json;
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          owner_id?: string;
          zone_id?: string;
          position?: Json;
          accepts_ztart_coin?: boolean;
          products?: Json;
          services?: Json;
          hours?: Json;
          rating?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          amount: number;
          currency: string;
          from_address: string | null;
          to_address: string | null;
          metadata: Json | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          amount: number;
          currency: string;
          from_address?: string | null;
          to_address?: string | null;
          metadata?: Json | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          amount?: number;
          currency?: string;
          from_address?: string | null;
          to_address?: string | null;
          metadata?: Json | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          user_id: string;
          zone_id: string;
          message: string;
          type: string;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          zone_id: string;
          message: string;
          type?: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          zone_id?: string;
          message?: string;
          type?: string;
          metadata?: Json | null;
          created_at?: string;
        };
      };
      zone_events: {
        Row: {
          id: string;
          zone_id: string;
          name: string;
          description: string;
          type: string;
          start_time: string;
          end_time: string;
          rewards: Json;
          max_participants: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          zone_id: string;
          name: string;
          description: string;
          type: string;
          start_time: string;
          end_time: string;
          rewards?: Json;
          max_participants?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          zone_id?: string;
          name?: string;
          description?: string;
          type?: string;
          start_time?: string;
          end_time?: string;
          rewards?: Json;
          max_participants?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_status: 'online' | 'away' | 'busy' | 'invisible' | 'offline';
      zone_type: 'urban' | 'suburban' | 'rural' | 'commercial' | 'residential' | 'industrial' | 'natural' | 'landmark';
      business_type: 'retail' | 'food' | 'entertainment' | 'services' | 'virtual' | 'nft_gallery';
      achievement_rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
      transaction_status: 'pending' | 'confirmed' | 'failed';
      currency_type: 'ZTART' | 'ETH' | 'BTC' | 'USD' | 'EUR';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;