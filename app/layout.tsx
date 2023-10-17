import type { Metadata } from 'next';
import './globals.css';

import { Lato } from 'next/font/google';

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
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
