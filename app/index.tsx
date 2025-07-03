import { View, Text } from 'react-native';

import Account from './(tabs)/account';
import { Container } from 'components/Container';
import Auth from 'components/Auth';

import './../global.css';

export default function App() {
  return (
    <>
      <View className={styles.container}>
        <Container>
          <Text className={styles.title}>App</Text>
          <Auth></Auth>
        </Container>
      </View>
    </>
  );
}

const styles = {
  container: 'flex flex-1 bg-primary',
  title: 'text-3xl font-bold text-secondary',
};
