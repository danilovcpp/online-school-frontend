import { redirect } from 'next/navigation';

import { HomePage } from '@/features/landing/pages/home/home';
import { routes } from '@/shared/constants/routes';
import { checkServerIsAuth } from '@/utils/checkServerIsAuth';

export default async function Home() {
  const { isAuth } = await checkServerIsAuth();

  if (isAuth) {
    return redirect(routes.dashboard);
  }

  if (!isAuth) {
    return <HomePage />;
  }

  return null;
}
