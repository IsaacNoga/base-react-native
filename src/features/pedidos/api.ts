import { api } from "@/lib/api/client";
import { IRequestParams } from "@/types/api";
import { ENDPOINTS, Pedido } from "./schemas";

export function obtenerModelo(params?: IRequestParams) {
  return api.get<Pedido[]>(ENDPOINTS.DEFAULT, params);
}

export function crearModelo(body?: Partial<Pedido>) {
  return api.post(ENDPOINTS.DEFAULT, body);
}

export function editarModelo(body?: Partial<Pedido>) {
  return api.put(ENDPOINTS.DEFAULT, body);
}

export function eliminarModelo(body?: Partial<Pedido>) {
  return api.delete(ENDPOINTS.DEFAULT, body);
}
