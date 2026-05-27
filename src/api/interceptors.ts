import { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { typedStorage } from '@/libs/storage';
import { store } from '@/app/providers/ReduxProvider';
import { clearSession } from '@/modules/auth/store/authSlice';
import axios from 'axios';

interface TokenRefreshResponse {
  access_token: string;
  refresh_token: string;
}

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });
  failedQueue = [];
};

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  
  // ─── BEARER HEADER INJECTION ──────────────────────────────────────────
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const tokens = typedStorage.getObject<{ accessToken: string }>('user_session');
      if (tokens?.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ─── AUTOMATIC 401 SILENT ROTATION RECOVERY ────────────────────────────
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (!error.response || error.response.status !== 401) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        store.dispatch(clearSession());
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        const tokens = typedStorage.getObject<{ refreshToken: string }>('user_session');
        
        if (!tokens?.refreshToken) {
          isRefreshing = false;
          store.dispatch(clearSession());
          return reject(error);
        }

        // Uses originalRequest.baseURL generated dynamically by your client hunter!
        axios
          .post<TokenRefreshResponse>(`${originalRequest.baseURL}/auth/refresh`, {
            refresh_token: tokens.refreshToken,
          })
          .then(({ data }) => {
            typedStorage.set('user_session', {
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
            });

            processQueue(null, data.access_token);
            
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
            }
            
            resolve(axiosInstance(originalRequest));
          })
          .catch((refreshError) => {
            processQueue(refreshError, null);
            store.dispatch(clearSession());
            reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
  );
};