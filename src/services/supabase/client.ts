import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Helper functions for common operations
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const signInWithOAuth = async (provider: 'google' | 'github' | 'discord') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
};

export const signInWithZtartag = async (accessToken: string) => {
  // Custom integration with Ztartag identity system
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'ztartag' as any, // Custom provider
    token: accessToken,
    nonce: crypto.randomUUID(),
  });
  return { data, error };
};

// Real-time subscriptions
export const subscribeToZoneUpdates = (zoneId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`zone:${zoneId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'zone_events',
      filter: `zone_id=eq.${zoneId}`,
    }, callback)
    .subscribe();
};

export const subscribeToUserPresence = (zoneId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`presence:${zoneId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',  
      table: 'user_presence',
      filter: `zone_id=eq.${zoneId}`,
    }, callback)
    .subscribe();
};

export const subscribeToChat = (zoneId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`chat:${zoneId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'chat_messages',
      filter: `zone_id=eq.${zoneId}`,
    }, callback)
    .subscribe();
};

export default supabase;