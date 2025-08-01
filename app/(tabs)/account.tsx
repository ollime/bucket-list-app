import { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

import { supabase } from '../../utils/supabase';
import { useSession } from 'utils/AuthContext';
import { useTheme, storeData } from 'utils/ThemeContext';
import { showAlert } from 'utils/alert';
import Container from 'components/Container';
import AppInfo from 'components/AppInfo';
import Button from 'components/Button';
import Avatar from 'components/Avatar';
import TextField from 'components/TextField';
import Toggle from 'components/Toggle';

export default function Account() {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [fullName, setFullName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [allowsFriends, setAllowsFriends] = useState(false);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  /** if theme is true, theme is snow -- otherwise,  */
  const [isSnow, setIsSnow] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [overlayAllowed, setOverlayAllowed] = useState<boolean>(true);

  const session = useSession();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (!isSaved) {
      showAlert('Changes not saved', 'info', false);
    } else {
      Toast.hide();
    }
  }, [isSaved]);

  useEffect(() => {
    async function getProfile() {
      try {
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
      }
    }

    if (session) getProfile();
    if (theme) {
      setIsSnow(theme.isSnow ?? false);
      setIsDarkMode(theme.isDarkMode ?? false);
      setOverlayAllowed(theme.overlayAllowed ?? true);
    }
  }, [session, theme]);

  async function updateProfile({
    username,
    avatar_url,
    full_name,
    is_public,
    allows_friends,
  }: {
    username: string;
    avatar_url: string;
    full_name: string;
    is_public: boolean;
    allows_friends: boolean;
  }) {
    try {
      setIsSaved(true);
      if (!session?.user) throw new Error('No user on the session!');
      const updates = {
        id: session?.user.id,
        username,
        avatar_url,
        full_name,
        updated_at: new Date(),
        is_public,
        allows_friends,
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

  const handleChangeUsername = (value: string) => {
    setUsername(value);
    setIsSaved(false);
  };

  const handleChangeAlias = (value: string) => {
    setFullName(value);
    setIsSaved(false);
  };

  function handleTogglePublic() {
    setIsPublic(!isPublic);
    setIsSaved(false);
  }

  function handleToggleFriends() {
    setAllowsFriends(!allowsFriends);
    setIsSaved(false);
  }

  function handleToggleDark() {
    storeData('isDarkMode', !isDarkMode);
    setIsDarkMode(!isDarkMode);
  }

  function handleToggleSnow() {
    storeData('isSnow', !isSnow);
    setIsSnow(!isSnow);
  }

  function handleToggleOverlay() {
    storeData('overlayAllowed', !overlayAllowed);
    setOverlayAllowed(!overlayAllowed);
  }

  return (
    <>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className={styles.title}>Profile</Text>
          <View className="my-2">
            <Avatar
              size={200}
              url={avatarUrl}
              onUpload={(url: string) => {
                setAvatarUrl(url);
                updateProfile({
                  username,
                  avatar_url: url,
                  full_name: fullName,
                  is_public: isPublic,
                  allows_friends: allowsFriends,
                });
              }}
              userId={session?.user.id ?? ''}></Avatar>
          </View>

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
              onChangeText={handleChangeUsername}></TextField>
            <TextField
              label="Alias (visible to friends only)"
              value={fullName || ''}
              placeholder="name"
              onChangeText={handleChangeAlias}></TextField>

            <Toggle
              value={isPublic}
              label="Profile is public"
              icon={isPublic ? 'public' : 'public-off'}
              callback={handleTogglePublic}></Toggle>
            <Toggle
              value={allowsFriends}
              label="Allow others to friend you"
              icon={allowsFriends ? 'person-add' : 'person-add-disabled'}
              callback={handleToggleFriends}></Toggle>
          </View>

          <View className={'my-2'}>
            <Text className={`${styles.subtitle}`}>Local settings</Text>
            <Toggle
              value={overlayAllowed}
              label="Show sandcastle overlay"
              icon={overlayAllowed ? 'castle' : 'close'}
              callback={handleToggleOverlay}></Toggle>
            <Toggle
              value={isDarkMode}
              label={isDarkMode ? 'Dark mode' : 'Light mode'}
              icon={isDarkMode ? 'light-mode' : 'dark-mode'}
              callback={handleToggleDark}></Toggle>
            <Toggle
              value={isSnow}
              label={'Theme: ' + 'Sand'}
              icon={isSnow ? 'cloudy-snowing' : 'tsunami'}
              callback={handleToggleSnow}></Toggle>
          </View>

          <View className="mt-2 flex flex-row">
            <Button
              label="Update Profile"
              callback={() => {
                updateProfile({
                  username,
                  avatar_url: avatarUrl,
                  full_name: fullName,
                  is_public: isPublic,
                  allows_friends: allowsFriends,
                });
              }}></Button>

            <Button
              label="Sign out"
              callback={() => {
                supabase.auth.signOut();
                router.push('/');
              }}></Button>
          </View>
        </ScrollView>
        <View className="z-[-1]">
          <AppInfo></AppInfo>
        </View>
      </Container>
    </>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary',
  subtitle: 'text-xl font-bold text-primary my-2',
};
