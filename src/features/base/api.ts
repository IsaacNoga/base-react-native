import { api } from "@/lib/api/client";
import { IRequestParams } from "@/types/api";
import { ENDPOINTS, Modelo } from "./schemas";

export function obtenerModelo(params?: IRequestParams) {
  return api.get<Modelo[]>(ENDPOINTS.DEFAULT, params);
}

export function crearModelo(body?: Partial<Modelo>) {
  return api.post("/pedidos.json", body);
}

export function editarModelo(body?: Partial<Modelo>) {
  return api.put("/pedidos.json", body);
}

export function eliminarModelo(body?: Partial<Modelo>) {
  return api.delete("/pedidos.json", body);
}
