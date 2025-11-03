'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { HomePage } from '@/features/landing/pages/home';
import { routes } from '@/shared/constants/routes';
import { useIsAuthorized } from '@/shared/hooks/auth/use-is-authorized';

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useIsAuthorized();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(routes.dashboard);
    }
  }, [isAuthenticated, router]);

  // Show landing page for unauthenticated users
  if (!isAuthenticated) {
    return <HomePage />;
  }

  // Return null while redirecting authenticated users
  return null;
}
