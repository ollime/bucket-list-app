import { View, ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className={styles.root}>
      <SafeAreaProvider>
        <SafeAreaView className={styles.container}>
          <View className="flex-1">{children}</View>
          <View className="absolute bottom-0 z-[-1] h-[150px] w-full">
            <ImageBackground
              source={require('assets/front-page/waves.png')}
              // do not use > 180px for height. adjust the height value to change the size of the entire image
              style={{ flex: 1 }}
              imageStyle={{ width: '100%', height: 150 }}
              resizeMode="repeat"></ImageBackground>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};

const styles = {
  container: 'flex flex-1 relative',
  root: 'flex flex-1 bg-primary',
  background: 'flex-shrink justify-end',
};
