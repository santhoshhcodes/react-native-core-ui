import React from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { SandboxScreen } from '../modules/debug/screens/SandboxScreen';
import { EmployeeDashboard } from '../modules/debug/screens/EmployeeDashboard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    // This MUST be here, otherwise useTheme will throw the error you wrote!
    <SafeAreaProvider> {/* 1. Add this first */}
      <ThemeProvider>

        <SandboxScreen />

      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;