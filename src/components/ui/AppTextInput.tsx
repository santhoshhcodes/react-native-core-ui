import React, { useState, forwardRef } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps,
    StyleProp,
    ViewStyle
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { Column } from '../layouts/Column';
import { Row } from '../layouts/Row'; // 👈 Imported your custom Row layout primitive

interface AppTextInputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: StyleProp<ViewStyle>;
    prefix?: React.ReactNode; // 👈 Left side element (Icon, text, etc.)
    suffix?: React.ReactNode; // 👈 Right side element (Eye icon, clear button, etc.)
}

export const AppTextInput = forwardRef<TextInput, AppTextInputProps>(({
    label,
    error,
    containerStyle,
    style,
    onFocus,
    onBlur,
    prefix,
    suffix,
    ...restProps
}, ref) => {
    const { colors, spacing, borderRadius } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: any) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    const getBorderColor = () => {
        if (error) return '#FF3B30'; 
        if (isFocused) return colors.primary;
        return colors.border;
    };

    return (
        <Column gap={6} style={containerStyle}>
            {/* Optional Input Top Label Field */}
            {label && (
                <AppText
                    variant="caption"
                    text={label}
                    style={{ fontWeight: '600', color: error ? '#FF3B30' : colors.textSecondary }}
                />
            )}

            {/* Main Interactive Input Box Container */}
            <View
                style={[
                    styles.inputWrapper,
                    {
                        backgroundColor: colors.surface,
                        borderColor: getBorderColor(),
                        borderRadius: borderRadius.m,
                        paddingHorizontal: spacing.m,
                    }
                ]}
            >
                {/* We use Row to align everything horizontally across a single axis */}
                <Row align="center" justify="flex-start" style={{ height: '100%' }}>
                    
                    {/* Render Prefix if it exists */}
                    {prefix && (
                        <View style={{ paddingRight: spacing.s, justifyContent: 'center' }}>
                            {prefix}
                        </View>
                    )}

                    {/* Main TextInput field scales fluidly to fill remaining gap space */}
                    <TextInput
                        ref={ref}
                        style={[
                            styles.input,
                            {
                                color: colors.textPrimary,
                                fontSize: 15
                            },
                            style
                        ]}
                        placeholderTextColor={colors.textSecondary + '80'}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...restProps}
                    />

                    {/* Render Suffix if it exists */}
                    {suffix && (
                        <View style={{ paddingLeft: spacing.s, justifyContent: 'center' }}>
                            {suffix}
                        </View>
                    )}
                </Row>
            </View>

            {/* Error Message Section */}
            {error && (
                <AppText
                    variant="caption"
                    text={error}
                    style={{ color: '#FF3B30', marginTop: 2 }}
                />
            )}
        </Column>
    );
});

const styles = StyleSheet.create({
    inputWrapper: {
        width: '100%',
        height: 48,
        borderWidth: 1,
    },
    input: {
        flex: 1, // 👈 CRITICAL: Changes from width '100%' to flex: 1 so it shrinks/grows gracefully alongside prefix/suffix sizes
        height: '100%',
        padding: 0, 
    },
});