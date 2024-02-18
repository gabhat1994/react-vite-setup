import { createContext, useContext } from 'react';

import { type NoumAuthorizationContextValues } from './types';

export const NoumAuthorizationContext =
  createContext<NoumAuthorizationContextValues>({
    role: null,
    permissions: [],
    refetchNoumAuthorizationData: async () => {},
  });

export function useNoumAuthorizationContext() {
  const context = useContext(NoumAuthorizationContext);

  if (!context) {
    throw new Error(
      'useNoumAuthorizationContext must be called within NoumAuthorizationContext.',
    );
  }

  return context;
}
