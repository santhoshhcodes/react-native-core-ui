import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './providers/ThemeProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './navigation/AppNavigator';
import { QueryClientProvider } from './providers/QueryClientProvider';
import { ReduxProvider } from './providers/ReduxProvider';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ReduxProvider>
          <QueryClientProvider>
            <ThemeProvider>
              <AppNavigator />
            </ThemeProvider>
          </QueryClientProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
