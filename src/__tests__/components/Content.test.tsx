import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('../../components/CountryGrid', () => ({
  CountryGrid: () => <div data-testid="country-grid" />,
}));

vi.mock('../../components/EmptyState', () => ({
  EmptyState: () => <div data-testid="empty-state">empty</div>,
}));

vi.mock('../../components/ErrorDialog', () => ({
  ErrorDialog: () => <div data-testid="error-dialog" />,
}));

vi.mock('../../components/Loader', () => ({
  Loader: () => <div data-testid="loader">loading</div>,
}));

vi.mock('../../context/CountriesContext', () => ({
  useCountriesContext: vi.fn(),
}));

import { useCountriesContext } from '../../context/CountriesContext';
import { Content } from '../../components/Content';
import { createCountriesContextValue } from '../../testing/countriesContextMock';

const mockUseCountriesContext = vi.mocked(useCountriesContext);

const baseContext = createCountriesContextValue();

describe('Content', () => {
  beforeEach(() => {
    mockUseCountriesContext.mockReturnValue(baseContext);
  });

  it('shows loader when busy', () => {
    mockUseCountriesContext.mockReturnValue(createCountriesContextValue({ isLoading: true }));
    render(<Content />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('shows empty state when no results', () => {
    mockUseCountriesContext.mockReturnValue(createCountriesContextValue({ showEmptyState: true }));
    render(<Content />);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('shows grid when data available', () => {
    render(<Content />);
    expect(screen.getByTestId('country-grid')).toBeInTheDocument();
  });
});
