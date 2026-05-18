import {
  check,
  request,
  RESULTS,
  openSettings,
  requestNotifications,
  Permission,
} from 'react-native-permissions';
import { Alert } from 'react-native';

/**
 * Checks if a specific hardware permission is already granted.
 */
export const checkPermission = async (permission: Permission): Promise<boolean> => {
  try {
    const result = await check(permission);
    return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
  } catch (error) {
    console.error('[Permission] Check Error:', error);
    return false;
  }
};

/**
 * Requests hardware permission and handles the "Blocked" state 
 * by redirecting users to System Settings.
 */
export const requestPermission = async (
  permission: Permission,
  contextMessage?: string // Optional: Explain why you need it if blocked
): Promise<boolean> => {
  try {
    const result = await request(permission);

    switch (result) {
      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        return true;

      case RESULTS.BLOCKED:
        // Triggered when user selects "Never ask again"
        Alert.alert(
          'Permission Required',
          contextMessage || 'Please enable this permission in your device settings to continue.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => openSettings() },
          ]
        );
        return false;

      default:
        return false;
    }
  } catch (error) {
    console.error('[Permission] Request Error:', error);
    return false;
  }
};

/**
 * Specialized handler for Notifications.
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await requestNotifications(['alert', 'sound', 'badge']);
    return status === RESULTS.GRANTED;
  } catch (error) {
    console.error('[Permission] Notification Error:', error);
    return false;
  }
};