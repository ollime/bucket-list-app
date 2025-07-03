import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { View, Text } from 'react-native';
import { Session } from '@supabase/supabase-js';

import Button from 'components/Button';
import Avatar from 'components/Avatar';
import TextField from 'components/TextField';

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

  async function updateProfile({ username, avatar_url }: { username: string; avatar_url: string }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');
      const updates = {
        id: session?.user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };
      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      alert('Profile updated.');
      setLoading(false);
    }
  }

  return (
    <>
      <View>
        <Text className={styles.title}>Profile</Text>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, avatar_url: url });
          }}></Avatar>

        <TextField
          label="Username"
          value={username || ''}
          placeholder="username"
          onChangeText={(value: string) => setUsername(value)}></TextField>
        <TextField
          label="Email"
          value={session?.user?.email || ''}
          placeholder="email@domain.com"
          onChangeText={(value: string) => {}}
          disabled={true}
          icon="email"></TextField>

        <Button
          label="Update Profile"
          callback={() => {
            updateProfile({ username, avatar_url: avatarUrl });
          }}></Button>

        <Button
          label="Sign out"
          callback={() => {
            supabase.auth.signOut();
          }}></Button>
      </View>
    </>
  );
}

const styles = {
  title: 'text-3xl font-bold text-secondary',
};
