import React from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    ViewStyle, 
    StyleProp 
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface AppCardProps {
    children: React.ReactNode;
    onPress?: () => void; // Converts the structural card into an interactive touch surface if provided
    variant?: 'default' | 'outline' | 'flat';
    style?: StyleProp<ViewStyle>;
}

export const AppCard: React.FC<AppCardProps> = ({
    children,
    onPress,
    variant = 'default',
    style,
}) => {
    const { colors, spacing, borderRadius } = useTheme();

    // Generate surface styles based on UI variant parameters
    const getVariantStyles = (): ViewStyle => {
        switch (variant) {
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: colors.border,
                };
            case 'flat':
                return {
                    backgroundColor: colors.background,
                    borderWidth: 0,
                };
            case 'default':
            default:
                return {
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: colors.border,
                    // Subtly apply layout shadow rules on light background templates for elevation depth
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: colors.background === '#FFFFFF' ? 0.05 : 0,
                    shadowRadius: 4,
                    elevation: colors.background === '#FFFFFF' ? 2 : 0,
                };
        }
    };

    const cardStyles: StyleProp<ViewStyle> = [
        styles.baseCard,
        {
            borderRadius: borderRadius.m ?? 12,
            padding: spacing.m ?? 16,
        },
        getVariantStyles(),
        style,
    ];

    if (onPress) {
        return (
            <TouchableOpacity 
                onPress={onPress} 
                activeOpacity={0.75} 
                style={cardStyles}
            >
                {children}
            </TouchableOpacity>
        );
    }

    return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
    baseCard: {
        width: '100%',
    },
});