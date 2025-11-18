import type { CountriesContextValue } from '../context/CountriesContext';
import { vi } from 'vitest';

export const createCountriesContextValue = (
  overrides: Partial<CountriesContextValue> = {},
): CountriesContextValue => ({
  searchTerm: '',
  setSearchTerm: vi.fn(),
  sortOption: { field: 'name', direction: 'asc' },
  setSortOption: vi.fn(),
  debouncedSearch: '',
  sortedCountries: [],
  isLoading: false,
  isFetching: false,
  isError: false,
  error: null,
  refetch: vi.fn(),
  showEmptyState: false,
  ...overrides,
});
