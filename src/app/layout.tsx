import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { StoreProvider } from '@/store/provider/provider';

import '@/styles/globals.scss';

import '@/utils/axios';

export const metadata: Metadata = {
  title: 'Абакус - Интерактивное обучение счету',
  description: 'Древнее искусство быстрого счета с помощью абакуса (соробана)',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
