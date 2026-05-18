import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const themeBase = {
  spacing,
  typography,
  borderRadius: {
    s: 4,
    m: 8,
    l: 12,
    round: 999,
  },
};

export const getTheme = (mode: 'light' | 'dark') => ({
  ...themeBase,
  colors: colors[mode],
  isDark: mode === 'dark'
});

export type Theme = ReturnType<typeof getTheme> & {
  themeMode: 'light' | 'dark' | 'system'; // Updated here
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
};