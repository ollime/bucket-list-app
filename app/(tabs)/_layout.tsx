import { Tabs, Redirect } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useSession } from './../../utils/AuthContext';

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
          title: 'Search',
          tabBarIcon: ({ color }) => <MaterialIcons name="search" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => <MaterialIcons name="person-add" size={24} color={color} />,
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
