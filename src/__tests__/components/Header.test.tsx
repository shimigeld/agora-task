import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../components/SearchBar', () => ({
  SearchBar: () => <div data-testid="search-bar" />,
}));

vi.mock('../../components/SortControls', () => ({
  SortControls: () => <div data-testid="sort-controls" />,
}));

import { Header } from '../../components/Header';

describe('Header', () => {
  it('shows title and sub components', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { name: /world countries/i })).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('sort-controls')).toBeInTheDocument();
  });
});
