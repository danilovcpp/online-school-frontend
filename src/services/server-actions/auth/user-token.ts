'use server';

import { cookies } from 'next/headers';

import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '@/shared/constants/cookies';

export const unsetUserTokensAction = async () => {
  (await cookies()).delete({ name: ACCESS_TOKEN_COOKIE_NAME });
  (await cookies()).delete({ name: REFRESH_TOKEN_COOKIE_NAME });
};
