import { useEffect, useState } from 'react';

/**
 * A type-safe hook that delays updating a value until a specified timeout has elapsed.
 * Used to throttle high-frequency events like text inputs and search queries.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay budget expires
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Memory reclamation pass: clear the timeout if value changes before delay finishes.
    // This cancels the previous pending update, preventing rapid UI recalculations.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}