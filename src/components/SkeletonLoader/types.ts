import { type ReactNode } from 'react';

export interface SkeletonLoaderProviderProps {
  isLoading?: boolean;
  children: ReactNode;
}
