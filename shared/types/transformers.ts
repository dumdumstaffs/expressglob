export type WithDate<
  T extends { [k: string]: any },
  O extends keyof T,
> = Spread<Omit<T, O> & { [K in O]: Date }>;

export type ChangeKey<
  T extends { [k: string]: any },
  K extends keyof any,
> = Spread<{
  [P in K]: T[keyof T];
}>;

export type Spread<T> = { [K in keyof T]: T[K] };
