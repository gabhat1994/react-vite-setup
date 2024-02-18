import { useCallback, useState } from 'react';

function useLoadingCallback<Args extends unknown[], Returns extends unknown>(
  callback?: (...args: Args) => Promise<Returns>,
) {
  const [loading, setLoading] = useState(false);

  const wrappedCallback = useCallback(
    async (...args: Args): Promise<Returns | void> => {
      setLoading(true);
      try {
        return await callback?.(...args);
      } finally {
        setLoading(false);
      }
    },
    [callback],
  );

  return [wrappedCallback, loading] as const;
}

export default useLoadingCallback;
