import { z } from "zod";

export const ENDPOINTS = {
  LOGIN: "crm/iniciar-sesion",
  LOGOUT: "crm/cerrar-sesion",
};

export const login = z.object({
  usuario: z.string().email("Ingrese un correo válido"),
  clave: z.string().min(4, "Al menos 4 caracteres"),
});

export const user = z.object({
  nombre: z.string(),
  apellidos: z.string(),
  correo: z.string().email("Ingrese un correo válido"),
  estatus: z.number(),
  token: z.string(),
  telefono: z.string(),
  alias: z.string(),
  foto: z.string(),
  rol: z.string(),
  perfil: z.string(),
  usuario: z.string(),
  numEconomico: z.string(),
});

export type Login = z.infer<typeof login>;
export type User = z.infer<typeof user>;
