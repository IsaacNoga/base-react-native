import { useMutation } from "@tanstack/react-query";
import { crearModelo, editarModelo, eliminarModelo } from "./api";

export function useCrearModelo(onSuccess: () => void, onError: () => void) {
  return useMutation({
    mutationFn: crearModelo,
    onSuccess: () => onSuccess(),
    onError: () => onError(),
  });
}
export function useEliminarModelo(onSuccess: () => void, onError: () => void) {
  return useMutation({
    mutationFn: eliminarModelo,
    onSuccess: () => onSuccess(),
    onError: () => onError(),
  });
}
export function useEditarModelo(onSuccess: () => void, onError: () => void) {
  return useMutation({
    mutationFn: editarModelo,
    onSuccess: () => onSuccess(),
    onError: () => onError(),
  });
}
