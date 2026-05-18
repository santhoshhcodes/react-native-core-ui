import { Platform, ToastAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const showToast = (message: string) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
        Alert.alert('System', message);
    }
};

const SERVERS = [
    'http://192.168.0.9:8001',
    'http://10.171.52.152:8001',
    'http://106.51.153.244:8001',
    'http://192.168.1.40:8001'
];

const fetchWithTimeout = async (url: string, timeout = 2000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        return res;
    } catch (e) {
        clearTimeout(id);
        throw e;
    }
};

export const getBaseURL = async (): Promise<string> => {
    // 1. Try Cached IP
    const cached = await AsyncStorage.getItem('BASE_URL');
    if (cached) {
        try {
            const res = await fetchWithTimeout(`${cached}/health`, 1500);
            if (res.ok) return cached;
        } catch {
            console.log("Cached IP failed, hunting...");
        }
    }

    // 2. Hunt for active server
    for (let base of SERVERS) {
        try {
            console.log("Trying:", base);
            const res = await fetchWithTimeout(`${base}/health`, 2000);
            if (res.ok) {
                await AsyncStorage.setItem('BASE_URL', base);
                console.log("Connected to:", base);
                return base;
            }
        } catch (e) {
            console.log("Failed:", base);
        }
    }

    throw new Error('No backend server reachable');
};