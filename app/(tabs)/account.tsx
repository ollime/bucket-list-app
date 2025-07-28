import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { Text, View } from 'react-native';

import Button from 'components/Button';
import Avatar from 'components/Avatar';
import TextField from 'components/TextField';
import { useSession } from 'utils/AuthContext';
import { useRouter } from 'expo-router';
import { Container } from 'components/Container';
import AppInfo from 'components/AppInfo';
import { showAlert } from 'utils/alert';
import Toggle from 'components/Toggle';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [fullName, setFullName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [allowsFriends, setAllowsFriends] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        if (!session?.user) throw new Error('No user on the session!');

        const { data, error, status } = await supabase
          .from('profiles')
          .select(`username, avatar_url, full_name, is_public, allows_friends`)
          .eq('id', session?.user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
          setFullName(data.full_name);
          setIsPublic(data.is_public);
          setAllowsFriends(data.allows_friends);
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

  function handleTogglePublic() {
    setIsPublic(!isPublic);
  }

  function handleToggleFriends() {
    setAllowsFriends(!allowsFriends);
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

        <View className="my-2">
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
            label="Alias (visible to friends only)"
            value={fullName || ''}
            placeholder="name"
            onChangeText={(value: string) => setFullName(value)}></TextField>

          <Toggle
            value={isPublic}
            label="Profile shows up in search"
            icon={isPublic ? 'public' : 'public-off'}
            callback={handleTogglePublic}></Toggle>
          <Toggle
            value={allowsFriends}
            label="Allow others to friend you"
            icon={allowsFriends ? 'person-add' : 'person-add-disabled'}
            callback={handleToggleFriends}></Toggle>
        </View>

        <View className="flex flex-row">
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
        </View>
        <AppInfo></AppInfo>
      </Container>
    </>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary',
};
