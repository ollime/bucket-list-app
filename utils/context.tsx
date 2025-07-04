import { use, useState, useEffect, createContext, type PropsWithChildren } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './../utils/supabase';
import { useStorageState } from './useStorageState';

export const AuthContext = createContext<{
  session: Session | null;
}>({
  session: null,
});

export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value.session;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(JSON.stringify(session));
      console.log(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(JSON.stringify(session));
      console.log(session);
    });
  }, [setSession]);

  return (
    <AuthContext.Provider value={{ session: session ? (JSON.parse(session) as Session) : null }}>
      {children}
    </AuthContext.Provider>
  );
}
