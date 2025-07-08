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

export function RoundButton({
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
      <View className={`m-1 self-start rounded-full ${disabled ? 'bg-gray-400' : 'bg-secondary'}`}>
        <Text
          className="px-4 py-2 font-semibold"
          onPress={!disabled || disabled == null ? callback : () => {}}>
          {label}
        </Text>
      </View>
    </>
  );
}
