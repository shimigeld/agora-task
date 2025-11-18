import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';

vi.mock('../../components/Header', () => ({
  Header: () => <div>header</div>,
}));

vi.mock('../../components/Content', () => ({
  Content: () => <div>content</div>,
}));

vi.mock('../../context/CountriesContext', () => ({
  CountriesProvider: ({ children }: { children: ReactNode }) => <div data-testid="provider">{children}</div>,
}));

import App from '../../App';

describe('App', () => {
  it('renders layout inside provider', () => {
    render(<App />);
    expect(screen.getByTestId('provider')).toBeInTheDocument();
    expect(screen.getByText('header')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
