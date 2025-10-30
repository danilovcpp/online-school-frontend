export const API_CONFIG = {
  BASE_URL: 'https://auth.runex.space',
  ENDPOINTS: {
    LOGIN: '/api/login',
    REGISTER: '/api/register',
    PROFILE_ME: '/api/profile/me',
  },
  TIMEOUT: 10000,
} as const;
