import { AxiosError } from 'axios';

export const isAxiosError = <T = any>(err: any): err is AxiosError<T> =>
  err?.isAxiosError;
