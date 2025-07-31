import { Redirect, Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

import { useSession, SessionProvider } from 'utils/AuthContext';
import { ThemeProvider } from 'utils/ThemeContext';

export default function Layout() {
  const session = useSession();

  if (session) {
    return <Redirect href="/account" />;
  }

  return (
    <>
      <SessionProvider>
        <ThemeProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
          <Toast></Toast>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
