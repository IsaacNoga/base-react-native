import { api } from "@/lib/api/client";
import { IRequestParams } from "@/types/api";
import { ENDPOINTS, Modelo } from "./schemas";

export function obtenerModelo(params?: IRequestParams) {
  return api.get<Modelo[]>(ENDPOINTS.DEFAULT, params);
}

export function crearModelo(body?: Partial<Modelo>) {
  return api.post("/modelo.json", body);
}

export function editarModelo(body?: Partial<Modelo>) {
  return api.put("/modelo.json", body);
}

export function eliminarModelo(body?: Partial<Modelo>) {
  return api.delete("/modelo.json", body);
}
