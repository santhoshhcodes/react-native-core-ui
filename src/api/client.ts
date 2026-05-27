import axios from 'axios';
import { ENV } from '../config/env';
import { getBaseURL } from '../utils/networkUtils';
import { setupInterceptors } from './interceptors'; // Import the security lifecycle engine

const apiClient = axios.create({
    timeout: ENV.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- Dynamic Dev/Prod URL Resolution Interceptor ---
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

        // Log for production-grade profiling visibility
        console.log(`🌐 API CALL: ${config.method?.toUpperCase()} -> ${config.baseURL}${config.url}`);

        return config;
    },
    (error) => Promise.reject(error)
);

// --- Register Auth & Silent 401 Token Rotation Interceptors ---
setupInterceptors(apiClient);

export default apiClient;