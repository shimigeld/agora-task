import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('main bootstrap', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    vi.resetModules();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    vi.doUnmock('react-dom/client');
    document.body.innerHTML = '';
  });

  it('creates a root and renders the app tree', async () => {
    const renderMock = vi.fn();
    const createRootMock = vi.fn(() => ({ render: renderMock }));

    vi.doMock('react-dom/client', () => ({
      createRoot: createRootMock,
    }));

    await import('../main');

    const rootElement = document.getElementById('root');
    expect(createRootMock).toHaveBeenCalledWith(rootElement);
    expect(renderMock).toHaveBeenCalledTimes(1);
  });
});
