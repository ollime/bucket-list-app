import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import Button from './Button';

interface ErrorBoundaryProps {
  error: Error;
  retry: () => Promise<void>;
  extraInfo?: string;
}

export function ErrorBoundary({ error, retry, extraInfo }: ErrorBoundaryProps) {
  return (
    <View className={styles.container}>
      <Image
        source={require('assets/error-page/otter-alarm.png')}
        // do not use > 180px for height. adjust the height value to change the size of the entire image
        style={{ height: 250, width: 200 }}
        contentFit="contain"></Image>

      <Text className={styles.title}>{error.message}</Text>
      <Text className="m-2">{extraInfo}</Text>
      <View className={styles.buttonContainer}>
        <Button label="Go back" callback={retry}></Button>
      </View>
    </View>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary text-center',
  container: 'flex flex-1 items-center justify-center',
  buttonContainer: 'm-6',
};
