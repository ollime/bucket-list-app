import { useState } from 'react';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Activity } from 'utils/activity.types';
import Button from './Button';

export default function BucketList({ data, userId }: { data: Activity[]; userId: string }) {
  const [activities, setActivities] = useState(data);

  const emptyActivity: Activity = {
    id: userId,
    activity: 'New activity',
    created_at: new Date(Date.now()),
    description: '',
    status: 'incomplete',
    isPublic: true,
    planned_date: new Date(Date.now()),
    completion_date: new Date(Date.now()),
    location: '',
  };

  function handleAddItem() {
    // db logic
    setActivities((prev) => [...prev, emptyActivity]);
  }

  return (
    <View>
      <FlashList
        data={activities}
        renderItem={({ item }) => (
          <BucketListItem title={item.activity} description={item.description} />
        )}
        contentContainerStyle={{ backgroundColor: 'white', padding: 2 }}
        estimatedItemSize={16}
      />
      <Button
        label={<MaterialIcons name="add" size={24} color="black" />}
        callback={handleAddItem}></Button>
    </View>
  );
}

export function BucketListItem({ title, description }: { title: string; description?: string }) {
  return (
    <View className={styles.listItem}>
      <Image
        source={require('assets/front-page/bucket.png')}
        style={{ width: 100, height: 100 }}></Image>
      <View>
        <Text className={styles.itemTitle}>{title}</Text>
        <Text className={styles.itemDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = {
  listItem: 'flex flex-row bg-white p-2',
  itemTitle: 'font-bold p-2',
  itemDescription: 'px-2',
};
