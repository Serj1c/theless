import { AxiosError } from 'axios';

export const isAxiosError = (arg: any): arg is AxiosError => arg?.response;
