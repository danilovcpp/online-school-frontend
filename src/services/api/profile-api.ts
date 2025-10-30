import type { ProfileResponse } from '@/types/auth';

import { API_CONFIG } from './config';

class ProfileApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = 'ProfileApiError';
  }
}

export const profileApi = {
  async getMyProfile(accessToken: string): Promise<ProfileResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROFILE_ME}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 401) {
          throw new ProfileApiError('Не авторизован', response.status);
        }
        if (response.status >= 500) {
          throw new ProfileApiError('Ошибка сервера. Попробуйте позже', response.status);
        }
        throw new ProfileApiError('Ошибка получения профиля', response.status);
      }

      const data: ProfileResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ProfileApiError) {
        throw error;
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new ProfileApiError('Ошибка соединения с сервером');
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new ProfileApiError('Превышено время ожидания');
      }

      throw new ProfileApiError('Произошла ошибка при получении профиля');
    }
  },
};
