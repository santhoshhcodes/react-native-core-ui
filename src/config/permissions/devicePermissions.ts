import { Platform } from 'react-native';
import { PERMISSIONS, Permission } from 'react-native-permissions';

/**
 * DEVICE_PERMISSIONS
 * Mapping for Hardware/OS level access.
 * Use 'Permission' type from the library for strict typing.
 */
export const DEVICE_PERMISSIONS = {
    CAMERA: Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
    }) as Permission,

    LOCATION: Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    }) as Permission,

    MICROPHONE: Platform.select({
        android: PERMISSIONS.ANDROID.RECORD_AUDIO,
        ios: PERMISSIONS.IOS.MICROPHONE,
    }) as Permission,

    // IMPORTANT: Android 13+ uses READ_MEDIA_IMAGES. 
    // Older Android uses READ_EXTERNAL_STORAGE.
    PHOTO_LIBRARY: Platform.select({
        android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    }) as Permission,

    // Notifications are unique and handled via requestNotifications() 
    // but we keep a reference for Android 13+ logic here.
    NOTIFICATIONS:
        Platform.OS === 'android'
            ? 'android.permission.POST_NOTIFICATIONS'
            : null,
};