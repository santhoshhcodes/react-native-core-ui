import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface AppSkeletonBoneProps {
  width: DimensionValue;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const AppSkeletonBone: React.FC<AppSkeletonBoneProps> = ({
  width,
  height,
  borderRadius = 4,
  style,
}) => {
  const { colors } = useTheme();
  const shimmerAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Continuous loop running entirely on the native UI thread
    const animationLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0.3,
          duration: 650,
          useNativeDriver: true,
        }),
      ])
    );

    animationLoop.start();

    return () => animationLoop.stop(); // Clean memory teardown
  }, [shimmerAnim]);

  return (
    <Animated.View
      style={[
        styles.bone,
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.surface,
          opacity: shimmerAnim,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  bone: { overflow: 'hidden' },
});