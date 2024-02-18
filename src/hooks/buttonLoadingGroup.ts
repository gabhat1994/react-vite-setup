import { useState } from 'react';

export function useButtonLoadingGroup<LoadingId extends string>() {
  const [loadingId, setLoadingId] = useState<LoadingId | null>(null);

  const getButtonProps = <Args extends unknown[], Returns extends unknown>({
    id,
    onClick,
  }: {
    id: LoadingId;
    onClick: (...args: Args) => Promise<Returns>;
  }) => ({
    id,
    onClick: async (...args: Args): Promise<Returns | void> => {
      setLoadingId(id);
      try {
        return await onClick(...args);
      } finally {
        setLoadingId(null);
      }
    },
    loading: loadingId === id,
    disabled: loadingId !== null && loadingId !== id,
  });

  return { getButtonProps };
}
