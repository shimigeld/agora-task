import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Loader } from '../../components/Loader';

describe('Loader', () => {
  it('shows loading indicator', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/loading countries/i)).toBeInTheDocument();
  });
});
