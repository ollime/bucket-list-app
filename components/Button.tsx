import { View, Text } from 'react-native';

export default function Button({ label, callback }: { label: string; callback: () => void }) {
  return (
    <>
      <View className="bg-secondary w-fit rounded-xl p-4">
        <Text className="font-semibold" onPress={callback}>
          {label}
        </Text>
      </View>
    </>
  );
}
