import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Activity } from 'utils/activity.types';
import Button from './Button';

export default function BucketList({ data }: { data: Activity[] }) {
  function handleAddItem() {
    return;
  }

  return (
    <View>
      <FlashList
        data={data}
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
