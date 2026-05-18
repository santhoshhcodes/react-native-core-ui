import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    ActivityIndicator,
    StyleSheet,
    ViewStyle
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';

interface AppButtonProps extends TouchableOpacityProps {
    tx?: string;
    text?: string;
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'outline';
}

export const AppButton = ({
    tx,
    text,
    loading,
    variant = 'primary',
    style,
    disabled,
    ...rest
}: AppButtonProps) => {
    const { colors, spacing, borderRadius } = useTheme();

    // Dynamic styles based on the theme
    const getVariantStyle = (): ViewStyle => {
        switch (variant) {
            case 'secondary':
                return { backgroundColor: colors.secondary };
            case 'outline':
                return { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary };
            default:
                return { backgroundColor: colors.primary };
        }
    };

    const getTextColor = (): string => {
        if (variant === 'outline') return colors.primary;

        // If your primary button background becomes white in light theme, 
        // the text needs to become dark (e.g., colors.text or colors.dark)
        if (colors.primary === '#FFFFFF' || colors.primary === '#FFF') {
            return '#000000'; // Dark text for white background
        }

        return '#FFFFFF'; // White text for dark backgrounds
    };



    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled || loading}
            style={[
                styles.base,
                {
                    paddingVertical: spacing.m,
                    borderRadius: borderRadius.m
                },
                getVariantStyle(),
                disabled && { opacity: 0.5 },
                style
            ]}
            {...rest}
        >
            {loading ? (
                // Change '#FFF' to getTextColor() so it matches the text color seamlessly!
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <AppText
                    tx={tx}
                    text={text}
                    variant="body"
                    style={{
                        color: getTextColor(),
                        fontWeight: '600'
                    }}
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        minHeight: 48,
    },
});