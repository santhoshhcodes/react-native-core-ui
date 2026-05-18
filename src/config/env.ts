import Config from 'react-native-config';

/**
 * Environment Configuration
 * This file centralizes all sensitive keys and URLs.
 * It provides Type Safety for your .env variables.
 */
export const ENV = {
  // API URL for your FastAPI backend
  API_URL: Config.API_URL ?? 'http://localhost:8000',
  
  // API Versioning
  API_VERSION: Config.API_VERSION ?? 'v1',
  
  // Timeout for network requests (in milliseconds)
  TIMEOUT: 30000,

  // Environment mode
  IS_PRODUCTION: Config.ENV_MODE === 'production',
} as const;

export type EnvConfig = typeof ENV;