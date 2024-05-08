export type Entries<T extends object> = [keyof T, T[keyof T]][]
