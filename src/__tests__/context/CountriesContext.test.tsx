import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../hooks/useCountriesQuery', () => ({
  useCountriesQuery: vi.fn(),
}));

vi.mock('../../hooks/useDebouncedValue', () => ({
  useDebouncedValue: vi.fn((value: string) => value),
}));

import { useCountriesQuery } from '../../hooks/useCountriesQuery';
import { CountriesProvider, useCountriesContext } from '../../context/CountriesContext';

const mockUseCountriesQuery = vi.mocked(useCountriesQuery);
type CountriesQueryResult = ReturnType<typeof useCountriesQuery>;

const Consumer = () => {
  const { sortedCountries, setSortOption } = useCountriesContext();

  return (
    <div>
      <div>
        <button onClick={() => setSortOption({ field: 'name', direction: 'desc' })}>sort-name-desc</button>
        <button onClick={() => setSortOption({ field: 'population', direction: 'asc' })}>
          sort-pop-asc
        </button>
        <button onClick={() => setSortOption({ field: 'population', direction: 'desc' })}>
          sort-pop-desc
        </button>
      </div>
      <ul>
        {sortedCountries.map((country) => (
          <li key={country.code}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
};

const StateConsumer = () => {
  const { showEmptyState } = useCountriesContext();
  return <p>{showEmptyState ? 'empty' : 'not-empty'}</p>;
};

describe('CountriesContext', () => {
  it('throws if hook is consumed outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    const OrphanConsumer = () => {
      useCountriesContext();
      return null;
    };

    expect(() => render(<OrphanConsumer />)).toThrow('useCountriesContext must be used within CountriesProvider');
    consoleError.mockRestore();
  });

  it('sorts alphabetically by default and switches to population ascending', async () => {
    const data = [
      { code: 'B', name: 'Brazil', capital: '', population: 10, flagUrl: '', flagAlt: '' },
      { code: 'A', name: 'Argentina', capital: '', population: 20, flagUrl: '', flagAlt: '' },
    ];

    mockUseCountriesQuery.mockReturnValue({
      data,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetching: false,
    } as unknown as CountriesQueryResult);

    render(
      <CountriesProvider>
        <Consumer />
      </CountriesProvider>,
    );

    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Argentina');

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /sort-pop-asc/i }));
    await waitFor(() => expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Brazil'));
  });

  it('supports population descending sorting', async () => {
    const data = [
      { code: 'B', name: 'Brazil', capital: '', population: 10, flagUrl: '', flagAlt: '' },
      { code: 'A', name: 'Argentina', capital: '', population: 20, flagUrl: '', flagAlt: '' },
    ];

    mockUseCountriesQuery.mockReturnValue({
      data,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetching: false,
    } as unknown as CountriesQueryResult);

    render(
      <CountriesProvider>
        <Consumer />
      </CountriesProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /sort-pop-desc/i }));
    await waitFor(() => expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Argentina'));
  });

  it('supports name descending sorting', async () => {
    const data = [
      { code: 'B', name: 'Brazil', capital: '', population: 10, flagUrl: '', flagAlt: '' },
      { code: 'A', name: 'Argentina', capital: '', population: 20, flagUrl: '', flagAlt: '' },
    ];

    mockUseCountriesQuery.mockReturnValue({
      data,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetching: false,
    } as unknown as CountriesQueryResult);

    render(
      <CountriesProvider>
        <Consumer />
      </CountriesProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /sort-name-desc/i }));
    await waitFor(() => expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Brazil'));
  });

  it('reports empty state when idle and no data', () => {
    mockUseCountriesQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetching: false,
    } as unknown as CountriesQueryResult);

    render(
      <CountriesProvider>
        <StateConsumer />
      </CountriesProvider>,
    );

    expect(screen.getByText('empty')).toBeInTheDocument();
  });

  it('keeps empty state false while loading', () => {
    mockUseCountriesQuery.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetching: true,
    } as unknown as CountriesQueryResult);

    render(
      <CountriesProvider>
        <StateConsumer />
      </CountriesProvider>,
    );

    expect(screen.getByText('not-empty')).toBeInTheDocument();
  });
});
