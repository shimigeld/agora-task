import { useEffect, useState } from 'react';

/** Delay applied to rapid search input updates. */
const SEARCH_DEBOUNCE_MS = 500;

/**
 * Returns a debounced copy of the provided value, updating after inactivity.
 */
export const useDebouncedValue = <T,>(value: T): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = window.setTimeout(() => setDebouncedValue(value), SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(handler);
  }, [value]);

  return debouncedValue;
};
