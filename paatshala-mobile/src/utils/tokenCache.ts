import * as SecureStore from 'expo-secure-store';

export interface TokenCache {
  getToken: (key: string) => Promise<string | null>;
  saveToken: (key: string, value: string) => Promise<void>;
  clearToken?: (key: string) => Promise<void>;
}

/**
 * Secure token storage using Expo SecureStore for Clerk session management.
 * Encrypts and securely persists session tokens on Android Keystore and iOS Keychain.
 */
export const createTokenCache = (): TokenCache => {
  return {
    async getToken(key: string): Promise<string | null> {
      try {
        return await SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string): Promise<void> {
      try {
        await SecureStore.setItemAsync(key, value);
      } catch (err) {
        // Handle error silently or log in debug
      }
    },
    async clearToken(key: string): Promise<void> {
      try {
        await SecureStore.deleteItemAsync(key);
      } catch (err) {
        // Handle error silently
      }
    },
  };
};

export const tokenCache = createTokenCache();
