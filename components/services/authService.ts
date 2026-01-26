// Authentication Service
// This module handles all authentication logic and can be connected to your backend

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { config } from '../constants/config';

export interface AuthUser {
  id: string;
  name?: string;
  email?: string;
  photoUrl?: string;
  provider: 'google' | 'facebook' | 'email';
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

// Initialize Google Sign In
export const initializeGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: config.googleWebClientId,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
};

// Google Sign In
export const signInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const user = userInfo.data?.user;
    
    const authUser: AuthUser = {
      id: user?.id || '',
      name: user?.name || undefined,
      email: user?.email || undefined,
      photoUrl: user?.photo || undefined,
      provider: 'google'
    };

    // TODO: Send to your backend for authentication
    // const response = await fetch('YOUR_API_URL/auth/google', {
    //   method: 'POST',
    //   body: JSON.stringify({ idToken: userInfo.idToken })
    // });

    return {
      success: true,
      user: authUser
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Google sign in failed'
    };
  }
};

// Facebook Sign In
export const signInWithFacebook = async (): Promise<AuthResponse> => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    
    if (result.isCancelled) {
      return {
        success: false,
        error: 'Login cancelled'
      };
    }

    const data = await AccessToken.getCurrentAccessToken();
    
    if (!data) {
      return {
        success: false,
        error: 'Failed to get access token'
      };
    }

    // Fetch user info from Facebook Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${data.accessToken}&fields=id,name,email,picture.type(large)`
    );
    const userInfo = await response.json();
    
    const authUser: AuthUser = {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      photoUrl: userInfo.picture?.data?.url,
      provider: 'facebook'
    };

    // TODO: Send to your backend for authentication
    // const backendResponse = await fetch('YOUR_API_URL/auth/facebook', {
    //   method: 'POST',
    //   body: JSON.stringify({ accessToken: data.accessToken })
    // });

    return {
      success: true,
      user: authUser
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Facebook sign in failed'
    };
  }
};

// Email/Password Login
export const signInWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // TODO: Implement your backend authentication
    // const response = await fetch('YOUR_API_URL/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // });
    // const data = await response.json();

    // Placeholder - replace with actual backend call
    const authUser: AuthUser = {
      id: 'user-' + Date.now(),
      email: email,
      provider: 'email'
    };

    return {
      success: true,
      user: authUser
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Email sign in failed'
    };
  }
};

// Create Account
export const createAccount = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    // TODO: Implement your backend registration
    // const response = await fetch('YOUR_API_URL/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, email, password })
    // });
    // const data = await response.json();

    // Placeholder - replace with actual backend call
    const authUser: AuthUser = {
      id: 'user-' + Date.now(),
      name: username,
      email: email,
      provider: 'email'
    };

    return {
      success: true,
      user: authUser
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Account creation failed'
    };
  }
};

// Sign Out
export const signOut = async () => {
  try {
    // Sign out from Google - try without checking isSignedIn first
    try {
      await GoogleSignin.signOut();
    } catch (e) {
      // User wasn't signed in with Google
    }

    // Sign out from Facebook
    LoginManager.logOut();

    // TODO: Clear backend session
    // await fetch('YOUR_API_URL/auth/logout', { method: 'POST' });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Sign out failed'
    };
  }
};

// Check if user is signed in
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    // Check Google - try to get current user
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      if (userInfo) {
        return {
          id: userInfo.user.id || '',
          name: userInfo.user.name || undefined,
          email: userInfo.user.email || undefined,
          photoUrl: userInfo.user.photo || undefined,
          provider: 'google'
        };
      }
    } catch (e) {
      // User not signed in with Google
    }

    // Check Facebook
    const fbAccessToken = await AccessToken.getCurrentAccessToken();
    if (fbAccessToken) {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${fbAccessToken.accessToken}&fields=id,name,email`
      );
      const userInfo = await response.json();
      return {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        provider: 'facebook'
      };
    }

    // TODO: Check your backend session
    // const response = await fetch('YOUR_API_URL/auth/me');
    // if (response.ok) {
    //   const user = await response.json();
    //   return user;
    // }

    return null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};
