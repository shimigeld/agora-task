import { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useCountriesQuery } from '../hooks/useCountriesQuery';
import type { Country, SortOption } from '../types';

/** Default sort order (name ascending) used when the app first loads. */
const DEFAULT_SORT: SortOption = { field: 'name', direction: 'asc' };

/** Returns a new array sorted by the requested field and direction. */
const sortCountries = (countries: Country[], sort: SortOption) => {
  const sorted = [...countries];
  if (sort.field === 'name') {
    return sorted.sort((a, b) => {
      const compare = a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      return sort.direction === 'asc' ? compare : -compare;
    });
  }

  return sorted.sort((a, b) =>
    sort.direction === 'asc' ? a.population - b.population : b.population - a.population,
  );
};

/** Everything exposed by CountriesContext. */
export interface CountriesContextValue {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  debouncedSearch: string;
  sortedCountries: Country[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  showEmptyState: boolean;
}

const CountriesContext = createContext<CountriesContextValue | undefined>(undefined);

export const useCountriesContext = () => {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error('useCountriesContext must be used within CountriesProvider');
  }
  return context;
};

/** Context provider for children. Props: { children } is the subtree that needs country data. */
export const CountriesProvider = ({ children }: PropsWithChildren) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT);

  const debouncedSearch = useDebouncedValue(searchTerm);
  const { data, isLoading, isError, refetch, error, isFetching } = useCountriesQuery(debouncedSearch);

  const sortedCountries = useMemo(
    () => (data ? sortCountries(data, sortOption) : []),
    [data, sortOption],
  );

  const showEmptyState = !isLoading && !isFetching && !isError && (data?.length ?? 0) === 0;

  const value: CountriesContextValue = {
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    debouncedSearch,
    sortedCountries,
    isLoading,
    isFetching,
    isError,
    error: error ?? null,
    refetch,
    showEmptyState,
  };

  return <CountriesContext.Provider value={value}>{children}</CountriesContext.Provider>;
};
