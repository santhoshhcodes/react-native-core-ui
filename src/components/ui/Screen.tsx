import React from 'react';
import { View, StyleSheet, ScrollView, ViewStyle, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

interface ScreenProps {
    children: React.ReactNode;
    style?: ViewStyle;
    isScrollable?: boolean;
}

export const Screen = ({ children, style, isScrollable = false }: ScreenProps) => {
    const insets = useSafeAreaInsets();
    const { colors, isDark, spacing } = useTheme();

    // Calculate protective layout offsets
    const paddingTop = insets.top;
    const paddingBottom = Math.max(insets.bottom, spacing.s); // Guarantees a minimum breathing space
    const paddingLeft = Math.max(insets.left, spacing.s);
    const paddingRight = Math.max(insets.right, spacing.s);

    // Baseline structural styles applied to the outer View wrapper
    const outerContainerStyle: ViewStyle = {
        flex: 1,
        backgroundColor: colors.background,
    };

    if (isScrollable) {
        return (
            <View style={outerContainerStyle}>
                <StatusBar
                    barStyle={isDark ? 'light-content' : 'dark-content'}
                    backgroundColor="transparent"
                    translucent
                />
                <ScrollView
                    style={style} // Let developer custom styles override outer layout bounds
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        {
                            flexGrow: 1,
                            paddingTop,
                            paddingBottom,
                            paddingLeft,
                            paddingRight,
                        },
                        style, // Merges custom style layouts onto the active content canvas
                    ]}
                >
                    {children}
                </ScrollView>
            </View>
        );
    }

    // Static View Layout Fallback
    return (
        <View style={outerContainerStyle}>
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor="transparent"
                translucent
            />
            <View
                style={[
                    {
                        flex: 1,
                        paddingTop,
                        paddingBottom,
                        paddingLeft,
                        paddingRight,
                    },
                    style,
                ]}
            >
                {children}
            </View>
        </View>
    );
};