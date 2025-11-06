import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { routes } from '@/shared/constants/routes';
import { logoutRequest, selectAuthToken } from '@/store/features/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { useIsAuthorized } from './use-is-authorized';

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAuthorized = useIsAuthorized();
  const authToken = useAppSelector(selectAuthToken);

  const showLogin = useCallback(() => {
    router.push(routes.auth.login, { scroll: false });
  }, [router]);

  const logout = useCallback(() => {
    dispatch(logoutRequest());
  }, [dispatch]);

  return { showLogin, isAuthorized, logout, authToken };
};
