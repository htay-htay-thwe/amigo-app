import AsyncStorage from '@react-native-async-storage/async-storage';

export const CURRENT_USER_KEY = '@current_user';

export interface StoredUser {
  id: string;
  name?: string;
  email?: string;
  photoUrl?: string;
  handle?: string;
}

export const setCurrentUser = async (user: StoredUser | null) => {
  try {
    if (!user) {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
      return;
    }
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.warn('Failed to save current user', e);
  }
};

export const getCurrentUser = async (): Promise<StoredUser | null> => {
  try {
    const json = await AsyncStorage.getItem(CURRENT_USER_KEY);
    if (!json) return null;
    return JSON.parse(json) as StoredUser;
  } catch (e) {
    console.warn('Failed to read current user', e);
    return null;
  }
};

export const clearCurrentUser = async () => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (e) {
    console.warn('Failed to clear current user', e);
  }
};
