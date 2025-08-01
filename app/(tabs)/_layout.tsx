import { useState, useEffect } from 'react';
import { Tabs, Redirect } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useSession } from './../../utils/AuthContext';
import { useTheme } from 'utils/ThemeContext';

export default function TabLayout() {
  const session = useSession();
  const theme = useTheme();
  let [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (theme) {
      setIsDarkMode(theme?.isDarkMode ?? false);
    }
  }, [theme]);

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2d70b9',
        tabBarShowLabel: false,
        tabBarStyle: {
          display: 'flex',
          padding: 5,
          paddingTop: 5,
          borderWidth: 0,
          backgroundColor: isDarkMode ? '#1e2939' : '#ffffff',
        },
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
        name="castles"
        options={{
          title: 'Castles',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="castle" size={24} color={color} />
          ),
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
