import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../context/CountriesContext', () => ({
  useCountriesContext: vi.fn(),
}));

import { useCountriesContext } from '../../context/CountriesContext';
import { SearchBar } from '../../components/SearchBar';
import { createCountriesContextValue } from '../../testing/countriesContextMock';

const mockUseCountriesContext = vi.mocked(useCountriesContext);

describe('SearchBar', () => {
  it('invokes setter on change', async () => {
    const setSearchTerm = vi.fn();
    mockUseCountriesContext.mockReturnValue(createCountriesContextValue({ searchTerm: '', setSearchTerm }));

    const user = userEvent.setup();
    render(<SearchBar />);

    await user.type(screen.getByLabelText(/search countries/i), 'usa');

    expect(setSearchTerm).toHaveBeenNthCalledWith(1, 'u');
    expect(setSearchTerm).toHaveBeenNthCalledWith(2, 's');
    expect(setSearchTerm).toHaveBeenNthCalledWith(3, 'a');
  });

  it('clears the value when clicking clear button', async () => {
    const setSearchTerm = vi.fn();
    mockUseCountriesContext.mockReturnValue(createCountriesContextValue({ searchTerm: 'can', setSearchTerm }));

    const user = userEvent.setup();
    render(<SearchBar />);

    await user.click(screen.getByRole('button', { name: /clear search/i }));

    expect(setSearchTerm).toHaveBeenCalledWith('');
  });
});
