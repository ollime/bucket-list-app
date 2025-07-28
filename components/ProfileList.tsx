import { useEffect, useState } from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';

import { ProfileData } from 'utils/profile.types';
import { useSession } from 'utils/AuthContext';
import { showAlert } from 'utils/alert';
import { updateFriendStatus } from 'api/friends-api';
import { downloadImage, getUsername } from 'api/profiles-api';

import { RoundButton } from './Button';

interface ProfileListProps {
  data: ProfileData[];
  onRefresh: () => void;
  refreshing: boolean;
  ref: any;
}

export default function ProfileList({ data, onRefresh, refreshing, ref }: ProfileListProps) {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <ProfileListItem item={item} />}
      contentContainerStyle={{ backgroundColor: 'white', padding: 2 }}
      estimatedItemSize={48}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ref={ref}
    />
  );
}

function ProfileListItem({ item }: { item: ProfileData }) {
  const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    let isMounted = true;
    async function downloadData(path: string) {
      if (path) {
        const newUrl = (await downloadImage(path)) as unknown as string;
        if (isMounted) setAvatarUri(newUrl);
      }
    }
    if (item.avatarUrl) {
      downloadData(item.avatarUrl);
    }
    return () => {
      isMounted = false;
    };
  }, [item.avatarUrl]);

  function handleOpenProfile() {
    router.push(`profile/${item.username}`);
  }

  function renderButtonProps() {
    switch (item.friendStatus) {
      case 'requested':
        return { label: 'Requested', disabled: true, callback: () => {} };
      case 'pending':
        return {
          label: 'Accept request',
          disabled: false,
          callback: async () => {
            updateFriendStatus('accepted', item.username, await getUsername(session ?? undefined));
            showAlert('Accepted friend request!', 'info', false);
          },
        };
      case 'accepted':
        return {
          label: 'Friends',
          disabled: false,
          callback: async () => {
            router.navigate({
              pathname: '/friends/unfriend',
              params: {
                screenName: item.username,
              },
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
    <TouchableWithoutFeedback onPress={handleOpenProfile}>
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
    </TouchableWithoutFeedback>
  );
}

const styles = {
  itemContainer: 'flex flex-row flex-1 h-full items-center',
  itemLabel: 'p-2 m-2 flex-1',
  itemImage: 'm-2 size-[40px] overflow-hidden rounded-full object-cover pt-0',
  blankImage: 'border-2 border-black bg-white',
  button: 'self-center',
};
