import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
    StyleProp,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../ui/AppText';

export interface ToggleOption<T extends string> {
    key: T;
    label: string;
}

interface AppToggleProps<T extends string> {
    options: readonly ToggleOption<T>[];
    value: T;
    onChange: (key: T) => void;

    /**
     * 'segmented': Spreads out across full available width (100%)
     * 'compact': Shrinks down tightly to only consume its text contents (Perfect for right corners)
     */
    variant?: 'segmented' | 'compact';

    // Custom Styles
    containerStyle?: StyleProp<ViewStyle>;
    tabStyle?: StyleProp<ViewStyle>;
    activeTabStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    activeTextStyle?: StyleProp<TextStyle>;
}

export const AppToggle = <T extends string>({
    options,
    value,
    onChange,
    variant = 'segmented', // Defaults to original behavior
    containerStyle,
    tabStyle,
    activeTabStyle,
    textStyle,
    activeTextStyle,
}: AppToggleProps<T>) => {
    const { colors, spacing, borderRadius } = useTheme();
    const isCompact = variant === 'compact';

    return (
        <View
            style={[
                styles.container,
                isCompact && styles.containerCompact,
                {
                    backgroundColor: colors.surface,
                    borderRadius: borderRadius.m,
                    padding: spacing.xs,
                    borderColor: colors.border,
                    borderWidth: isCompact ? 1 : 0, // Adds clean definition borders if compact
                },
                containerStyle,
            ]}
        >
            {options.map((option) => {
                const isActive = option.key === value;

                return (
                    <TouchableOpacity
                        key={option.key}
                        activeOpacity={0.8}
                        onPress={() => onChange(option.key)}
                        style={[
                            styles.tab,
                            isCompact ? styles.tabCompact : styles.tabSegmented,
                            {
                                borderRadius: borderRadius.m - 2,
                                backgroundColor: isActive ? colors.background : 'transparent',
                                paddingHorizontal: isCompact ? spacing.m : 0,
                            },
                            tabStyle,
                            isActive && activeTabStyle,
                        ]}
                    >
                        <AppText
                            text={option.label}
                            variant="caption" // Smaller metadata text fits settings bars beautifully
                            style={[
                                {
                                    color: isActive ? colors.textPrimary : colors.textSecondary,
                                    fontWeight: isActive ? '700' : '500',
                                },
                                textStyle,
                                isActive && activeTextStyle,
                            ]}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerCompact: {
        alignSelf: 'flex-end', // Keeps it hugging the right corner tightly
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 6,
    },
    tabSegmented: {
        flex: 1, // Traditional full width fill
    },
    tabCompact: {
        flexGrow: 0, // Shrinks cleanly to its exact content sizes
    },
});