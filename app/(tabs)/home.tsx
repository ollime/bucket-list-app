import React from 'react';
import { Text, Image, View } from 'react-native';
import { Container } from 'components/Container';

export default function Home() {
  return (
    <Container>
      <View className={styles.listItem}>
        <Image
          source={require('assets/front-page/bucket.png')}
          style={{ width: 100, height: 100 }}></Image>
        <Text>Hello</Text>
      </View>
      <View className={styles.background}>
        <View className="flex flex-1"></View>
        <Image
          source={require('assets/front-page/waves.png')}
          // do not use > 180px for height. adjust the height value to change the size of the entire image
          style={{ height: 180, width: '100%', resizeMode: 'repeat' }}></Image>
      </View>
    </Container>
  );
}

const styles = {
  listItem: 'flex flex-row',
  background: 'flex-1 flex-grow justify-end',
};
