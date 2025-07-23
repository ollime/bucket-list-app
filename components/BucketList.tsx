import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';

import { MinimizedActivity } from 'utils/activity.types';
import { useRouter } from 'expo-router';
import { useSession } from 'utils/AuthContext';
import StatusBadge from './StatusBadge';

interface BucketListProps {
  data?: MinimizedActivity[];
  user_id: string;
}

interface BucketListItemProps {
  data?: MinimizedActivity;
  user_id: string;
}

export default function BucketList({ data, user_id }: BucketListProps) {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <BucketListItem data={item} user_id={user_id} />}
      contentContainerStyle={{ padding: 2 }}
      estimatedItemSize={16}
      showsVerticalScrollIndicator={false}
    />
  );
}

export function BucketListItem({ data, user_id }: BucketListItemProps) {
  const router = useRouter();
  const session = useSession();

  function handleOpenEdit() {
    if (user_id === session?.user.id) {
      router.navigate({
        pathname: '/home/details-edit',
        params: { activity: data?.activity },
      });
    } else {
      router.navigate({
        pathname: '/home/details-view',
        params: { activity: data?.activity },
      });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleOpenEdit}>
      <View className={styles.listItem}>
        <Image
          source={require('assets/front-page/bucket.png')}
          style={{ width: 100, height: 100 }}></Image>
        <View>
          <Text className={styles.itemTitle}>{data?.activity}</Text>
          <Text className={styles.itemDescription}>{data?.description}</Text>
        </View>
        <StatusBadge
          label={data?.is_complete ? 'complete' : 'incomplete'}
          color={data?.is_complete ? 'bg-primary' : 'bg-secondary'}></StatusBadge>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = {
  listItem: 'flex flex-row p-2',
  itemTitle: 'font-bold p-2',
  itemDescription: 'px-2',
};
