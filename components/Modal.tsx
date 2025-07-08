import { Link, useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

export default function Modal({ children, prevRoute }: { children: ReactNode; prevRoute: string }) {
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
      <Link href={prevRoute} asChild>
        <Pressable style={StyleSheet.absoluteFill} />
      </Link>
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
        <Pressable
          onPress={() => {
            router.back();
          }}>
          <Text>← Go back</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}
