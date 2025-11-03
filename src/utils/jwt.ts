import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '@/shared/constants/cookies';

export const getClientAccess = async () => {
  return getCookie(ACCESS_TOKEN_COOKIE_NAME);
};

export const getServerAccess = async () => {
  const cookieStore = await (await import('next/headers')).cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
};

export const getClientRefresh = async () => {
  return getCookie(REFRESH_TOKEN_COOKIE_NAME);
};

export const getServerRefresh = async () => {
  const cookieStore = await (await import('next/headers')).cookies();
  return cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
};

export const setClientAccess = (token: string) => {
  return setCookie(ACCESS_TOKEN_COOKIE_NAME, token, { expires: new Date('2025-11-05T00:00:00Z') });
};

export const setClientRefresh = (token: string) => {
  return setCookie(REFRESH_TOKEN_COOKIE_NAME, token, { httpOnly: true, expires: new Date('2025-11-05T00:00:00Z') });
};

export const setTokens = async ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  await setClientAccess(accessToken);
  await setClientRefresh(refreshToken);
};

export const deleteTokens = async () => {
  await deleteCookie(ACCESS_TOKEN_COOKIE_NAME);
  await deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
}

export const getAuthHeader = (token: string) => {
  return `Bearer ${token}`;
};
