import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';

import { MinimizedActivity } from 'utils/activity.types';
import { useRouter } from 'expo-router';

interface BucketListProps {
  data: MinimizedActivity[];
}

interface BucketListItemProps {
  data: MinimizedActivity;
}

export default function BucketList({ data }: BucketListProps) {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <BucketListItem data={item} />}
      contentContainerStyle={{ padding: 2 }}
      estimatedItemSize={16}
      showsVerticalScrollIndicator={false}
    />
  );
}

export function BucketListItem({ data }: BucketListItemProps) {
  const router = useRouter();
  function handleOpenEdit() {
    router.navigate({
      pathname: '/home/details',
      params: { activity: data.activity },
    });
  }

  return (
    <TouchableWithoutFeedback onPress={handleOpenEdit}>
      <View className={styles.listItem}>
        <Image
          source={require('assets/front-page/bucket.png')}
          style={{ width: 100, height: 100 }}></Image>
        <View>
          <Text className={styles.itemTitle}>{data.activity}</Text>
          <Text className={styles.itemDescription}>{data.description}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = {
  listItem: 'flex flex-row p-2',
  itemTitle: 'font-bold p-2',
  itemDescription: 'px-2',
};
