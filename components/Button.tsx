import { View, Text } from 'react-native';

export default function Button({
  label,
  callback,
  disabled,
}: {
  label: string;
  callback: () => void;
  disabled?: boolean;
}) {
  return (
    <>
      <View className="m-1 self-start rounded-xl bg-secondary">
        <Text
          className="p-4 font-semibold"
          onPress={!disabled || disabled == null ? callback : () => {}}>
          {label}
        </Text>
      </View>
    </>
  );
}
