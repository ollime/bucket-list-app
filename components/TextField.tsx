import React from 'react';
import { View, TextInput, Text } from 'react-native';

export default function TextField({
  label,
  value,
  placeholder,
  onChangeText,
  disabled,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
}) {
  return (
    <>
      <View className={styles.container}>
        <Text className={styles.label}>{label}</Text>
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={(value: string) => {
            disabled ?? onChangeText(value);
          }}
          className={`${styles.textInput} ${disabled ? styles.disabled : ''}`}
          readOnly={disabled}></TextInput>
      </View>
    </>
  );
}

const styles = {
  container: 'flex flex-row items-center',
  textInput: 'w-fit rounded-full bg-white p-2 m-1 placeholder:text-gray-400 border-0',
  label: 'flex mr-1',
  disabled: 'text-gray-400',
};
