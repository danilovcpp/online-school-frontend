'use server';

import { PropsWithChildren } from 'react';

import { ProfileApi } from '@/services/api/profile-api';
import { checkServerIsAuth } from '@/utils/checkServerIsAuth';

import { StoreProviderClient } from './provider-client';

export const StoreProvider = async ({ children }: PropsWithChildren) => {
  const { token } = await checkServerIsAuth();

  const { data: profile } = await ProfileApi.getMyProfile();

  return (
    <StoreProviderClient
      preloadedState={{
        auth: { token },
        ...(profile && { user: { status: 'success', profile } })
      }}
    >
      {children}
    </StoreProviderClient>
  );
};
