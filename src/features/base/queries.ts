import { IRequestParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { obtenerModelo } from "./api";

export function useModelos(params?: IRequestParams) {
  return useQuery({
    queryKey: ["modelo", params],
    queryFn: () => obtenerModelo(params),
  });
}
