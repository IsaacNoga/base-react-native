import z from "zod";

export const ENDPOINTS = {
  DEFAULT: "/v1/modelo.json",
};

export const modelo = z.object({
  id: z.string().uuid(),
  clave: z.string(),
  nombre: z.string(),
  descripcion: z.string(),
  creado: z.string().datetime(),
  modificado: z.string().datetime(),
  eliminado: z.string().datetime(),
});

export type Modelo = z.infer<typeof modelo>;
