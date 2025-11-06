import { request } from '@/utils/request';

import type { AuthTokens, LoginRequest, LoginResponse, RefreshRequest, RegisterRequest, RegisterResponse } from '@/types/auth';

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
  async refresh(data: RefreshRequest) {
    return request<AuthTokens>({
      method: 'POST',
      url: API_CONFIG.ENDPOINTS.REFRESH,
      data,
    });
  },
};
