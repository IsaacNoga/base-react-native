import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const pedidos = sqliteTable("Pedidos", {
  id: text("id").primaryKey(),
  folio: text("folio").notNull(),
  idCliente: text("idCliente").notNull(),
  nombreCliente: text("nombreCliente").notNull(),
  primerApellidoCliente: text("primerApellidoCliente"),
  segundoApellidoCliente: text("segundoApellidoCliente"),
  idSucursal: text("idSucursal"),
  idCorteCaja: text("idCorteCaja"),
  idCreador: text("idCreador"),
  comentario: text("comentario"),
  cantidadProductos: integer("cantidadProductos"),
  descuento: text("descuento"),
  cantidadEfectivo: text("cantidadEfectivo"),
  cantidadTransferencia: text("cantidadTransferencia"),
  cantidadTarjeta: text("cantidadTarjeta"),
  costoTotal: text("costoTotal"),
  fechaAbiertoCocina: text("fechaAbiertoCocina"),
  fechaCerradoCocina: text("fechaCerradoCocina"),
  estatus: text("estatus"),
  fechaSincronizado: text("fechaSincronizado"),
  tipoPago: text("tipoPago"),
  creado: text("creado").notNull(),
  modificado: text("modificado"),
  eliminado: text("eliminado"),
  completo: integer("completo", { mode: "boolean" }),
  idMesa: text("idMesa"),
  proviene: text("proviene"),
  propina: text("propina"),
  propinaComentario: text("propinaComentario"),
  uuid: text("uuid"),
});

export const clienteWallet = sqliteTable("ClienteTransaccionWallet", {
  id: text("id").primaryKey(),
  idCliente: text("idCliente").notNull(),
  idPedido: text("idPedido").references(() => pedidos.id),
  fecha: text("fecha").notNull(),
  tipoMovimiento: text("tipoMovimiento").notNull(),
  saldoAnterior: text("saldoAnterior").notNull(),
  saldoNuevo: text("saldoNuevo").notNull(),
  monto: text("monto").notNull(),
  descripcion: text("descripcion"),
  creado: text("creado").notNull(),
  modificado: text("modificado"),
  eliminado: text("eliminado"),
});

export type Pedido = typeof pedidos.$inferSelect;
export type NuevoPedido = typeof pedidos.$inferInsert;

export type ClienteWallet = typeof clienteWallet.$inferSelect;
export type NuevoClienteWallet = typeof clienteWallet.$inferInsert;
