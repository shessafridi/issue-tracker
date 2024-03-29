import type { Metadata } from 'next';
import '@radix-ui/themes/styles.css';
import './theme.config.css';
import './globals.css';

import { Inter } from 'next/font/google';

import { Container } from '@radix-ui/themes';

import AppProviders from './AppProviders';
import NavBar from './NavBar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Track issues in your project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        <AppProviders>
          <NavBar />
          <main className='p-5'>
            <Container>{children}</Container>
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
