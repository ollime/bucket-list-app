import { use, useEffect, createContext, type PropsWithChildren, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showAlert } from './alert';

type LocalDataKeys = 'isSnow' | 'isDarkMode' | 'overlayAllowed';
interface ThemeData {
  isSnow?: boolean;
  isDarkMode?: boolean;
  overlayAllowed?: boolean;
}

export const ThemeContext = createContext<ThemeData>({
  isSnow: false,
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
    isSnow: false,
    overlayAllowed: true,
  });

  useEffect(() => {
    async function getAllData() {
      const isSnow = (await getData('isSnow')) ?? false;
      const isDark = (await getData('isDarkMode')) ?? false;
      const overlayAllowed = (await getData('overlayAllowed')) ?? false;

      setData({
        isDarkMode: isDark,
        isSnow: isSnow,
        overlayAllowed: overlayAllowed,
      });
    }
    getAllData();
  }, []);

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
}

export const storeData = async (key: LocalDataKeys, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e: any) {
    showAlert(e, 'error', false);
  }
};

export const getData = async (key: LocalDataKeys) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value === 'true';
    }
  } catch (e: any) {
    showAlert(e, 'error', false);
  }
};
