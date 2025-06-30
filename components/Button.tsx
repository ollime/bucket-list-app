import { View, Text } from 'react-native';

export default function Button({ label, callback }: { label: string; callback: () => void }) {
  return (
    <>
      <View className="w-fit rounded-xl bg-secondary">
        <Text className="p-4 font-semibold" onPress={callback}>
          {label}
        </Text>
      </View>
    </>
  );
}
