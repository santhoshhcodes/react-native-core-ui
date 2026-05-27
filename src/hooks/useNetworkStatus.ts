import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean;
  connectionType: string;
  isCellular: boolean;
  isWifi: boolean;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [status, setStatus] = useState<NetworkStatus>({
    isConnected: true, // Optimistic default initialization mapping
    isInternetReachable: true,
    connectionType: 'unknown',
    isCellular: false,
    isWifi: false,
  });

  useEffect(() => {
    // 1. Fetch initial network layer snapshot immediately on mount
    NetInfo.fetch().then((state: NetInfoState) => {
      updateNetworkState(state);
    });

    // 2. Subscribe to dynamic network toggle notifications broadcast by the native runtime engine
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      updateNetworkState(state);
    });

    // Clean teardown pass on unmount shifts to eliminate background event thread leaks
    return () => {
      unsubscribe();
    };
  }, []);

  const updateNetworkState = (state: NetInfoState) => {
    setStatus({
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable ?? false,
      connectionType: state.type,
      isCellular: state.type === 'cellular',
      isWifi: state.type === 'wifi',
    });
  };

  return status;
};