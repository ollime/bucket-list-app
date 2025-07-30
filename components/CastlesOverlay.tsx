import { View, Dimensions } from 'react-native';
import { Image } from 'expo-image';

export default function CastlesOverlay() {
  const screenWidth = Dimensions.get('window').width;
  const imagesPerRow = Math.floor(screenWidth / 50);

  const numOfCastles = 10;

  let images = [];
  let castlesShown = 0;

  for (let i = 0; i < imagesPerRow; i++) {
    if (numOfCastles - castlesShown === 1) {
      castlesShown++;
      images.push(<CastleImage variant={1}></CastleImage>);
      break;
    }

    let variant = Math.floor(Math.random() * 7);
    if (variant === 2) {
      if (i % 2 === 0) {
        variant = 7;
      }
    }
    if (variant > 1) {
      castlesShown += 2;
    } else if (variant === 6) {
      castlesShown += 3;
    } else if (variant !== 0) {
      castlesShown++;
    }
    if (castlesShown <= numOfCastles) {
      images.push(<CastleImage variant={variant}></CastleImage>);
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
 *    0: empty
 *    1: single tower
 *    >2: double tower
 *    6: triple tower
 *    7: flag variant
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
      case 6:
        return (
          <>
            <Image
              source={require('assets/castles/pointed-3.png')}
              style={styles.castle}
              contentFit="cover"></Image>
          </>
        );
      case 7:
        return (
          <>
            <Image
              source={require('assets/castles/round-toothed-flag-2.png')}
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
    height: 150,
    aspectRatio: 1,
  },
};
