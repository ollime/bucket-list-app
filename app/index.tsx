import { Container } from 'components/Container';
import { View, Text } from 'react-native';

import Button from 'components/Button';

import './../global.css';

export default function App() {
  function onClickButton() {
    alert('!!!');
  }

  return (
    <>
      <Container>
        <View className="bg-primary flex flex-1">
          <Text className="text-secondary text-3xl font-bold">Summer Bucket List</Text>
          <Button label="Test Button" callback={onClickButton}></Button>
        </View>
      </Container>
    </>
  );
}
