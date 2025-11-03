'use server';

import { unstable_noStore } from 'next/cache';

import { unsetUserTokensAction } from './user-token';

export const logoutAction = async () => {
  unstable_noStore();
  try {
    await unsetUserTokensAction();

    return true;
  } catch {
    return false;
  }
};
