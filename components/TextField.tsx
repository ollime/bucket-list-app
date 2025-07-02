import React from 'react';
import { View, TextInput, Text } from 'react-native';

export default function TextField({
  label,
  value,
  placeholder,
  onChangeText,
  disabled,
  isValid,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
  isValid?: boolean;
}) {
  let focusStyle = `${isValid ? 'focus:border-green-600' : 'focus:border-red-600'} focus:outline-none`;

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
          className={`${styles.textInput} ${disabled ? styles.disabled : ''} ${focusStyle}`}
          readOnly={disabled}></TextInput>
      </View>
    </>
  );
}

const styles = {
  container: 'm-1 px-1 pt-1 flex flex-col bg-white',
  textInput:
    'border-b-2 border-b border-gray-400 p-2 placeholder:text-gray-400 focus:border-b-green',
  label: 'flex mr-1',
  disabled: 'text-gray-400',
};
