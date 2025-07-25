import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function Profile() {
  const { user } = useLocalSearchParams();

  return (
    <View>
      <Text className={styles.title}>{user}</Text>
    </View>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary',
};
