import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="[user]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="details-view"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
