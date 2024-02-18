import { createContext, useContext, useMemo } from 'react';
import { type SkeletonLoaderProviderProps } from '@/components/SkeletonLoader/types';

const initialValue = { isLoading: false };
const SkeletonIsLoadingContext = createContext(initialValue);

const SkeletonLoaderProvider = ({
  children,
  isLoading = false,
}: SkeletonLoaderProviderProps) => {
  const value = useMemo(
    () => ({
      isLoading,
    }),
    [isLoading],
  );

  return (
    <SkeletonIsLoadingContext.Provider value={value}>
      {children}
    </SkeletonIsLoadingContext.Provider>
  );
};

export default SkeletonLoaderProvider;

export const useSkeletonIsLoadingContext = () =>
  useContext(SkeletonIsLoadingContext);
