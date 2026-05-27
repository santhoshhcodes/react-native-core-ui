import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export const LoadingOverlay: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#3B82F6" />
    <Text style={styles.text}>Synchronizing system infrastructure...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center', gap: 12 },
  text: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
});