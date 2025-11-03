import { request } from '@/utils/request';

import type { Profile } from '@/types/auth';

import { API_CONFIG } from './config';

export const ProfileApi = {
  async getMyProfile() {
    return request<Profile>({
      url: API_CONFIG.ENDPOINTS.PROFILE_ME,
    });
  },
};
