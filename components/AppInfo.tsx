import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function AppInfo() {
  return (
    <View className="flex flex-1 flex-row items-end">
      <View className="flex flex-1 flex-row justify-end bg-black p-4">
        <Link
          href="https://github.com/ollime/bucket-list-app"
          className="flex flex-row items-center justify-center p-2 px-4">
          <Image
            source={require('assets/github-mark-white.png')}
            style={{ width: 20, height: 20 }}></Image>
          <Text className="mx-2 items-center text-white">Source</Text>
        </Link>
        <Link
          href="https://github.com/ollime/bucket-list-app/issues"
          className="flex flex-row items-center justify-center p-2 px-4">
          <MaterialCommunityIcons name="exclamation-thick" size={20} color="white" />
          <Text className="align-middle text-white">Report issues</Text>
        </Link>
      </View>
    </View>
  );
}
