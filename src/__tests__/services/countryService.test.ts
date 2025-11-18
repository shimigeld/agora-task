import { describe, expect, it, vi, beforeEach } from 'vitest';
import { AxiosError } from 'axios';

vi.mock('../../lib/httpClient', () => ({
  httpClient: { get: vi.fn() },
}));

import { httpClient } from '../../lib/httpClient';
import { fetchCountries } from '../../services/countryService';

const mockGet = vi.mocked(httpClient.get);

beforeEach(() => {
  mockGet.mockReset();
});

describe('fetchCountries', () => {
  it('maps API data to domain model', async () => {
    mockGet.mockResolvedValue({
      data: [
        {
          cca3: 'CAN',
          name: { common: 'Canada', official: 'Canada' },
          capital: ['Ottawa'],
          population: 10,
          flags: { svg: 'flag.svg', png: 'flag.png', alt: 'Maple' },
        },
      ],
    });

    const result = await fetchCountries(' Canada ', undefined);
    expect(mockGet).toHaveBeenCalledWith('/name/Canada', expect.any(Object));
    expect(result[0]).toMatchObject({ name: 'Canada', capital: 'Ottawa' });
  });

  it('requests /all when the trimmed search term is empty', async () => {
    mockGet.mockResolvedValue({ data: [] });
    const controller = new AbortController();

    await fetchCountries('   ', controller.signal);

    expect(mockGet).toHaveBeenCalledWith('/all', {
      params: { fields: 'name,capital,flags,population,cca3' },
      signal: controller.signal,
    });
  });

  it('returns empty list on 404', async () => {
    mockGet.mockRejectedValue(
      new AxiosError('Not found', undefined, undefined, undefined, {
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config: {},
        data: null,
      } as any),
    );

    const result = await fetchCountries('missing');
    expect(result).toEqual([]);
  });

  it('rethrows unexpected errors', async () => {
    mockGet.mockRejectedValue(new Error('network'));
    await expect(fetchCountries('all')).rejects.toThrow('network');
  });

  it('falls back to png flags and default capital/alt text', async () => {
    mockGet.mockResolvedValue({
      data: [
        {
          cca3: 'PNG',
          name: { common: 'Placeholder', official: 'Placeholder' },
          population: 5,
          flags: { svg: '', png: 'flag.png' },
        },
      ],
    });

    const [country] = await fetchCountries('Placeholder');
    expect(country).toMatchObject({
      capital: 'N/A',
      flagUrl: 'flag.png',
      flagAlt: 'Placeholder flag',
    });
  });
});
