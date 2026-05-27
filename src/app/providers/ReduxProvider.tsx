import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, Storage } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { typedStorage } from '@/libs/storage';
import { LoadingOverlay } from '@/components/feedback/LoadingOverlay';
import authReducer from '@/modules/auth/store/authSlice';

/**
 * Custom Synchronous Persistence Bridge Adapter
 * Forces redux-persist to interact with fast C++ MMKV bindings 
 * instead of slow, async-based legacy engines.
 */
const mmkvStorageAdapter: Storage = {
  setItem: (key, value) => {
    typedStorage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = typedStorage.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: (key) => {
    typedStorage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: mmkvStorageAdapter,
  whitelist: ['auth'], // Persist only authentication to disk for secure auto-login lifecycles
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables serialization errors triggered by redux-persist internal actions
    }),
});

export const persistor = persistStore(store);

// Export strict, production-grade TypeScript layout types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      {/* PersistGate halts the execution tree layout render pass until MMKV rehydration completes */}
      <PersistGate loading={<LoadingOverlay />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};