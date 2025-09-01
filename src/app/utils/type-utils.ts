/* eslint-disable @typescript-eslint/no-explicit-any */
export function getValueOfKey<T extends Record<string, any>, K extends string>(
  obj: T,
  key: K
): K extends keyof T ? T[K] : undefined {
  if (key in obj) {
    return obj[key as keyof T] as any;
  }
  return undefined as any;
}
