'use server';
import { cookies } from 'next/headers';

import { ACCESS_TOKEN_COOKIE_NAME } from '@/shared/constants/cookies';

export const checkServerIsAuth = async () => {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value ?? '';

  return { isAuth: !!token, token };
};
