import * as Notifications from 'expo-notifications';

export const notificationService = {
    // Enforce a strict return contract here so the hook knows what type to expect
    registerForPushNotifications: async (): Promise<string | null> => {
        try {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') return null;

            const tokenData = await Notifications.getExpoPushTokenAsync();
            return tokenData.data;
        } catch {
            return null;
        }
    }
};