import { useContext, useMemo, type FC } from 'react';
import { useGeniusStateService } from '../hooks/useGeniusStateService';
import {
  GeniusContext,
  type GeniusContextType,
  type GeniusResponseType,
} from './GeniusContext';

type GeniusContextProviderProps = {
  type: GeniusResponseType;
};

export const GeniusContextProvider: FC<GeniusContextProviderProps> = ({
  children,
  type,
}) => {
  const geniusState = useGeniusStateService();

  const value: GeniusContextType = useMemo(
    () => ({
      type,
      ...geniusState,
    }),
    [geniusState, type],
  );

  return (
    <GeniusContext.Provider value={value}>{children}</GeniusContext.Provider>
  );
};

export const useGeniusContext = () => {
  const context = useContext(GeniusContext);

  if (!context) {
    throw new Error(
      'useGeniusContext must be rendered within GeniusContext.Provider',
    );
  }

  return context;
};
