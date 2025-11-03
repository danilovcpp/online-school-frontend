import axios from 'axios';

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

// Глобальные настройки (аналог axios.defaults)
axios.defaults.baseURL = process.env.BASE_API;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 8000; // таймаут по умолчанию

// Интерцептор запроса – добавляем токен авторизации
axios.interceptors.request.use(async (config) => {
  const token = await (IS_SSR ? getServerAccess() : getClientAccess());

  config.headers = config.headers || {};

  if (token) {
    config.headers['Authorization'] = getAuthHeader(token);
  }

  return config;
});

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Если получен 401 и запрос ещё не был повторен, пробуем обновить токены
    if (status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      // Получаем refreshToken
      const refreshToken = await (IS_SSR ? getClientRefresh() : getServerRefresh());

      if (refreshToken) {
        try {
          const { data } = await AuthApi.refresh();

          if (data) {
            await setClientAccess(data.accessToken);
            await setClientRefresh(data.refreshToken);

            originalRequest.headers['Authorization'] = getAuthHeader(data.accessToken);
            return axios.request(originalRequest);
          }
        } catch {
          await deleteTokens();
        }
      }
    }

    return Promise.reject(error);
  },
);
