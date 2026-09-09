import { User } from "@/features/auth/schemas";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const authStorage = {
  async getToken() {
    return SecureStore.getItemAsync(TOKEN_KEY);
  },
  async setSession(token: string, user: User) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  },
  async getSession() {
    const token = await this.getToken();
    if (!token) return null;
    const rawUser = await SecureStore.getItemAsync(USER_KEY);
    return { token, user: rawUser ? JSON.parse(rawUser) : null };
  },
  async clear() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  },
};
