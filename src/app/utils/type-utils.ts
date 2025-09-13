/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Creates a type where each key can be the real type, null, or undefined
 */
export type PartialNullable<T> = {
  [K in keyof T]?: T[K] | null;
};

/**
 * Helper function to extract the value from the key of an object.
 */
export function getValueOfKey<T extends Record<string, any>, K extends string>(
  obj: T,
  key: K
): K extends keyof T ? T[K] : undefined {
  if (key in obj) {
    return obj[key as keyof T] as any;
  }
  return undefined as any;
}
