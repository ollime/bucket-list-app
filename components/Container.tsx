import { View, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className={styles.root}>
      <SafeAreaProvider>
        <SafeAreaView className={styles.container}>{children}</SafeAreaView>
      </SafeAreaProvider>
      <View className={styles.background}>
        <View className="flex flex-1"></View>
        <Image
          source={require('assets/front-page/waves.png')}
          // do not use > 180px for height. adjust the height value to change the size of the entire image
          style={{ height: 150, width: '100%', resizeMode: 'repeat' }}></Image>
      </View>
    </View>
  );
};

const styles = {
  container: 'flex flex-1',
  root: 'flex flex-1 bg-primary',
  background: 'flex-1 flex-grow justify-end',
};
