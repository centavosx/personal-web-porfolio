export type PartialExcept<T, K extends keyof T> = Omit<Partial<T>, K> &
  Record<K, T[K]>;
