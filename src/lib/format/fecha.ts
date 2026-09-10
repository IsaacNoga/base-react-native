const MESES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

export function formatDate(fecha?: string | null, conNombre = false): string {
  if (!fecha) return "";
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(fecha);
  if (!match) return fecha;

  const [, anio, mes, dia] = match;
  if (conNombre) {
    return `${dia} ${MESES[Number(mes) - 1] ?? mes} ${anio}`;
  }
  return `${dia}/${mes}/${anio}`;
}
