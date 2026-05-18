import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';

interface RowProps {
  children: React.ReactNode;
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap?: number;
  onPress?: () => void; // Converts it into an interactive row automatically if passed
  style?: StyleProp<ViewStyle>;
}

export const Row: React.FC<RowProps> = ({
  children,
  justify = 'space-between', // Defaults to settings-row spread alignment
  align = 'center',          // Defaults to perfectly vertically-centered rows
  gap,
  onPress,
  style,
}) => {
  const customStyles: ViewStyle = {
    justifyContent: justify,
    alignItems: align,
    ...(gap && { gap }), // Uses modern React Native flex gap support
  };

  if (onPress) {
    return (
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={onPress} 
        style={[styles.base, customStyles, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.base, customStyles, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    width: '100%',
  },
});