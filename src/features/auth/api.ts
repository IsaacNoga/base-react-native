import { api } from "@/lib/api/client";
import { ENDPOINTS, Login, User } from "./schemas";

export function login(creds: Login) {
  return api.post<User>(ENDPOINTS.LOGIN, creds);
}

export function logout() {
  return api.post(ENDPOINTS.LOGOUT);
}
