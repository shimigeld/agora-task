import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { ReactElement, ReactNode } from 'react';

vi.mock('../../services/countryService', () => ({
  fetchCountries: vi.fn(),
}));

import { fetchCountries } from '../../services/countryService';
import { useCountriesQuery } from '../../hooks/useCountriesQuery';

const mockFetchCountries = vi.mocked(fetchCountries);

let queryClient: QueryClient;
let wrapper: ({ children }: { children: ReactNode }) => ReactElement;

describe('useCountriesQuery', () => {
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: 0 } },
    });
    wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  });

  it('fetches and sorts countries', async () => {
    mockFetchCountries.mockResolvedValueOnce([
      {
        code: 'BRA',
        name: 'Brazil',
        capital: 'Brasilia',
        population: 214000000,
        flagUrl: 'bra.svg',
        flagAlt: 'Brazil flag',
      },
      {
        code: 'ARG',
        name: 'Argentina',
        capital: 'Buenos Aires',
        population: 45000000,
        flagUrl: 'arg.svg',
        flagAlt: 'Argentina flag',
      },
    ]);

    const { result } = renderHook(() => useCountriesQuery(' test '), { wrapper });

    await waitFor(() => expect(result.current.data).toBeDefined());
    expect(mockFetchCountries).toHaveBeenCalledWith(' test ', expect.any(AbortSignal));
    expect(result.current.data?.[0].name).toBe('Argentina');
  });
});
