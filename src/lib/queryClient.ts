import { QueryClient } from '@tanstack/react-query';

/** Central TanStack Query client with opinionated defaults for this app. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
