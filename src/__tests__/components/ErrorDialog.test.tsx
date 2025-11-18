import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../context/CountriesContext', () => ({
  useCountriesContext: vi.fn(),
}));

import { useCountriesContext } from '../../context/CountriesContext';
import { ErrorDialog } from '../../components/ErrorDialog';
import { createCountriesContextValue } from '../../testing/countriesContextMock';

const mockUseCountriesContext = vi.mocked(useCountriesContext);

describe('ErrorDialog', () => {
  it('renders message and calls retry', () => {
    const refetch = vi.fn();
    mockUseCountriesContext.mockReturnValue(
      createCountriesContextValue({
        isError: true,
        error: new Error('boom'),
        refetch,
      }),
    );

    render(<ErrorDialog />);

    expect(screen.getByText(/boom/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(refetch).toHaveBeenCalled();
  });
});
