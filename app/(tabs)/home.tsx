import { View, Image as StyledImage } from 'react-native';
import { Container } from 'components/Container';
import BucketListItem from 'components/BucketList';

export default function Home() {
  return (
    <Container>
      <BucketListItem title="activity" description="test"></BucketListItem>
      <View className={styles.background}>
        <View className="flex flex-1"></View>
        <StyledImage
          source={require('assets/front-page/waves.png')}
          // do not use > 180px for height. adjust the height value to change the size of the entire image
          style={{ height: 150, width: '100%', resizeMode: 'repeat' }}></StyledImage>
      </View>
    </Container>
  );
}

const styles = {
  background: 'flex-1 flex-grow justify-end',
};
