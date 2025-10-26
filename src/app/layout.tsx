import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { Header } from '@/components/Header/Header';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Абакус - Интерактивное обучение счету',
  description: 'Древнее искусство быстрого счета с помощью абакуса (соробана)',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
