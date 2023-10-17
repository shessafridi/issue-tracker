import type { Metadata } from 'next';
import '@radix-ui/themes/styles.css';
import './globals.css';

import { Lato } from 'next/font/google';

import { Theme } from '@radix-ui/themes';

import NavBar from './NavBar';

const inter = Lato({ weight: ['400', '700', '300'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Theme>
          <NavBar />
          <main className='p-5'>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
