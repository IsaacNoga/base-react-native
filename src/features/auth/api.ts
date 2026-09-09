import { api } from "@/lib/api/client";
import { ENDPOINTS, Login, Sesion } from "./schemas";

export function login(creds: Login) {
  return api.post<Sesion>(ENDPOINTS.LOGIN, creds);
}

export function logout() {
  return api.post(ENDPOINTS.LOGOUT);
}
