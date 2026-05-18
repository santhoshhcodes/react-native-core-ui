import axios from 'axios';
import { ENV } from '../config/env';
import { getBaseURL } from '../utils/networkUtils';

const apiClient = axios.create({
    timeout: ENV.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        let finalBase = ENV.API_URL; // Fallback to your .env value

        // In Debug/Dev mode, use your hunting logic
        if (__DEV__) {
            try {
                finalBase = await getBaseURL();
            } catch (e) {
                console.warn("Using ENV fallback as hunter failed");
            }
        }

        // Standardize your URL structure
        config.baseURL = `${finalBase}/api/${ENV.API_VERSION}`;

        // Log for debugging
        console.log(`🌐 API CALL: ${config.method?.toUpperCase()} -> ${config.baseURL}${config.url}`);

        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;