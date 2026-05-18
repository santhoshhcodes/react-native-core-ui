// src/hooks/usePermissions.ts

import {
    useState,
    useCallback,
} from 'react';

import {
    Permission,
    check,
    RESULTS,
} from 'react-native-permissions';


import { checkPermission, requestPermission } from '../config/permissions';
import { showPermissionBlockedAlert } from '../utils/permissionUtils';


/**
 * -----------------------------------------
 * USE PERMISSIONS HOOK
 * -----------------------------------------
 * Reusable hook for handling
 * device permissions.
 *
 * Example:
 *
 * const {
 *   isGranted,
 *   loading,
 *   askPermission,
 * } = usePermissions(
 *   DEVICE_PERMISSIONS.CAMERA,
 *   'Camera',
 * );
 */

export const usePermissions = (
    permission: Permission,
    label: string,
) => {

    /**
     * Permission Granted Status
     */
    const [isGranted, setIsGranted] =
        useState<boolean | null>(null);

    /**
     * Loading State
     */
    const [loading, setLoading] =
        useState<boolean>(false);

    /**
     * -----------------------------------------
     * CHECK CURRENT PERMISSION STATUS
     * -----------------------------------------
     */

    const checkStatus = useCallback(
        async () => {
            try {
                const result = await check(permission);

                /**
                 * Permission Granted
                 */
                if (result === RESULTS.GRANTED) {
                    setIsGranted(true);
                    return true;
                }
                    
                /**
                 * Permission Blocked
                 */
                if (result === RESULTS.BLOCKED) {
                    showPermissionBlockedAlert(
                        label,
                    );

                    setIsGranted(false);

                    return false;
                }
                    

                /**
                 * Permission Denied
                 */
                setIsGranted(false);

                return false;

            } catch (error) {

                console.log(
                    '[Permission Check Error]',
                    error,
                );

                setIsGranted(false);

                return false;
            }
        },

        [permission, label],
    );

    /**
     * -----------------------------------------
     * REQUEST PERMISSION
     * -----------------------------------------
     */

    const askPermission = async () => {

        try {

            setLoading(true);

            const result =
                await requestPermission(
                    permission,
                );

            setIsGranted(result);

            return result;

        } catch (error) {

            console.log(
                '[Permission Request Error]',
                error,
            );

            return false;

        } finally {

            setLoading(false);
        }
    };

    return {
        isGranted,
        loading,
        checkStatus,
        askPermission,
    };
};