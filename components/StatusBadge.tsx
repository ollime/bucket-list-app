import { View, Text } from 'react-native';

export default function StatusBadge({ label, color }: { label: string; color: string }) {
  return (
    <View className={`m-1 self-start rounded-full ${color}`}>
      <Text className={`px-2 py-1 font-bold`}>{label}</Text>
    </View>
  );
}
