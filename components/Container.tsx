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
            <View className="absolute bottom-0 z-[-1] h-[150px] w-full">
              <ImageBackground
                source={require('assets/front-page/waves-long.png')}
                // do not use > 180px for height. adjust the height value to change the size of the entire image
                style={{ flex: 1 }}
                imageStyle={{ height: 150 }}
                resizeMode="repeat"></ImageBackground>
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
