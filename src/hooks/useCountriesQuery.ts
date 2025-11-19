import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../services/countryService';
import type { Country } from '../types';

/** Key for caching country queries. */
export const COUNTRIES_QUERY_KEY = 'countries';

/** Fetches countries with TanStack Query */
export const useCountriesQuery = (searchTerm: string) =>
  useQuery<Country[], Error>({
    queryKey: [COUNTRIES_QUERY_KEY, searchTerm.trim().toLowerCase()],
    queryFn: ({ signal }) => fetchCountries(searchTerm, signal),
    select: (countries) =>
      [...countries].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })),
  });
