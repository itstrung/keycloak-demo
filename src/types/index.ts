export type Maybe<TData, TError extends Error = Error> =
  | [TData, null]
  | [null, TError];
