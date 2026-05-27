import React, { useEffect, useRef } from 'react';
import {
  Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback,
  ActivityIndicator, StyleSheet, Animated, Platform,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface BaseModalProps {
  visible: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
}

const Overlay: React.FC<{ onPress: () => void; children: React.ReactNode }> = ({ onPress, children }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={shared.overlay}>
      <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
);

export const SuccessModal: React.FC<BaseModalProps> = ({ visible, title = 'Success', message, onClose }) => {
  const { colors, borderRadius } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Overlay onPress={onClose}>
        <View style={[dialog.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.l }]}>
          <View style={[dialog.iconCircle, { backgroundColor: colors.success + '15', borderColor: colors.success + '55', borderRadius: borderRadius.round }]}>
            <Text style={[dialog.iconText, { color: colors.success }]}>✓</Text>
          </View>
          <Text style={[dialog.title, { color: colors.success }]}>{title}</Text>
          {message && <Text style={[dialog.message, { color: colors.textSecondary }]}>{message}</Text>}
          <TouchableOpacity style={[dialog.primaryBtn, { backgroundColor: colors.success, borderRadius: borderRadius.m }]} activeOpacity={0.82} onPress={onClose}>
            <Text style={{ color: colors.white, fontWeight: '700' }}>Done</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </Modal>
  );
};

export const ErrorModal: React.FC<BaseModalProps> = ({ visible, title = 'Error', message, onClose }) => {
  const { colors, borderRadius } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Overlay onPress={onClose}>
        <View style={[dialog.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.l }]}>
          <View style={[dialog.iconCircle, { backgroundColor: colors.error + '15', borderColor: colors.error + '55', borderRadius: borderRadius.round }]}>
            <Text style={[dialog.iconText, { color: colors.error }]}>✕</Text>
          </View>
          <Text style={[dialog.title, { color: colors.error }]}>{title}</Text>
          {message && <Text style={[dialog.message, { color: colors.textSecondary }]}>{message}</Text>}
          <TouchableOpacity style={[dialog.primaryBtn, { backgroundColor: colors.error, borderRadius: borderRadius.m }]} activeOpacity={0.82} onPress={onClose}>
            <Text style={{ color: colors.white, fontWeight: '700' }}>OK</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </Modal>
  );
};

export const ConfirmModal: React.FC<BaseModalProps & { onConfirm: () => void; cancelLabel?: string; confirmLabel?: string }> = ({
  visible, title = 'Confirm', message, onConfirm, onClose, cancelLabel = 'Cancel', confirmLabel = 'Confirm'
}) => {
  const { colors, borderRadius } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Overlay onPress={onClose}>
        <View style={[dialog.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.l }]}>
          <Text style={[dialog.title, { color: colors.textPrimary }]}>{title}</Text>
          {message && <Text style={[dialog.message, { color: colors.textSecondary }]}>{message}</Text>}
          <View style={dialog.btnRow}>
            <TouchableOpacity style={[dialog.outlineBtn, { borderColor: colors.border, borderRadius: borderRadius.m, flex: 1 }]} activeOpacity={0.75} onPress={onClose}>
              <Text style={[dialog.outlineBtnText, { color: colors.textSecondary }]}>{cancelLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[dialog.primaryBtn, { backgroundColor: colors.primary, borderRadius: borderRadius.m, flex: 1, marginTop: 0 }]} activeOpacity={0.82} onPress={onConfirm}>
              <Text style={{ color: colors.background, fontWeight: '700' }}>{confirmLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    </Modal>
  );
};

export const LoadingModal: React.FC<{ visible: boolean; message?: string }> = ({ visible, message = 'Please wait…' }) => {
  const { colors, borderRadius } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={shared.overlay}>
        <View style={[dialog.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: borderRadius.l, paddingVertical: 28 }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[dialog.message, { color: colors.textSecondary, marginTop: 14, textAlign: 'center' }]}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const shared = StyleSheet.create({ overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 28 } });
const dialog = StyleSheet.create({
  card: { width: '100%', borderWidth: 1, padding: 24, alignItems: 'center', gap: 10 },
  iconCircle: { width: 62, height: 62, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  iconText: { fontSize: 26, fontWeight: '700' },
  title: { fontSize: 17, fontWeight: '700', textAlign: 'center' },
  message: { fontSize: 13, lineHeight: 20, textAlign: 'center', marginBottom: 4 },
  btnRow: { flexDirection: 'row', gap: 10, width: '100%', marginTop: 4 },
  primaryBtn: { height: 46, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, width: '100%' },
  primaryBtnText: { fontSize: 14, fontWeight: '700', letterSpacing: 0.5 },
  outlineBtn: { height: 46, borderWidth: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  outlineBtnText: { fontSize: 14, fontWeight: '600' }
});