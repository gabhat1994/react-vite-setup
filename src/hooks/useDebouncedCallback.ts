import { debounce } from 'lodash';
import { useLayoutEffect, useMemo, useRef } from 'react';

export default function useDebouncedCallback<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any[]) => any,
>(callback: T, delay: number) {
  const callbackRef = useRef<T>(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(() => debounce(callbackRef.current, delay), [delay]);
}
