import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const axiosModule = 'axios';

describe('httpClient', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.doUnmock(axiosModule);
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('creates an axios instance with the expected defaults', async () => {
    const createMock = vi.fn().mockReturnValue({ instance: true });

    vi.doMock(axiosModule, () => ({
      default: {
        create: createMock,
      },
    }));

    const { httpClient } = await import('../../lib/httpClient');

    expect(createMock).toHaveBeenCalledWith({
      baseURL: 'https://restcountries.com/v3.1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(httpClient).toEqual({ instance: true });
  });
});
