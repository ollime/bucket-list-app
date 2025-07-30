import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { Try } from 'expo-router/build/views/Try';

import { ErrorBoundary } from 'components/ErrorBoundary';

export default function Container({
  children,
  images,
}: {
  children: React.ReactNode;
  images?: React.ReactNode;
}) {
  const background = images ? (
    images
  ) : (
    <>
      <View className="absolute bottom-[-10px] z-[-1] ml-[20vw] h-[150px] w-full">
        <Image
          source={require('assets/background/duck.png')}
          style={{ flex: 1, height: 100, width: 100 }}
          contentFit="contain"></Image>
      </View>
      <View className="absolute bottom-[20px] z-[-1] ml-[75vw] h-[150px] w-full">
        <Image
          source={require('assets/background/ring.png')}
          style={{ flex: 1, height: 100, width: 100 }}
          contentFit="contain"></Image>
      </View>
      <View className="absolute bottom-0 z-[-2] h-[150px] w-full">
        <Image
          source={require('assets/background/waves-long.png')}
          // do not use > 180px for height. adjust the height value to change the size of the entire image
          style={{ flex: 1, height: 150 }}
          contentFit="cover"></Image>
      </View>
    </>
  );
  return (
    <>
      <View className={styles.root}>
        <SafeAreaProvider>
          <SafeAreaView className={styles.container}>
            <Try catch={ErrorBoundary}>
              <View className="flex-1 p-2">{children}</View>
              {background}
            </Try>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
      {/* style should be opposite to the app theme */}
      <StatusBar style="dark"></StatusBar>
    </>
  );
}

const styles = {
  container: 'flex flex-1 relative',
  root: 'flex flex-1 bg-background',
  background: 'flex-shrink justify-end',
};
