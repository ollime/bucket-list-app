import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';

import { MinimizedActivity } from 'utils/activity.types';
import { useSession } from 'utils/AuthContext';
import StatusBadge from './StatusBadge';

interface BucketListProps {
  data?: MinimizedActivity[];
  user_id: string;
  ref: any;
  onRefresh: () => void;
  refreshing: boolean;
}

interface BucketListItemProps {
  data?: MinimizedActivity;
  user_id: string;
}

export default function BucketList({ data, user_id, ref, onRefresh, refreshing }: BucketListProps) {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <BucketListItem data={item} user_id={user_id} />}
      contentContainerStyle={{ padding: 2 }}
      estimatedItemSize={16}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ref={ref}
    />
  );
}

export function BucketListItem({ data, user_id }: BucketListItemProps) {
  const router = useRouter();
  const session = useSession();

  const options: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  };
  const dateFormatter = new Intl.DateTimeFormat('en-US', options);
  const formattedComplete = data?.completed_date
    ? dateFormatter.format(new Date(data?.completed_date))
    : '';
  const formattedPlanned = data?.completed_date
    ? dateFormatter.format(new Date(data?.completed_date))
    : '';

  function handleOpenEdit() {
    if (user_id === session?.user.id) {
      router.navigate({
        pathname: '/home/details-edit',
        params: { activity: data?.activity },
      });
    } else {
      router.navigate({
        pathname: '/profile/details-view',
        params: { activity: data?.activity },
      });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleOpenEdit}>
      <View className={styles.listItem}>
        {data?.is_complete ? (
          <Image
            source={require('assets/front-page/bucket-filled.png')}
            style={{ width: 100, height: 100 }}></Image>
        ) : (
          <Image
            source={require('assets/front-page/bucket.png')}
            style={{ width: 100, height: 100 }}></Image>
        )}
        <View>
          <View className="flex-row">
            <Text className={styles.itemTitle}>{data?.activity}</Text>
            <StatusBadge
              label={
                data?.is_complete
                  ? `completed ${formattedComplete}`
                  : data?.planned_date
                    ? 'incomplete'
                    : `planned ${formattedPlanned}`
              }
              color={data?.is_complete ? 'bg-primary' : 'bg-secondary'}></StatusBadge>
          </View>
          <Text className={styles.itemDescription}>{data?.description}</Text>
        </View>
        <View className="flex-1"></View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = {
  listItem: 'flex flex-row p-2 ',
  itemTitle: 'font-bold p-2',
  itemDescription: 'px-2',
};
