'use client';

import { PropsWithChildren } from 'react';

import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AuthProvider from './auth/Provider';

const queryClient = new QueryClient();

function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Theme appearance='light' accentColor='violet'>
          {children}
        </Theme>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default AppProviders;
