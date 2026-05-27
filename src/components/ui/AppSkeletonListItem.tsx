import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppSkeletonBone } from './AppSkeletonBone';
import { useTheme } from '@/hooks/useTheme';

export const AppSkeletonListItem: React.FC = () => {
  const { spacing, borderRadius, colors } = useTheme();

  return (
    <View style={[styles.container, { padding: spacing.m, borderBottomColor: colors.border }]}>
      {/* Avatar circular bone fallback */}
      <AppSkeletonBone width={44} height={44} borderRadius={borderRadius.round} />
      
      {/* Metadata content lines layout column */}
      <View style={styles.textContainer}>
        {/* Name line placeholder */}
        <AppSkeletonBone width="50%" height={16} borderRadius={borderRadius.s} />
        {/* Department/Role line placeholder */}
        <AppSkeletonBone width="75%" height={12} borderRadius={borderRadius.s} style={{ marginTop: 6 }} />
      </View>
      
      {/* Right side operational status badge placeholder */}
      <AppSkeletonBone width={12} height={12} borderRadius={borderRadius.round} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
});