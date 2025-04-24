'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

interface SupabaseContextType {
  supabase: SupabaseClient;
  user: any | null;
}

const defaultSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const SupabaseContext = createContext<SupabaseContextType>({
  supabase: defaultSupabaseClient,
  user: null,
});

export function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<any | null>(null);
  const [supabase] = useState(() => defaultSupabaseClient);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
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