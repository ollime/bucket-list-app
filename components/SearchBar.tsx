import { View, TextInput } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  value: string;
  callback: (value: string) => void;
};

export default function SearchBar({ value, callback }: Props) {
  return (
    <View className={styles.textContainer}>
      <TextInput
        value={value}
        placeholder="Search for user"
        onChangeText={callback}
        className={styles.textInput}></TextInput>
      <MaterialIcons name="search" size={24} color="black" />
    </View>
  );
}

const styles = {
  textContainer: 'flex flex-row items-center m-2 px-2 rounded-full bg-white',
  textInput: 'flex-1 p-2 w-full placeholder:text-gray-400 focus:outline-none',
};
