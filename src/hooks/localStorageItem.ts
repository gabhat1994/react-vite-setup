import type accessLocalStorage from '@/constants/accessLocalStorage';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { useCallback, useEffect, useState } from 'react';

type Key = keyof typeof accessLocalStorage;

export function useLocalStorageItem<T>(key: Key, defaultValue?: T) {
  const [value, setValue] = useState<T>(
    () => getLocalStorage(key) ?? defaultValue,
  );

  const update = useCallback(
    (newValue: T) => {
      setValue(newValue);
      setLocalStorage(key, newValue);
    },
    [key],
  );

  useEffect(() => {
    const storedValue = getLocalStorage(key);
    if (storedValue === null && typeof defaultValue !== undefined) {
      update(defaultValue!);
    }
  }, [defaultValue, key, update, value]);

  return [value, update] as const;
}
