export interface Respuesta {
  statusCode: number;
  paginacion: Paginacion;
  resultado: Record<string, any>[];
  detalle: Record<string, any>;
  errores: Record<string, any>;
  mensaje: string;
}

interface Paginacion {
  total: number;
  pagina: number;
  limite: number;
}

export interface IRequestParams {
  expand?: string;
  ordenar?: string | "id-desc" | "id-asc";
  limite?: number;
  pagina?: number;
  buscar?: string;

  [key: string]: any;
}
