import type { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { queryClient } from '../lib/queryClient';
import { theme } from '../theme';

/** Wraps children with theming, baseline styles, and the react-query provider. Props: { children }. */
export const AppProviders = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </QueryClientProvider>
);
