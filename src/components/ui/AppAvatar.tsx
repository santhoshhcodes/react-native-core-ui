import React, { useState, useMemo } from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, StyleProp, ImageStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface AppAvatarProps {
  name: string;
  uri?: string | null;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const AppAvatar: React.FC<AppAvatarProps> = ({ name, uri, size = 44, style }) => {
  const { colors, borderRadius } = useTheme();
  const [hasError, setHasError] = useState(false);

  // Parse text into clean 2-character initials
  const initials = useMemo(() => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return `${parts[0]?.[0] || '?'}`.toUpperCase();
  }, [name]);

  // Generate a predictable background color based on name string mapping strings
  const avatarBg = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const opacities = ['15', '25']; // Keep it clean and soft for contrast matching layout
    return colors.primary + opacities[Math.abs(hash) % opacities.length];
  }, [name, colors.primary]);

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2, // Perfect circle tracking parameters
  };

  if (uri && !hasError) {
    return (
      <Image
        source={{ uri }}
        style={[styles.base, containerStyle, style as StyleProp<ImageStyle>]}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <View style={[styles.base, styles.fallback, containerStyle, { backgroundColor: avatarBg }, style]}>
      <Text style={[styles.text, { color: colors.textPrimary, fontSize: size * 0.4 }]} allowFontScaling={false}>
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: { overflow: 'hidden' },
  fallback: { justifyContent: 'center', alignItems: 'center' },
  text: { fontWeight: '700', letterSpacing: -0.2 },
});