import { z } from "zod";

export const registroForm = z.object({
  nombre: z.string().min(2, "Ingrese un nombre válido"),
  correo: z.string().email("Ingrese un correo válido").min(5),
  telefono: z.string().min(10, "Al menos 10 caracteres").max(10),
});

export const loginForm = z.object({
  correo: z.string().email("Ingrese un correo válido").min(5),
  telefono: z.string().min(10, "Al menos 10 caracteres").max(10),
});

export type RegistroForm = z.infer<typeof registroForm>;
export type LoginForm = z.infer<typeof loginForm>;
