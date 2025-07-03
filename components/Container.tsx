import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className={styles.root}>
      <SafeAreaProvider>
        <SafeAreaView className={styles.container}>{children}</SafeAreaView>;
      </SafeAreaProvider>
    </View>
  );
};

const styles = {
  container: 'flex flex-1',
  root: 'flex flex-1 bg-primary',
};
