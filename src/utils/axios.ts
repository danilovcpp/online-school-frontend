import axios, { AxiosInstance } from 'axios';

import { AuthApi } from '@/services/api/auth-api';

import { IS_SSR } from './isSsr';
import {
  deleteTokens,
  getAuthHeader,
  getClientAccess,
  getClientRefresh,
  getServerAccess,
  getServerRefresh,
  setClientAccess,
  setClientRefresh,
} from './jwt';

function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // --- Интерцептор запроса ---
  instance.interceptors.request.use(async (config) => {
    const token = await (IS_SSR ? getServerAccess() : getClientAccess());

    config.headers = config.headers || {};

    if (token) {
      config.headers['Authorization'] = getAuthHeader(token);
    }

    return config;
  });

  // --- Интерцептор ответа ---
  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;

      if (status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;

        const refreshToken = await (IS_SSR ? getServerRefresh() : getClientRefresh());
        if (refreshToken) {
          try {
            const { data } = await AuthApi.refresh();
            if (data) {
              await setClientAccess(data.accessToken);
              await setClientRefresh(data.refreshToken);

              originalRequest.headers['Authorization'] = getAuthHeader(data.accessToken);
              return instance.request(originalRequest);
            }
          } catch {
            await deleteTokens();
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
}

export const axiosInstance = createAxiosInstance();
