import axios, { AxiosInstance } from 'axios';

import { AuthApi } from '@/services/api/auth-api';

import { IS_SSR } from './isSsr';
import { deleteTokens, getAuthHeader, getClientAccess, getClientRefresh, getServerAccess, getServerRefresh, setTokens } from './jwt';

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
            const { data } = await AuthApi.refresh({ refreshToken });

            if (data) {
              await setTokens(data);

              if (!IS_SSR) {
                const { getOrCreateStore } = await import('@/store');
                const { loginToken } = await import('@/store/features/auth/auth-slice');
                const store = getOrCreateStore();
                store.dispatch(loginToken(data.accessToken));
              }

              originalRequest.headers['Authorization'] = getAuthHeader(data.accessToken);
              return instance.request(originalRequest);
            }
          } catch {
            await deleteTokens();

            if (!IS_SSR) {
              const { getOrCreateStore } = await import('@/store');
              const { logoutRequest } = await import('@/store/features/auth/auth-slice');
              const store = getOrCreateStore();
              store.dispatch(logoutRequest());
            }
          }
        } else {
          if (!IS_SSR) {
            const { getOrCreateStore } = await import('@/store');
            const { logoutRequest } = await import('@/store/features/auth/auth-slice');
            const store = getOrCreateStore();
            store.dispatch(logoutRequest());
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
}

export const axiosInstance = createAxiosInstance();
