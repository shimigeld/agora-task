import { useEffect, useState } from 'react';

/** Number of milliseconds to wait before emitting a new value. */
const SEARCH_DEBOUNCE_MS = 500;

/** Custom hook that returns a debounced copy of the given value */
export const useDebouncedValue = <T,>(value: T): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = window.setTimeout(() => setDebouncedValue(value), SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(handler);
  }, [value]);

  return debouncedValue;
};
