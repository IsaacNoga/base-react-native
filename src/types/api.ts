export interface ApiResponse<T = Record<string, any>[]> {
  statusCode: number;
  paginacion: Pagination;
  resultado: T;
  detalle: Record<string, any>;
  errores: Record<string, any>;
  mensaje: string;
}

export interface Pagination {
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
