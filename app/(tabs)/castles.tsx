import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { getActivitiesCount } from 'api/activities-api';
import { useSession } from 'utils/AuthContext';
import CastlesOverlay from 'components/CastlesOverlay';
import Container from 'components/Container';

export default function Castles() {
  const session = useSession();
  const [numOfCastles, setNumOfCastles] = useState<number>(0);
  const image = (
    <>
      <View className="absolute bottom-0 z-[-2] h-[150px] w-full">
        <Image
          source={require('assets/background/waves-long.png')}
          // do not use > 180px for height. adjust the height value to change the size of the entire image
          style={{ flex: 1, height: 150 }}
          contentFit="cover"></Image>
      </View>
      <View className="absolute bottom-0 z-[-2] h-[150px] w-full">
        <Image
          source={require('assets/background/sand-bg.png')}
          // do not use > 180px for height. adjust the height value to change the size of the entire image
          style={{ flex: 1, height: 150 }}
          contentFit="cover"></Image>
      </View>
      <View className="absolute z-[1] ml-[75vw] w-full" style={{ height: 100, bottom: 10 }}>
        <Image
          source={require('assets/background/sandman.png')}
          style={{ flex: 1, height: 100, width: 100 }}
          contentFit="contain"></Image>
      </View>
    </>
  );

  useEffect(() => {
    async function getData() {
      const count = await getActivitiesCount(session ?? undefined);
      setNumOfCastles(count ?? 0);
    }
    if (session) {
      getData();
    }
  }, [session]);

  return (
    <Container images={image}>
      <Text className={'m-2 text-center text-3xl font-bold text-primary'}>
        {numOfCastles} activities completed
      </Text>
      <View style={styles.castles}>
        <CastlesOverlay numOfCastles={numOfCastles}></CastlesOverlay>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  castles: {
    display: 'flex',
    flex: 1,
    marginBottom: 20,
  },
});
