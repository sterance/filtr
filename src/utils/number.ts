export function roundTo(value: number, decimals = 6): number {
  if (!Number.isFinite(value)) return value;
  return Number(value.toFixed(decimals));
}
