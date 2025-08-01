import { use, useEffect, createContext, type PropsWithChildren, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showAlert } from './alert';

type LocalDataKeys = 'isDarkMode' | 'overlayAllowed';
interface ThemeData {
  isDarkMode?: boolean;
  overlayAllowed?: boolean;
}

export const ThemeContext = createContext<ThemeData>({
  isDarkMode: false,
  overlayAllowed: true,
});

export function useTheme() {
  const value = use(ThemeContext);
  if (!value) {
    throw new Error('useTheme must be wrapped in a <ThemeProvider />');
  }
  return value;
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<ThemeData>({
    isDarkMode: false,
    overlayAllowed: true,
  });

  useEffect(() => {
    async function getAllData() {
      const isDark = (await getData('isDarkMode')) ?? false;
      const overlayAllowed = (await getData('overlayAllowed')) ?? false;

      setData({
        isDarkMode: isDark,
        overlayAllowed: overlayAllowed,
      });
    }
    getAllData();
  }, []);

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
}

export const storeData = async (key: LocalDataKeys, value: boolean) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e: any) {
    showAlert(e, 'error', false);
  }
};

export const getData = async (key: LocalDataKeys) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e: any) {
    showAlert(e, 'error', false);
  }
};
