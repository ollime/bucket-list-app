import { useState, useEffect } from 'react';
import { supabase } from './../../utils/supabase';
import { View, Alert, Text } from 'react-native';
import { Session } from '@supabase/supabase-js';

import Button from 'components/Button';

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        if (!session?.user) throw new Error('No user on the session!');

        const { data, error, status } = await supabase
          .from('profiles')
          .select(`username, email, avatar_url`)
          .eq('id', session?.user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setEmail(data.email);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    if (session) getProfile();
  }, [session]);

  return (
    <>
      <View>
        <Text>{session?.user?.email}</Text>
        <Text>{username || ''}</Text>
        <Text>{email || ''}</Text>

        <Button
          label="Sign out"
          callback={() => {
            supabase.auth.signOut();
          }}></Button>
      </View>
    </>
  );
}
