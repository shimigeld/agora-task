import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../context/CountriesContext', () => ({
  useCountriesContext: vi.fn(),
}));

import { useCountriesContext } from '../../context/CountriesContext';
import { SortControls } from '../../components/SortControls';
import { createCountriesContextValue } from '../../testing/countriesContextMock';

const mockUseCountriesContext = vi.mocked(useCountriesContext);

describe('SortControls', () => {
  it('changes selection and informs context', async () => {
    const setSortOption = vi.fn();
    mockUseCountriesContext.mockReturnValue(
      createCountriesContextValue({
        sortOption: { field: 'name', direction: 'asc' },
        setSortOption,
      }),
    );

    const user = userEvent.setup();
    render(<SortControls />);

    await user.click(screen.getByLabelText(/sort by/i));
    await user.click(screen.getByRole('option', { name: /population \(descending\)/i }));

    expect(setSortOption).toHaveBeenCalledWith({ field: 'population', direction: 'desc' });
  });
});
