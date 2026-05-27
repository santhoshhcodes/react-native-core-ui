import { useEffect, useState, useCallback } from 'react';
import { biometricEngine } from '../libs/biometric';

export const useBiometrics = () => {
    const [isBiometricAvailable, setIsBiometricAvailable] = useState<boolean>(false);
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

    // Check hardware availability on hook initialization
    useEffect(() => {
        const checkHardware = async () => {
            const available = await biometricEngine.isSupportedAndEnrolled();
            setIsBiometricAvailable(available);
        };

        checkHardware();
    }, []);

    // Handle the authentication prompt logic wrapped in a stable reference callback
    const authenticateUser = useCallback(async (promptMessage: string = 'Confirm your identity'): Promise<boolean> => {
        setIsAuthenticating(true);
        try {
            const success = await biometricEngine.authenticate(promptMessage);
            return success;
        } catch {
            return false;
        } finally {
            setIsAuthenticating(false);
        }
    }, []);

    return {
        isBiometricAvailable,
        isAuthenticating,
        authenticateUser,
    };
};