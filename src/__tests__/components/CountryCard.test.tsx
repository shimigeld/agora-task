import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CountryCard } from '../../components/CountryCard';

const country = {
  code: 'CAN',
  name: 'Canada',
  capital: 'Ottawa',
  population: 38000000,
  flagUrl: 'https://example.com/canada.svg',
  flagAlt: 'Canada flag',
};

describe('CountryCard', () => {
  it('renders country details', () => {
    render(<CountryCard country={country} />);

    expect(screen.getByRole('img', { name: /canada flag/i })).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.getByText(/Ottawa/)).toBeInTheDocument();
    expect(screen.getByText(/38,000,000 people/)).toBeInTheDocument();
  });
});
