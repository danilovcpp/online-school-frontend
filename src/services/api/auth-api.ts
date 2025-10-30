import type { AuthTokens, LoginRequest, LoginResponse } from '@/types/auth';

import { API_CONFIG } from './config';

class AuthApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = 'AuthApiError';
  }
}

export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthTokens> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 401) {
          throw new AuthApiError('Неверный email или пароль', response.status);
        }
        if (response.status === 400) {
          throw new AuthApiError('Некорректные данные для входа', response.status);
        }
        if (response.status >= 500) {
          throw new AuthApiError('Ошибка сервера. Попробуйте позже', response.status);
        }
        throw new AuthApiError('Ошибка входа', response.status);
      }

      const data: LoginResponse = await response.json();

      // Calculate expiration timestamp
      const expiresAt = Date.now() + data.expiresIn * 1000;

      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt,
      };
    } catch (error) {
      if (error instanceof AuthApiError) {
        throw error;
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new AuthApiError('Ошибка соединения с сервером');
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new AuthApiError('Превышено время ожидания');
      }

      throw new AuthApiError('Произошла ошибка при входе');
    }
  },
};
