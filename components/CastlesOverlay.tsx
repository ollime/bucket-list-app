import { useState } from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';

export default function CastlesOverlay({ numOfCastles }: { numOfCastles: number }) {
  let [containerWidth, setContainerWidth] = useState<number>();
  const screenWidth = containerWidth ?? 100;
  const imagesPerRow = Math.floor(screenWidth / 60);
  let images = [];
  let castlesShown = 0;

  for (let i = 0; i < imagesPerRow; i++) {
    let variant = Math.floor(Math.random() * 7);
    if (castlesShown < numOfCastles) {
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
      images.push(
        <View className="h-[150px] w-[50px]">
          <CastleImage variant={variant} key={`castle-${i}-${castlesShown}`}></CastleImage>
        </View>
      );
    } else {
      break;
    }
  }

  return (
    <View className="absolute bottom-[0px] left-[-1px] z-[2] flex w-full flex-1">
      <View
        className={`flex w-full flex-row flex-wrap-reverse items-end justify-center`}
        onLayout={(e) => {
          setContainerWidth(e.nativeEvent.layout.width);
        }}>
        {images}
      </View>
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
              contentFit="contain"></Image>
          </>
        );
      case 1:
        return (
          <>
            <Image
              source={require('assets/castles/toothed-1.png')}
              style={styles.castle}
              contentFit="contain"></Image>
          </>
        );
      case 2:
        return (
          <>
            <Image
              source={require('assets/castles/toothed-2.png')}
              style={styles.castle}
              contentFit="contain"></Image>
          </>
        );
      case 3:
        return (
          <>
            <Image
              source={require('assets/castles/round-2.png')}
              style={styles.castle}
              contentFit="contain"></Image>
          </>
        );
      case 4:
        return (
          <>
            <Image
              source={require('assets/castles/round-toothed-2.png')}
              style={styles.castle}
              contentFit="contain"></Image>
          </>
        );
      case 5:
        return (
          <>
            <Image
              source={require('assets/castles/pointed-2.png')}
              style={styles.castle}
              contentFit="contain"></Image>
          </>
        );
      case 6:
        return (
          <>
            <Image
              source={require('assets/castles/pointed-3.png')}
              style={styles.castle}
              contentFit="contain"></Image>
          </>
        );
      case 7:
        return (
          <>
            <Image
              source={require('assets/castles/round-toothed-flag-2.png')}
              style={styles.castle}
              contentFit="contain"></Image>
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
