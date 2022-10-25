export type Promisable<T> = Promise<T> | T;

export type AsyncReturnType<T> = T extends () => Promisable<infer U> ? U : never;

export type StaticPathParams<T> = AsyncReturnType<T> extends { params: infer U }[] ? U : never;
