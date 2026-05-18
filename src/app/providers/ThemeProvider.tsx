import React, { createContext, useState, useMemo, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { getTheme, Theme } from '../../config/theme';

export type ThemeModeSetting = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  colors: Theme['colors'];
  spacing: Theme['spacing'];
  typography: Theme['typography'];
  borderRadius: Theme['borderRadius'];
  isDark: boolean;
  themeMode: ThemeModeSetting; // Stores explicitly: 'light' | 'dark' | 'system'
  setThemeMode: (mode: ThemeModeSetting) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme(); // Listens directly to iOS/Android OS changes
  const [modeSetting, setModeSetting] = useState<ThemeModeSetting>('system');

  // Compute actual runtime target appearance rule
  const activeVisualMode = useMemo(() => {
    if (modeSetting === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return modeSetting;
  }, [modeSetting, systemColorScheme]);

  const contextValue = useMemo(() => {
    const computedTheme = getTheme(activeVisualMode);
    return {
      ...computedTheme,
      themeMode: modeSetting,
      setThemeMode: (newMode: ThemeModeSetting) => setModeSetting(newMode),
    };
  }, [activeVisualMode, modeSetting]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};