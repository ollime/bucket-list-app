import { View, Text } from 'react-native';
import { ErrorBoundaryProps } from 'expo-router';
import { Image } from 'expo-image';
import Button from './Button';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View className={styles.container}>
      <Image
        source={require('assets/error-page/otter-alarm.png')}
        // do not use > 180px for height. adjust the height value to change the size of the entire image
        style={{ height: 250, width: 200 }}
        contentFit="contain"></Image>

      <Text className={styles.title}>{error.message}</Text>
      <View className={styles.buttonContainer}>
        <Button label="Try again" callback={retry}></Button>
      </View>
    </View>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary',
  container: 'flex flex-1 items-center justify-center',
  buttonContainer: 'm-6',
};
