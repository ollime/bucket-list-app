import { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { supabase } from 'utils/supabase';
import { RoundButton } from './Button';
import { useRouter } from 'expo-router';
import { ProfileData } from 'utils/Profile.types';

interface ProfileListProps {
  data: ProfileData[];
}

export default function ProfileList({ data }: ProfileListProps) {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <ProfileListItem item={item} />}
      contentContainerStyle={{ backgroundColor: 'white', padding: 2 }}
      estimatedItemSize={48}
    />
  );
}

function ProfileListItem({ item }: { item: ProfileData }) {
  const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path);
        if (error) {
          throw error;
        }
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          if (isMounted) setAvatarUri(fr.result as string);
        };
      } catch (error) {
        if (error instanceof Error) {
          alert('Error downloading image: ' + error.message);
        }
      }
    }
    if (item.avatarUrl) {
      downloadImage(item.avatarUrl);
    }
    return () => {
      isMounted = false;
    };
  }, [item.avatarUrl]);

  function renderButtonProps() {
    switch (item.friendStatus) {
      case 'requested':
        return { label: 'Requested', disabled: true, callback: () => {} };
      case 'pending':
        return {
          label: 'Accept',
          disabled: false,
          callback: () => {
            alert('Accepted friend request!');
          },
        };
      case 'accepted':
        return {
          label: 'Friends',
          disabled: false,
          callback: () => {
            router.navigate({
              pathname: '/friends/unfriend',
              params: { screenName: item.username },
            });
          },
        };
      default:
        return {
          label: 'Send request',
          disabled: false,
          callback: () => {
            router.navigate({ pathname: '/search/modal', params: { screenName: item.username } });
          },
        };
    }
  }

  return (
    <View className={styles.itemContainer}>
      {item.avatarUrl && avatarUri ? (
        <Image
          source={{ uri: avatarUri }}
          accessibilityLabel="Avatar"
          className={styles.itemImage}
        />
      ) : (
        <View className={`${styles.itemImage} ${styles.blankImage}`}></View>
      )}
      <Text className={styles.itemLabel}>{item.username}</Text>
      <View className={styles.button}>
        <RoundButton {...renderButtonProps()} />
      </View>
    </View>
  );
}

const styles = {
  itemContainer: 'flex flex-row flex-1 h-full items-center',
  itemLabel: 'p-2 m-2 flex-1',
  itemImage: 'm-2 size-[40px] overflow-hidden rounded-full object-cover pt-0',
  blankImage: 'border-2 border-black bg-white',
  button: 'self-center',
};
