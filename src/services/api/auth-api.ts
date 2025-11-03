import { request } from '@/utils/request';

import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/auth';

import { API_CONFIG } from './config';

export const AuthApi = {
  async login(credentials: LoginRequest) {
    return request<LoginResponse>({
      url: API_CONFIG.ENDPOINTS.LOGIN,
      method: 'POST',
      data: credentials,
    });
  },

  async register(credentials: RegisterRequest) {
    return request<RegisterResponse>({
      url: API_CONFIG.ENDPOINTS.REGISTER,
      method: 'POST',
      data: credentials,
    });
  },
  async refresh() {
    return { data: { accessToken: '123', refreshToken: '456' } };
  },
};
