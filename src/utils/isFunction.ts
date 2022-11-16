export function isFunction<T extends (...args: any[]) => any>(value: unknown): value is Exclude<T, void> {
  return typeof value === "function";
}
