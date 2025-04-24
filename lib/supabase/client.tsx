'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Default to empty strings to prevent runtime errors
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

interface SupabaseContextType {
  supabase: SupabaseClient;
  user: any | null;
  isInitialized: boolean;
}

const defaultSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const SupabaseContext = createContext<SupabaseContextType>({
  supabase: defaultSupabaseClient,
  user: null,
  isInitialized: false,
});

export function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<any | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [supabase] = useState(() => defaultSupabaseClient);

  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
      setIsInitialized(true);
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setIsInitialized(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <SupabaseContext.Provider 
      value={{
        supabase,
        user,
        isInitialized,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase(): SupabaseContextType {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}