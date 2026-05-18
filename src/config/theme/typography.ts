// src/config/theme/typography.ts

import { TextStyle } from 'react-native';

interface Typography {
  h1: TextStyle;
  h2: TextStyle;
  body: TextStyle;
  caption: TextStyle;
  button: TextStyle;
}

export const typography: Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },

  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },

  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },

  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },

  button: {
    fontSize: 16,
    fontWeight: '600',
  },
};