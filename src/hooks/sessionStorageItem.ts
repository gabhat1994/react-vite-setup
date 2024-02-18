import { useCallback, useState } from 'react';
import { getSessionStorage, setSessionStorage } from '@/utils/sessionStorage';
import type SessionStorageKey from '@/constants/sessionStorage';

type Key = keyof typeof SessionStorageKey;

export function useSessionStorageItem<T>(key: Key, defaultValue?: T) {
  const [value, setValue] = useState<T>(
    () => getSessionStorage(key) ?? defaultValue,
  );

  const update = useCallback(
    (newValue: T) => {
      setValue(newValue);
      setSessionStorage(key, newValue);
    },
    [key],
  );

  return [value, update] as const;
}
