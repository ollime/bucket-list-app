import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { supabase } from './../utils/supabase';
import { Session } from '@supabase/supabase-js';

import Account from './login/Account';
import { Container } from 'components/Container';
import Auth from 'components/Auth';

import './../global.css';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Container>
        <View className={styles.container}>
          <Text className={styles.title}>App</Text>
          {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
        </View>
      </Container>
    </>
  );
}

const styles = {
  container: 'flex flex-1 bg-primary',
  title: 'text-3xl font-bold text-secondary',
};
