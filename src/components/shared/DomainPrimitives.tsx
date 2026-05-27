import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';

export const StatusBadge: React.FC<{ status: 'pending' | 'approved' | 'rejected' }> = ({ status }) => {
  const { colors, borderRadius } = useTheme();
  const configs = {
    pending: { bg: colors.warning + '20', fg: colors.warning, label: 'Pending' },
    approved: { bg: colors.success + '20', fg: colors.success, label: 'Approved' },
    rejected: { bg: colors.error + '20', fg: colors.error, label: 'Rejected' },
  };
  const current = configs[status] || configs.pending;

  return (
    <View style={[styles.badge, { backgroundColor: current.bg, borderRadius: borderRadius.round }]}>
      <View style={[styles.dot, { backgroundColor: current.fg, borderRadius: borderRadius.round }]} />
      <Text style={[styles.badgeText, { color: current.fg }]}>{current.label}</Text>
    </View>
  );
};

export const ScreenHeader: React.FC<{ title: string; onBack?: () => void; rightLabel?: string; onRight?: () => void; paddingTop?: number }> = ({
  title, onBack, rightLabel, onRight, paddingTop = 0
}) => {
  const { colors, borderRadius, spacing } = useTheme();
  return (
    <View style={[styles.hdrRow, { paddingTop, paddingHorizontal: spacing.m, paddingBottom: spacing.s, borderBottomColor: colors.border }]}>
      {onBack ? (
        <TouchableOpacity style={[styles.hdrIconBtn, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.m }]} onPress={onBack}>
          <Text style={{ color: colors.textPrimary, fontSize: 20 }}>←</Text>
        </TouchableOpacity>
      ) : <View style={{ width: 38 }} />}
      <Text style={[styles.hdrTitle, { color: colors.textPrimary }]}>{title}</Text>
      {onRight ? (
        <TouchableOpacity style={[styles.hdrRightBtn, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: borderRadius.m }]} onPress={onRight}>
          {rightLabel && <Text style={{ fontSize: 12, fontWeight: '700', color: colors.textPrimary }}>{rightLabel}</Text>}
        </TouchableOpacity>
      ) : <View style={{ width: 38 }} />}
    </View>
  );
};

export const FormField: React.FC<{ label: string; value: string; onChangeText: (t: string) => void; placeholder?: string; multiline?: boolean; editable?: boolean }> = ({
  label, value, onChangeText, placeholder, multiline = false, editable = true
}) => {
  const { colors, borderRadius, spacing } = useTheme();
  return (
    <View style={{ gap: spacing.s, width: '100%' }}>
      <Text style={{ fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1 }}>{label.toUpperCase()}</Text>
      <TextInput
        style={[styles.input, { color: colors.textPrimary, backgroundColor: colors.surface, borderColor: colors.border, borderRadius: borderRadius.m, paddingHorizontal: spacing.m, paddingVertical: spacing.s }, multiline && { height: 90, textAlignVertical: 'top', paddingTop: 12 }, !editable && { opacity: 0.6 }]}
        value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.textPlaceholder} multiline={multiline} editable={editable}
      />
    </View>
  );
};

export const TappableField: React.FC<{ label: string; value?: string; placeholder: string; icon?: string; onPress: () => void }> = ({
  label, value, placeholder, icon, onPress
}) => {
  const { colors, borderRadius, spacing } = useTheme();
  return (
    <View style={{ gap: spacing.s, width: '100%' }}>
      <Text style={{ fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1 }}>{label.toUpperCase()}</Text>
      <TouchableOpacity style={[styles.tapRow, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: borderRadius.m, paddingHorizontal: spacing.m, paddingVertical: spacing.m }]} onPress={onPress} activeOpacity={0.75}>
        {icon && <Text style={{ fontSize: 15, color: colors.textPrimary }}>{icon}</Text>}
        <Text style={{ flex: 1, fontSize: 14, color: value ? colors.textPrimary : colors.textPlaceholder }}>{value || placeholder}</Text>
        <Text style={{ fontSize: 18, color: colors.textSecondary }}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  dot: { width: 5, height: 5 },
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
  hdrRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1 },
  hdrIconBtn: { width: 38, height: 38, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  hdrTitle: { flex: 1, fontSize: 17, fontWeight: '700', textAlign: 'center', letterSpacing: 0.2 },
  hdrRightBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1 },
  input: { borderWidth: 1, fontSize: 14 },
  tapRow: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1 }
});