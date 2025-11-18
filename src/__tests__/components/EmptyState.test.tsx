import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../context/CountriesContext', () => ({
  useCountriesContext: vi.fn(),
}));

import { useCountriesContext } from '../../context/CountriesContext';
import { EmptyState } from '../../components/EmptyState';
import { createCountriesContextValue } from '../../testing/countriesContextMock';

const mockUseCountriesContext = vi.mocked(useCountriesContext);

describe('EmptyState', () => {
  it('shows fallback text with search term', () => {
    mockUseCountriesContext.mockReturnValue(createCountriesContextValue({ debouncedSearch: 'Atlantis' }));
    render(<EmptyState />);
    expect(screen.getByText(/Atlantis/)).toBeInTheDocument();
  });
});
