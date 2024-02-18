import { NoumLayoutStatusFilter } from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useNoumDetails } from '@/features/noums/hooks/noums';
import { SpaceUtils } from '@/utils/space';
import { initialValue } from './constants';
import { type IChamberContext } from './types';

const ChamberContext = createContext<IChamberContext>(initialValue);

interface ChamberProviderProps {
  noumId: string;
  noumLayoutStatus?: NoumLayoutStatusFilter;
  children: ReactNode;
}

export function ChamberProvider({
  noumId,
  noumLayoutStatus = NoumLayoutStatusFilter.Published,
  children,
}: ChamberProviderProps) {
  const { isActive: isUserActive, isPending: isUserPending } = useAuth();

  const {
    loading,
    loadingSpace,
    space,
    spaceConfig,
    refetchSpaceByConfig,
    refetchSpaceById,
    isOwner,
  } = useNoumDetails(noumId, noumLayoutStatus);

  const editDisabled = useMemo(() => {
    if (SpaceUtils.isMasterNoum(space)) {
      return !isUserActive && !isUserPending;
    }
    return !isUserActive;
  }, [isUserActive, isUserPending, space]);

  const value = useMemo<IChamberContext>(
    () => ({
      loading,
      loadingSpace,
      space,
      spaceConfig,
      isOwner,
      editDisabled,
      refetchSpaceByConfig,
      refetchSpaceById,
    }),
    [
      loading,
      loadingSpace,
      space,
      spaceConfig,
      isOwner,
      editDisabled,
      refetchSpaceByConfig,
      refetchSpaceById,
    ],
  );

  return (
    <ChamberContext.Provider value={value}>{children}</ChamberContext.Provider>
  );
}

export const useNoumContext = () => useContext(ChamberContext);
