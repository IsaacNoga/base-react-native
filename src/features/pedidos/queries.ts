import { IRequestParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { obtenerModelo } from "./api";
import { ENDPOINTS } from "./schemas";

export function usePedidos(params?: IRequestParams) {
  return useQuery({
    queryKey: [ENDPOINTS.DEFAULT, params],
    queryFn: () => obtenerModelo(params),
  });
}

export function usePedido(id?: string) {
  return useQuery({
    queryKey: [ENDPOINTS.DEFAULT, "detalle", id],
    queryFn: () => obtenerModelo({ id }),
    enabled: !!id,
    select: (data) => data.resultado?.[0],
  });
}
