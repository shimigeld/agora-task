import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays updates until debounce interval passes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value), {
      initialProps: { value: 'cat' },
    });

    expect(result.current).toBe('cat');

    rerender({ value: 'dog' });
    expect(result.current).toBe('cat');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('dog');
  });
});
