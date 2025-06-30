import { Container } from 'components/Container';
import { View, Text } from 'react-native';

import Button from 'components/Button';
import Auth from 'components/Auth';

import './../global.css';

export default function App() {
  function onClickButton() {
    alert('!!!');
  }

  return (
    <>
      <Container>
        <View className="flex flex-1 bg-primary">
          <Text className="text-3xl font-bold text-secondary">Summer Bucket List</Text>
          <Auth></Auth>
        </View>
      </Container>
    </>
  );
}
