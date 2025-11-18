import { render, screen } from '@testing-library/react';
import { useQueryClient } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';
import { AppProviders } from '../../providers/AppProviders';

const Probe = () => {
  const client = useQueryClient();
  return <div>{client ? 'client-ready' : 'missing'}</div>;
};

describe('AppProviders', () => {
  it('renders children within providers', () => {
    render(
      <AppProviders>
        <Probe />
      </AppProviders>,
    );

    expect(screen.getByText('client-ready')).toBeInTheDocument();
  });
});
