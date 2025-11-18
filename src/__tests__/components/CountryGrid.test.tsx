import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../context/CountriesContext', () => ({
  useCountriesContext: vi.fn(),
}));

import { useCountriesContext } from '../../context/CountriesContext';
import { CountryGrid } from '../../components/CountryGrid';
import { createCountriesContextValue } from '../../testing/countriesContextMock';

const mockUseCountriesContext = vi.mocked(useCountriesContext);

describe('CountryGrid', () => {
  it('renders a card for each country', () => {
    mockUseCountriesContext.mockReturnValue(
      createCountriesContextValue({
        sortedCountries: [
          {
            code: 'USA',
            name: 'United States',
            capital: 'Washington',
            population: 331000000,
            flagUrl: 'usa.svg',
            flagAlt: 'USA flag',
          },
          {
            code: 'MEX',
            name: 'Mexico',
            capital: 'Mexico City',
            population: 128000000,
            flagUrl: 'mex.svg',
            flagAlt: 'Mexico flag',
          },
        ],
      }),
    );

    render(<CountryGrid />);

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Mexico')).toBeInTheDocument();
  });
});
