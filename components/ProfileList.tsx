import { Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

interface ListItemData {
  title: string;
}

interface ProfileListProps {
  data: ListItemData[];
}

export default function ProfileList({ data }: ProfileListProps) {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => (
        <View className={styles.itemContainer}>
          <Text>Test</Text>
          <Text className={styles.item}>{item.title}</Text>
        </View>
      )}
      contentContainerStyle={{ backgroundColor: 'white', padding: 2 }}
      estimatedItemSize={48}
    />
  );
}

const styles = {
  itemContainer: 'flex flex-row',
  item: 'p-2',
};
