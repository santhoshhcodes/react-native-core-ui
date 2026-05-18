// src/utils/permissionUtils.ts

import { Alert, Linking } from 'react-native';

/**
 * -----------------------------------------
 * SHOW BLOCKED PERMISSION ALERT
 * -----------------------------------------
 * Used when user permanently blocks
 * permission from device settings.
 *
 * Example:
 * showPermissionBlockedAlert('Camera');
 */

export const showPermissionBlockedAlert = (
  label: string,
) => {
  Alert.alert(
    'Permission Blocked',

    `You have disabled ${label} access. Please enable it in your phone settings to use this feature.`,

    [
      /**
       * Close Alert
       */
      {
        text: 'Cancel',
        style: 'cancel',
      },

      /**
       * Open Device Settings
       */
      {
        text: 'Open Settings',

        onPress: () => Linking.openSettings(),
      },
    ],
  );
};