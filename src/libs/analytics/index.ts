type EventProperties = Record<string, string | number | boolean | null>;

export const analytics = {
    identifyUser: (userId: string, traits?: EventProperties) => {
        if (__DEV__) {
            console.log(`[Analytics - Identify] User: ${userId}`, traits);
        }
    },

    trackEvent: (eventName: string, properties?: EventProperties) => {
        if (__DEV__) {
            console.log(`[Analytics - Track] Event: ${eventName}`, properties);
        }
    },

    flushQueue: async (): Promise<void> => {
        return Promise.resolve();
    },
};