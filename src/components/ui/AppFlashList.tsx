import React, { useCallback } from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { useTheme } from '@/hooks/useTheme';
import { AppSkeletonListItem } from './AppSkeletonListItem';

interface AppFlashListProps<T> extends FlashListProps<T> {
  isLoading?: boolean;
  isError?: boolean;
  errorText?: string;
  loadingText?: string;
  emptyText?: string;
  contentContainerStyle?: ViewStyle;
}

export function AppFlashList<T>({
  data,
  renderItem,
  keyExtractor,
  isLoading = false,
  isError = false,
  errorText = 'Failed to load records.',
  emptyText = 'No records found.',
  contentContainerStyle,
  ...rest
}: AppFlashListProps<T>) {
  const { colors, spacing } = useTheme();

  // ─── STANDARDIZED EMPTY STATE ELEMENT ──────────────────────────────────
  const renderEmpty = useCallback(() => {
    if (isLoading || isError) return null;
    return (
      <View style={styles.center}>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>{emptyText}</Text>
      </View>
    );
  }, [isLoading, isError, emptyText, colors.textSecondary]);

  // ─── SHIMMER SKELETON RUNTIME RUNS ─────────────────────────────────────
  if (isLoading) {
    return (
      <View style={styles.container}>
        {/* Render a stack of 6 animated placeholders to match full viewport dimensions */}
        {Array.from({ length: 6 }).map((_, index) => (
          <AppSkeletonListItem key={index} />
        ))}
      </View>
    );
  }

  // ─── ERROR RUNTIME GATES ──────────────────────────────────────────────
  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={[styles.errorText, { color: colors.error }]}>⚠️ {errorText}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          { paddingBottom: spacing.m },
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" // Safe input field management inside scroll fields
        {...rest} // Safely forwards layout headers/footers down dynamically
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, gap: 8 },
  emptyText: { fontSize: 14, textAlign: 'center' },
  errorText: { fontSize: 14, fontWeight: '600' },
});