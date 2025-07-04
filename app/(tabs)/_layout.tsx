import { Text } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useSession } from './../../utils/context';

export default function TabLayout() {
  const session = useSession();

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarShowLabel: false,
        tabBarStyle: { display: 'flex', padding: 5 },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'search',
          tabBarIcon: ({ color }) => <MaterialIcons name="search" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
