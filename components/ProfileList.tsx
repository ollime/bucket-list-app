import { Text, View, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';

interface ListItemData {
  title: string;
  avatarUrl?: string;
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
          {item.avatarUrl ? (
            <Image
              source={{ uri: item.avatarUrl }}
              accessibilityLabel="Avatar"
              className="size-[40px] overflow-hidden rounded-full object-cover pt-0"></Image>
          ) : (
            <View className="size-[40px] rounded-full border-2 border-black bg-white"></View>
          )}
          <Text className={styles.item}>{item.title}</Text>
        </View>
      )}
      contentContainerStyle={{ backgroundColor: 'white', padding: 2 }}
      estimatedItemSize={48}
    />
  );
}

const styles = {
  itemContainer: 'flex flex-row items-center',
  item: 'p-2 m-2',
};
