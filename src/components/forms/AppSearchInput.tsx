import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppTextInput } from './AppTextInput';
import { AppText } from '../ui/AppText';

interface AppSearchInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onClear?: () => void;
}

export const AppSearchInput: React.FC<AppSearchInputProps> = ({
    value,
    onChangeText,
    placeholder = "Search...",
    onClear,
}) => {
    const { spacing } = useTheme();
    
    // We create a reference to the underlying TextInput if we need to clear it and unfocus
    const inputRef = useRef<TextInput>(null);

    const handleClear = () => {
        onChangeText('');
        if (onClear) onClear();
        inputRef.current?.blur(); // Unfocus the keyboard cleanly when cleared
    };

    return (
        <AppTextInput
            ref={inputRef}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            // Industry Standard: Left side search lens identifier
            prefix={
                <AppText text="🔍" style={{ fontSize: 16, opacity: 0.6 }} />
            }
            // Industry Standard: Dynamic right side clear action trigger button
            suffix={
                value.length > 0 ? (
                    <TouchableOpacity 
                        onPress={handleClear} 
                        activeOpacity={0.7}
                        style={styles.clearButton}
                    >
                        <AppText text="✕" style={{ fontSize: 12, fontWeight: '700', opacity: 0.5 }} />
                    </TouchableOpacity>
                ) : null
            }
        />
    );
};

const styles = StyleSheet.create({
    clearButton: {
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
});