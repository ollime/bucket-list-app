import { View, Dimensions } from 'react-native';
import { Image } from 'expo-image';

export default function CastlesOverlay() {
  const screenWidth = Dimensions.get('window').width;
  const imagesPerRow = Math.floor(screenWidth / 50);

  const numOfCastles = 15;
  const maxNumOfCastles = imagesPerRow;

  let images = [];

  let topVariants = [0, 2, 3];
  let bottomVariants = [2, 1, 1];

  for (let i = 0; i < numOfCastles; i++) {
    if (i < maxNumOfCastles) {
      images.push(
        <View>
          <>
            {/* top castle */}
            <CastleImage variant={topVariants[i % 3]}></CastleImage>
            {/* bottom castle */}
            <CastleImage variant={bottomVariants[i % 3]}></CastleImage>
          </>
        </View>
      );
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
              source={require('assets/castles/empty-trim.png')}
              style={styles.trim}
              contentFit="cover"></Image>
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
              source={require('assets/castles/castle-full.png')}
              style={styles.trim}
              contentFit="cover"></Image>
            <Image
              source={require('assets/castles/castle.png')}
              style={styles.castle}
              contentFit="cover"></Image>
          </>
        );
      case 2:
        return (
          <>
            <Image
              source={require('assets/castles/castle-trim.png')}
              style={styles.trim}
              contentFit="cover"></Image>
            <Image
              source={require('assets/castles/castle.png')}
              style={styles.castle}
              contentFit="cover"></Image>
          </>
        );
      case 3:
        return (
          <>
            <Image
              source={require('assets/castles/castle-top-trim.png')}
              style={styles.trim}
              contentFit="cover"></Image>
            <Image
              source={require('assets/castles/castle-top.png')}
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
    height: 40,
    aspectRatio: 1,
  },
  trim: {
    width: 50,
    height: 10,
    aspectRatio: 1,
  },
};
