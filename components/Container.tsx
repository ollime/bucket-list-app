import { View, ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <View className={styles.root}>
        <SafeAreaProvider>
          <SafeAreaView className={styles.container}>
            <View className="flex-1">{children}</View>
            <View className="absolute bottom-0 z-[-1] ml-[20vw] h-[150px] w-full">
              <ImageBackground
                source={require('assets/front-page/duck.png')}
                style={{ flex: 1 }}
                imageStyle={{ height: 100, width: 100 }}
                resizeMode="contain"></ImageBackground>
            </View>
            <View className="absolute bottom-[-10px] z-[-1] ml-[75vw] h-[150px] w-full">
              <ImageBackground
                source={require('assets/front-page/ring.png')}
                style={{ flex: 1 }}
                imageStyle={{ height: 100, width: 100 }}
                resizeMode="contain"></ImageBackground>
            </View>
            <View className="absolute bottom-0 z-[-2] h-[150px] w-full">
              <ImageBackground
                source={require('assets/front-page/waves-long.png')}
                // do not use > 180px for height. adjust the height value to change the size of the entire image
                style={{ flex: 1 }}
                imageStyle={{ height: 150 }}
                resizeMode="stretch"></ImageBackground>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
      <Toast />
    </>
  );
};

const styles = {
  container: 'flex flex-1 relative',
  root: 'flex flex-1 bg-background',
  background: 'flex-shrink justify-end',
};
