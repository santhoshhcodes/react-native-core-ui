import * as LocalAuthentication from 'expo-local-authentication';

export const biometricEngine = {
    isSupportedAndEnrolled: async (): Promise<boolean> => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) return false;

        return await LocalAuthentication.isEnrolledAsync();
    },

    authenticate: async (promptMessage: string = 'Verify identity to continue'): Promise<boolean> => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage,
                cancelLabel: 'Cancel',
                disableDeviceFallback: false,
            });
            return result.success;
        } catch {
            return false;
        }
    },
};