// import { use, useState, useEffect, createContext, type PropsWithChildren } from 'react';
// import { supabase } from './../utils/supabase';
// import { Session } from '@supabase/supabase-js';

// const AuthContext = createContext<{
//   session?: string | null;
// }>({
//   session: null,
// });

// export function useSession() {
//   const value = use(AuthContext);
//   if (!value) {
//     throw new Error('useSession must be wrapped in a <SessionProvider />');
//   }

//   return value;
// }

// export function SessionProvider({ children }: PropsWithChildren) {
//   const [session, setSession] = useState<Session | null>(null);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });
//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//   }, []);
// }
