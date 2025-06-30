import { Container } from 'components/Container';
import { View, Text } from 'react-native';

import './../global.css';

export default function App() {
  return (
    <>
      <Container>
        <View className="bg-primary flex flex-1">
          <Text>First page loads</Text>
        </View>
      </Container>
    </>
  );
}
