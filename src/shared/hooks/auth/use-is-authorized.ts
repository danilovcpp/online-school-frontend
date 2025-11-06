import { selectIsUserAuthorized } from '@/store/features/auth/auth-slice';
import { useAppSelector } from '@/store/hooks';

export const useIsAuthorized = () => {
  const isAuthorized = useAppSelector(selectIsUserAuthorized);

  return isAuthorized;
};
