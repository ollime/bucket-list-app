import { Text, View } from 'react-native';
import { Image } from 'expo-image';

export default function BucketListItem({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
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
