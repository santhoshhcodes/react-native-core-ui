import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface ColumnProps {
  children: React.ReactNode;
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap?: number;
  style?: StyleProp<ViewStyle>;
}

export const Column: React.FC<ColumnProps> = ({
  children,
  justify = 'flex-start',
  align = 'stretch', // Stretches elements across vertical column bounds by default
  gap,
  style,
}) => {
  const customStyles: ViewStyle = {
    justifyContent: justify,
    alignItems: align,
    ...(gap && { gap }),
  };

  return <View style={[styles.base, customStyles, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'column',
  },
});