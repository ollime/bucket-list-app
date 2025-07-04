import { Redirect, Stack } from 'expo-router';

import { useSession, SessionProvider } from 'utils/context';

export default function Layout() {
  const session = useSession();

  if (session) {
    return <Redirect href="/account" />;
  }

  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SessionProvider>
  );
}
