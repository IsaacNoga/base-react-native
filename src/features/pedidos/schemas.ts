import z from "zod";

export const ENDPOINTS = {
  DEFAULT: "crm/pedido",
};

export const pedido = z.object({
  id: z.string().uuid(),
  total: z.string(),
  producto_id: z.string(),
  fecha_atencion: z.string().date(),
  consumidor_id: z.string(),
  identificador_externo: z.string(),
  comentarios: z.string(),
  creado: z.string().datetime(),
  modificado: z.string().datetime(),
  eliminado: z.string().datetime(),
});

export type Pedido = z.infer<typeof pedido>;
