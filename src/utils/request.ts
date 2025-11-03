import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosResponseHeaders,
  type RawAxiosResponseHeaders,
} from 'axios';

/**
 * Расширяем стандартный конфиг axios возможностью указать сообщение об ошибке по умолчанию
 */
export interface RequestConfig extends AxiosRequestConfig {
  defaultError?: string;
}

export interface Response<T> {
  data?: T;
  status?: number;
  error?: string;
  headers?: AxiosResponseHeaders | RawAxiosResponseHeaders;
}

export type APIError<T> = unknown | Error | AxiosError<T> | string;

const axiosErrorHandler = <T>(error: APIError<T>, defaultError?: string): Response<T> => {
  if (axios.isCancel(error)) {
    return { error: 'Request cancelled' };
  }

  if (axios.isAxiosError<T>(error)) {
    const axiosError = error as AxiosError<T>;

    if (axiosError.response) {
      const { status, data, headers } = axiosError.response;
      return { status, data, headers };
    }

    if (axiosError.request) {
      return { error: 'No response received from server' };
    }
  }

  if (error instanceof Error) {
    return { error: error.message || defaultError };
  }

  return { error: String(error || defaultError) };
};

/**
 * Универсальная обёртка над axios.request
 */
export const request = async <T = unknown>(config: RequestConfig): Promise<Response<T>> => {
  try {
    const response: AxiosResponse<T> = await axios.request<T>(config);
    const { data, status, headers } = response;

    return { data, status, headers };
  } catch (error) {
    return axiosErrorHandler<T>(error as APIError<T>, config.defaultError);
  }
};
