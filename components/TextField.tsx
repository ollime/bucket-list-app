import { View, TextInput, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type TextFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isValid?: boolean;
  icon?: keyof typeof MaterialIcons.glyphMap;
  obfuscateText?: boolean;
  multiline?: boolean;
};

export default function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  disabled,
  isValid = true,
  icon,
  obfuscateText = false,
  multiline = false,
}: TextFieldProps) {
  let focusStyle = isValid ? 'focus-within:border-green-600' : 'focus-within:border-red-600';
  let multilineStyle = multiline ? 'border-2 rounded-lg' : '';
  let widthStyles = multiline ? 'w-80' : 'w-64';

  return (
    <>
      <View className={`${styles.container} ${widthStyles}`}>
        <Text className={styles.label}>{label}</Text>
        <View className={`${styles.containerRow} ${focusStyle} ${multilineStyle}`}>
          <TextInput
            value={value}
            placeholder={placeholder}
            onChangeText={(value: string) => {
              disabled ?? onChangeText(value);
            }}
            className={`${styles.textInput} ${disabled ? styles.disabled : ''}`}
            readOnly={disabled}
            secureTextEntry={obfuscateText}
            multiline={multiline}
            numberOfLines={multiline ? 3 : 1}></TextInput>
          <MaterialIcons
            name={icon ? icon : disabled ? 'edit-off' : 'edit'}
            size={24}
            color="gray"
            className={`my-2 flex items-end ${multiline ? 'mx-2' : ''}`}
          />
        </View>
      </View>
    </>
  );
}

const styles = {
  container: 'm-1 px-1 pt-1 flex flex-col bg-white',
  containerRow: 'flex flex-row border-b-2 border-gray-400',
  textInput: 'flex-1 p-2 w-full placeholder:text-gray-400 focus:outline-none',
  label: 'flex mr-1',
  disabled: 'text-gray-400',
};
