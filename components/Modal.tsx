import { useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { RoundButton } from './Button';

type ModalProps = {
  children: ReactNode;
  onConfirm?: () => void;
};

export default function Modal({ children, onConfirm }: ModalProps) {
  const router = useRouter();
  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000040',
      }}>
      {/* Dismiss modal when pressing outside */}
      <Pressable
        onPress={() => {
          router.navigate('../');
        }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        entering={SlideInDown}
        style={{
          width: '80%',
          height: '80%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
        }}>
        {children}
        <View className="m-2 flex flex-row">
          {onConfirm ? (
            <RoundButton
              label="Confirm"
              callback={() => {
                onConfirm();
                router.navigate('../');
              }}></RoundButton>
          ) : (
            ''
          )}
          <RoundButton label="Go back" callback={() => router.back()}></RoundButton>
        </View>
      </Animated.View>
    </Animated.View>
  );
}
