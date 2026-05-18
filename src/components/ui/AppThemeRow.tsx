import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';

export const AppThemeRow = () => {
    const { colors, themeMode, setThemeMode, spacing, borderRadius } = useTheme();
    
    // Smooth transition track layout values
    const slideAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let targetValue = 0; // default for 'system'
        if (themeMode === 'light') targetValue = 1;
        if (themeMode === 'dark') targetValue = 2;

        Animated.spring(slideAnimation, {
            toValue: targetValue,
            useNativeDriver: false,
            tension: 50,
            friction: 7
        }).start();
    }, [themeMode]);

    // Map three position track translations
    const handleTranslateX = slideAnimation.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [4, 40, 76], // Adjusted for a 3-choice sliding window frame
    });

    // Cycle through settings sequentially on tap: System -> Light -> Dark -> System
    const handleCycleTheme = () => {
        if (themeMode === 'system') setThemeMode('light');
        else if (themeMode === 'light') setThemeMode('dark');
        else setThemeMode('system');
    };

    // Calculate dynamic setting label for the left corner text
    const getLabelText = () => {
        if (themeMode === 'system') return 'System Default';
        return themeMode === 'dark' ? 'Dark Mode' : 'Light Mode';
    };

    return (
        <View style={[styles.rowContainer, { paddingVertical: spacing.m }]}>
            {/* Left corner status description */}
            <AppText variant="body" text={getLabelText()} style={{ fontWeight: '600', color: colors.textPrimary }} />

            {/* Right corner interactive 3-step pill track switch */}
            <TouchableOpacity 
                activeOpacity={0.9} 
                onPress={handleCycleTheme}
                style={[
                    styles.track, 
                    { 
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                        borderWidth: 1,
                        borderRadius: borderRadius.round 
                    }
                ]}
            >
                {/* Background Fixed Labels */}
                <View style={styles.iconLayer}>
                    <AppText text="⚙️" style={styles.bgIcon} />
                    <AppText text="☀️" style={styles.bgIcon} />
                    <AppText text="🌙" style={styles.bgIcon} />
                </View>

                {/* Sliding Target Window Indicator */}
                <Animated.View 
                    style={[
                        styles.thumb, 
                        { 
                            left: handleTranslateX,
                            backgroundColor: colors.primary,
                            borderRadius: borderRadius.round
                        }
                    ]}
                >
                    <AppText 
                        text={themeMode === 'system' ? "⚙️" : themeMode === 'light' ? "☀️" : "🌙"} 
                        style={styles.activeIcon} 
                    />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    track: {
        width: 112, // Widened slightly to give 3 positions clean spacing layout
        height: 38,
        position: 'relative',
        justifyContent: 'center',
    },
    iconLayer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
    },
    bgIcon: {
        fontSize: 12,
        opacity: 0.3,
    },
    thumb: {
        width: 30,
        height: 30,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    activeIcon: {
        fontSize: 12,
        color: '#FFFFFF'
    }
});