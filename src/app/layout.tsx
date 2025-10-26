import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { Header } from '@/components/Header/Header';
import { AuthProvider } from '@/contexts/AuthContext';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Абакус - Интерактивное обучение счету',
  description: 'Древнее искусство быстрого счета с помощью абакуса (соробана)',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
