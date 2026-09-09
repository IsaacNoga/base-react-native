import { User } from "@/features/auth/schemas";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

const isWeb = Platform.OS === "web";

const webStore = {
  async getItem(key: string) {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  },
  async setItem(key: string, value: string) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
  },
  async deleteItem(key: string) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  },
};

export const authStorage = {
  async getToken() {
    if (isWeb) return webStore.getItem(TOKEN_KEY);
    return SecureStore.getItemAsync(TOKEN_KEY);
  },

  async setSession(token: string, user: User) {
    if (isWeb) {
      await webStore.setItem(TOKEN_KEY, token);
      await webStore.setItem(USER_KEY, JSON.stringify(user));
      return;
    }
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  },

  async getSession() {
    const token = await this.getToken();
    if (!token) return null;
    const rawUser = isWeb
      ? await webStore.getItem(USER_KEY)
      : await SecureStore.getItemAsync(USER_KEY);
    return { token, user: rawUser ? JSON.parse(rawUser) : null };
  },

  async clear() {
    if (isWeb) {
      await webStore.deleteItem(TOKEN_KEY);
      await webStore.deleteItem(USER_KEY);
      return;
    }
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  },
};