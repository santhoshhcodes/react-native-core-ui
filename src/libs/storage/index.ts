import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
    id: 'erp-core-storage',
});

export const typedStorage = {
    set: (key: string, value: string | number | boolean | object) => {
        if (typeof value === 'object') {
            storage.set(key, JSON.stringify(value));

        }
        else {
            storage.set(key, value);
        }
    },

    getString: (key: string): string | undefined => storage.getString(key),

    getObject: <T>(key: string): T | undefined => {
        const raw = storage.getString(key);
        if (!raw) return undefined;
        try {
            return JSON.parse(raw) as T;
        }
        catch {
            return undefined;

        }

    },
    delete: (key: string) => storage.remove(key),
    clearAll: () => storage.clearAll()
};