import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../services/countryService';
import type { Country } from '../types';

/** Query key seed for react-query cache. */
export const COUNTRIES_QUERY_KEY = 'countries';

/**
 * Wraps the countries fetcher in a TanStack Query with deterministic client-side sorting.
 */
export const useCountriesQuery = (searchTerm: string) =>
  useQuery<Country[], Error>({
    queryKey: [COUNTRIES_QUERY_KEY, searchTerm.trim().toLowerCase()],
    queryFn: ({ signal }) => fetchCountries(searchTerm, signal),
    select: (countries) =>
      [...countries].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })),
  });
