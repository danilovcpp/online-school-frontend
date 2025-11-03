'use server';

import { PropsWithChildren } from 'react';
import { cookies } from 'next/headers';

import { ProfileApi } from '@/services/api/profile-api';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/shared/constants/cookies';

import { StoreProviderClient } from './provider-client';

export const StoreProvider = async ({ children }: PropsWithChildren) => {
  // FIXME Refactor
  const authToken = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value ?? '';

  const { data: profile } = await ProfileApi.getMyProfile();

  return (
    <StoreProviderClient
      preloadedState={{
        auth: { token: authToken },
        ...(profile && { user: { status: 'success', profile } })
      }}
    >
      {children}
    </StoreProviderClient>
  );
};
