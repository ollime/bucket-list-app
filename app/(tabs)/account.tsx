import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { Text } from 'react-native';

import Button from 'components/Button';
import Avatar from 'components/Avatar';
import TextField from 'components/TextField';
import { useSession } from 'utils/AuthContext';
import { useRouter } from 'expo-router';
import { Container } from 'components/Container';
import AppInfo from 'components/AppInfo';
import { showAlert } from 'utils/alert';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [fullName, setFullName] = useState('');

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        if (!session?.user) throw new Error('No user on the session!');

        const { data, error, status } = await supabase
          .from('profiles')
          .select(`username, email, avatar_url, full_name`)
          .eq('id', session?.user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setEmail(data.email);
          setAvatarUrl(data.avatar_url);
          setFullName(data.full_name);
        }
      } catch (error) {
        if (error instanceof Error) {
          showAlert(error.message, 'error', false);
        }
      } finally {
        setLoading(false);
      }
    }

    if (session) getProfile();
  }, [session]);

  async function updateProfile({
    username,
    avatar_url,
    full_name,
  }: {
    username: string;
    avatar_url: string;
    full_name: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');
      const updates = {
        id: session?.user.id,
        username,
        avatar_url,
        full_name,
        updated_at: new Date(),
      };
      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error.message, 'error', false);
      }
    } finally {
      showAlert('Profile updated', 'success', true);
    }
  }

  return (
    <>
      <Container>
        <Text className={styles.title}>Profile</Text>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, avatar_url: url, full_name: fullName });
          }}
          userId={session?.user.id ?? ''}></Avatar>

        <TextField
          label="Email"
          value={session?.user?.email || ''}
          placeholder="email@domain.com"
          onChangeText={(value: string) => {}}
          disabled={true}
          icon="email"></TextField>
        <TextField
          label="Username"
          value={username || ''}
          placeholder="username"
          onChangeText={(value: string) => setUsername(value)}></TextField>
        <TextField
          label="name (visible to friends only)"
          value={fullName || ''}
          placeholder="name"
          onChangeText={(value: string) => setFullName(value)}></TextField>

        <Button
          label="Update Profile"
          callback={() => {
            updateProfile({ username, avatar_url: avatarUrl, full_name: fullName });
          }}></Button>

        <Button
          label="Sign out"
          callback={() => {
            supabase.auth.signOut();
            router.push('/');
          }}></Button>
        <AppInfo></AppInfo>
      </Container>
    </>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary',
};
