// Environment Configuration
// This file reads from .env and provides type-safe access to environment variables

import Constants from 'expo-constants';

interface EnvConfig {
  // Google OAuth
  googleWebClientId: string;
  googleAndroidClientId?: string;
  googleIosClientId?: string;
  
  // Facebook OAuth
  facebookAppId: string;
  facebookClientToken: string;
  facebookDisplayName: string;
  
  // API
  apiBaseUrl: string;
  
  // App
  appName: string;
  appVersion: string;
}

// Default values (for development/testing)
const defaultConfig: EnvConfig = {
  googleWebClientId: '848827810289-5u6on5fjtlimkommanfit6j451f7mhja.apps.googleusercontent.com',
  googleAndroidClientId: '848827810289-lvkbqi48kunbt18jh1t2a0qhm22ip1a4.apps.googleusercontent.com',
  googleIosClientId: '848827810289-1kuorgf5pep2nabj8g8stmoti3rnkprq.apps.googleusercontent.com',
  facebookAppId: 'YOUR_FACEBOOK_APP_ID',
  facebookClientToken: 'YOUR_FACEBOOK_CLIENT_TOKEN',
  facebookDisplayName: 'Amigo',
  apiBaseUrl: 'http://localhost:3000/api',
  appName: 'Amigo',
  appVersion: '1.0.0',
};

// Try to load from environment variables
const getEnvConfig = (): EnvConfig => {
  // In Expo, environment variables are available through Constants.expoConfig.extra
  const extra = Constants.expoConfig?.extra || {};
  
  return {
    googleWebClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || extra.GOOGLE_WEB_CLIENT_ID || defaultConfig.googleWebClientId,
    googleAndroidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || extra.GOOGLE_ANDROID_CLIENT_ID || defaultConfig.googleAndroidClientId,
    googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || extra.GOOGLE_IOS_CLIENT_ID || defaultConfig.googleIosClientId,
    facebookAppId: extra.FACEBOOK_APP_ID || defaultConfig.facebookAppId,
    facebookClientToken: extra.FACEBOOK_CLIENT_TOKEN || defaultConfig.facebookClientToken,
    facebookDisplayName: extra.FACEBOOK_DISPLAY_NAME || defaultConfig.facebookDisplayName,
    apiBaseUrl: extra.API_BASE_URL || defaultConfig.apiBaseUrl,
    appName: extra.APP_NAME || defaultConfig.appName,
    appVersion: extra.APP_VERSION || defaultConfig.appVersion,
  };
};

export const config = getEnvConfig();

// Helper to check if OAuth is configured
export const isGoogleConfigured = () => {
  return config.googleWebClientId !== defaultConfig.googleWebClientId;
};

export const isFacebookConfigured = () => {
  return config.facebookAppId !== defaultConfig.facebookAppId;
};

// Export for debugging (remove in production)
export const debugConfig = () => {
  console.log('🔧 Environment Configuration:');
  console.log('Google Configured:', isGoogleConfigured());
  console.log('Facebook Configured:', isFacebookConfigured());
  console.log('API URL:', config.apiBaseUrl);
};
