import React from 'react';

import {
    Text,
    TextProps,
    TextStyle,
    StyleProp,
} from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { typography } from '../../config/theme/typography';
import {
    useTranslation,
} from 'react-i18next';
interface AppTextProps extends TextProps {
    tx?: string;
    text?: string;
    variant?: keyof typeof typography;
}

export const AppText = ({
    tx,
    text,
    variant = 'body',
    style,
    ...rest
}: AppTextProps) => {

    const { typography, colors } = useTheme();

    const { t } = useTranslation();

    /**
     * Resolve Content
     */
    const content =
        tx
            ? t(tx)
            : text;

    /**
     * Combined Styles
     */
    const combinedStyle: StyleProp<TextStyle> = [
        {
            color: colors.textPrimary,
        },

        typography[variant],

        style,
    ];

    return (
        <Text
            style={combinedStyle}
            {...rest}
        >
            {content}
        </Text>
    );
};