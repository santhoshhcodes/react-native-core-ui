import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useClock } from '@/hooks/useClock';
import { useTheme } from '@/hooks/useTheme';

interface AppClockCardProps {
  showDate?: boolean;
  showGreeting?: boolean;
}

export const AppClockCard: React.FC<AppClockCardProps> = ({ showDate = true, showGreeting = true }) => {
  const { colors, spacing, borderRadius } = useTheme();
  const { formattedTime, formattedDate, greeting } = useClock();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.l, padding: spacing.m }]}>
      {showGreeting && (
        <Text style={[styles.greeting, { color: colors.textSecondary }]} allowFontScaling={false}>
          Good {greeting}, Operational Session Active
        </Text>
      )}
      <Text style={[styles.time, { color: colors.textPrimary }]} allowFontScaling={false}>
        {formattedTime}
      </Text>
      {showDate && (
        <Text style={[styles.date, { color: colors.textSecondary }]} allowFontScaling={false}>
          {formattedDate}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { width: '100%', borderWidth: 1, alignItems: 'flex-start', gap: 2 },
  greeting: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8 },
  time: { fontSize: 32, fontWeight: '800', letterSpacing: -0.5 },
  date: { fontSize: 13, fontWeight: '500', marginTop: 2 },
});