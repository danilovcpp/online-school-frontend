export type CustomError<T extends object = object> = {
  type: string;
  message?: string;
} & T;

export type LoadingStatuses = 'success' | 'loading' | 'error';
