import { View, Dimensions } from 'react-native';
import { Image } from 'expo-image';

export default function CastlesOverlay() {
  const screenWidth = Dimensions.get('window').width;
  const imagesPerRow = Math.floor(screenWidth / 50);

  const numOfCastles = 3;

  let images = [];
  let castlesShown = 0;

  for (let i = 0; i < imagesPerRow; i++) {
    let variant = Math.floor(Math.random() * 6);
    if (castlesShown < numOfCastles) {
      images.push(<CastleImage variant={variant}></CastleImage>);
    }
    if (variant > 1) {
      castlesShown += 2;
    } else {
      castlesShown++;
    }
  }

  return (
    <View className="absolute bottom-[0px] left-[-1px] z-[2] flex w-full flex-1">
      <View className={`flex flex-row flex-wrap-reverse items-end justify-center`}>{images}</View>
    </View>
  );
}

/**
 *
 * @param variant variant style
 *    1: empty
 *    2: filled
 *    3: castle
 * @returns
 */
function CastleImage({ variant }: { variant: number }) {
  function getImage() {
    switch (variant) {
      case 0:
        return (
          <>
            <Image
              source={require('assets/castles/empty.png')}
              style={styles.castle}
              contentFit="cover"></Image>
          </>
        );
      case 1:
        return (
          <>
            <Image
              source={require('assets/castles/toothed-1.png')}
              style={styles.castle}
              contentFit="cover"></Image>
          </>
        );
      case 2:
        return (
          <>
            <Image
              source={require('assets/castles/toothed-2.png')}
              style={styles.castle}
              contentFit="cover"></Image>
          </>
        );
      case 3:
        return (
          <>
            <Image
              source={require('assets/castles/round-2.png')}
              style={styles.castle}
              contentFit="cover"></Image>
          </>
        );
      case 4:
        return (
          <>
            <Image
              source={require('assets/castles/round-toothed-2.png')}
              style={styles.castle}
              contentFit="cover"></Image>
          </>
        );
      case 5:
        return (
          <>
            <Image
              source={require('assets/castles/pointed-2.png')}
              style={styles.castle}
              contentFit="cover"></Image>
          </>
        );
    }
  }

  return <>{getImage()}</>;
}

const styles = {
  castle: {
    width: 50,
    height: 100,
    aspectRatio: 1,
  },
};
