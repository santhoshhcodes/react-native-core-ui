import { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { notificationService } from '../libs/notifications';

export const useNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  
  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    // 1. Register for tokens and set up OS permissions on mount
    notificationService.registerForPushNotifications().then(token => {
      if (token) {
        setExpoPushToken(token);
        // In production: Send this token to your FastAPI backend via an API call
        console.log('[Push Token Registered]:', token);
      }
    });

    // 2. Handle notifications received while the app is actively running in the foreground
    notificationListener.current = Notifications.addNotificationReceivedListener(notif => {
      setNotification(notif);
    });

    // 3. Handle action events when a user taps/clicks on a background notification banner
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const { actionIdentifier, notification: tappedNotif } = response;
      console.log(`[Notification Clicked] Action: ${actionIdentifier}`, tappedNotif.request.content.data);
      
      // Implement your custom navigation routing redirect logic here
    });

    return () => {
      // Prevent memory leaks by cleanly tearing down event listeners
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};
