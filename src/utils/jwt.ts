import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '@/shared/constants/cookies';

import { type LoginResponse } from '@/types/auth';

function addSeconds(seconds: number) {
  const now = new Date();
  return new Date(now.getTime() + seconds * 1000);
}

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

export const setClientAccess = (token: string, expires: number = 1800) => {
  return setCookie(ACCESS_TOKEN_COOKIE_NAME, token, { expires: addSeconds(expires) });
};

export const setClientRefresh = (token: string, expires: number = 604800) => {
  return setCookie(REFRESH_TOKEN_COOKIE_NAME, token, { expires: addSeconds(expires) });
};

export const setTokens = async ({ accessToken, refreshToken, expiresIn }: LoginResponse) => {
  // FIXME use expiresIn
  await setClientAccess(accessToken);
  await setClientRefresh(refreshToken);
};

export const deleteTokens = async () => {
  await deleteCookie(ACCESS_TOKEN_COOKIE_NAME);
  await deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
};

export const getAuthHeader = (token: string) => {
  return `Bearer ${token}`;
};
