import { api } from "@/lib/api/client";
import { IRequestParams } from "@/types/api";
import { LoginForm } from "./schemas";

export function login(params?: IRequestParams) {
  return api.get<LoginForm>("pos/cliente/buscar-cliente.json");
}
