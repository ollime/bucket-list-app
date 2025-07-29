import { View, Dimensions } from 'react-native';
import { Image } from 'expo-image';

export default function CastlesOverlay() {
  const screenWidth = Dimensions.get('window').width;
  const maxRows = 3;
  const imagesPerRow = Math.floor(screenWidth / 50);

  const numOfCastles = 15;
  const maxNumOfCastles = imagesPerRow * maxRows;

  let images = [];

  for (let i = 0; i < numOfCastles; i++) {
    if (i < maxNumOfCastles) {
      images.push(
        <View>
          <CastleTrim variant={i}></CastleTrim>
          <CastleImage variant={i}></CastleImage>
        </View>
      );
    }
  }

  return (
    <View className="absolute bottom-[0px] left-[-1px] z-[2] flex w-full flex-1">
      <View className={`flex flex-row flex-wrap-reverse justify-center`}>{images}</View>
    </View>
  );
}

function CastleTrim({ variant }: { variant: number }) {
  return (
    <>
      {variant === 1 ? (
        <Image
          source={require('assets/castles/empty-trim.png')}
          style={{
            width: 50,
            height: 10,
            aspectRatio: 1,
          }}
          contentFit="cover"></Image>
      ) : (
        <Image
          source={require('assets/castles/castle-trim.png')}
          style={{
            width: 50,
            height: 10,
            aspectRatio: 1,
          }}
          contentFit="cover"></Image>
      )}
    </>
  );
}

function CastleImage({ variant }: { variant: number }) {
  return (
    <>
      {variant === 1 ? (
        <Image
          source={require('assets/castles/empty.png')}
          style={{
            width: 50,
            height: 40,
            aspectRatio: 1,
          }}
          contentFit="cover"></Image>
      ) : (
        <Image
          source={require('assets/castles/castle.png')}
          style={{
            width: 50,
            height: 40,
            aspectRatio: 1,
          }}
          contentFit="cover"></Image>
      )}
    </>
  );
}
