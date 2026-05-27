import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers/ReduxProvider';
// import { LoginScreen } from '@/modules/auth/screens/LoginScreen';
import { EmployeeDashboard } from '@/modules/hr/screens/EmployeeDashboard';
import { SandboxScreen } from '@/modules/debug/screens/SandboxScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MockLoginScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937' }}>Login Screen Placeholder</Text>
  </View>
);

export const RootNavigator: React.FC = () => {
  // Automatically updates screens when authentication state shifts
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // ─── AUTHORIZED ENTERPRISE APPLICATION MATRIX ─────────────────────
        <>
          <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboard} />
          <Stack.Screen name="SandboxScreen" component={SandboxScreen} />
        </>
      ) : (
        // ─── UNAUTHORIZED SECURITY GATEWAY MATRIX ──────────────────────────
        <>
          <Stack.Screen name="Login" component={MockLoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};