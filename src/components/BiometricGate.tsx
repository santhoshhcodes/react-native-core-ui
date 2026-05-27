import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useBiometrics } from '../hooks/useBiometrics';

export const BiometricGate: React.FC = () => {
  // Consume your custom hook data
  const { isBiometricAvailable, isAuthenticating, authenticateUser } = useBiometrics();

  const handleBiometricAuth = async () => {
    const success = await authenticateUser('Confirm your identity to log in');

    if (success) {
      Alert.alert('Success', 'Biometric validation verified.');
      // Execute post-login flows or state hydration here
    } else {
      Alert.alert('Authentication Failed', 'Please use your PIN or password.');
    }
  };

  // Guard clause: Render nothing if hardware isn't available or configured
  if (!isBiometricAvailable) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isAuthenticating && styles.buttonDisabled]}
        onPress={handleBiometricAuth}
        disabled={isAuthenticating}
      >
        {isAuthenticating ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Log In with Face ID / Touch ID</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20, alignItems: 'center', width: '100%' },
  button: { backgroundColor: '#3B82F6', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8, minWidth: 200, alignItems: 'center' },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
});