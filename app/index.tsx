import { Text } from 'react-native';
import Container from 'components/Container';
import Auth from 'components/Auth';

import './../global.css';

export default function App() {
  return (
    <>
      <Container>
        <Text className={styles.title}>Bucket List App</Text>
        <Auth></Auth>
      </Container>
    </>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary',
};
