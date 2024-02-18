import { type ReactNode, useMemo } from 'react';
import { NoumElementContext } from './NoumElementContext';

interface NoumElementProviderProps {
  children: ReactNode;
  columnWidth?: number;
  isEditing: boolean;
}

// Keep this provider clean, pass only generic values that can be used by any Noum Element.
export function NoumElementProvider({
  children,
  columnWidth,
  isEditing,
}: NoumElementProviderProps) {
  const value = useMemo(
    () => ({
      columnWidth,
      isEditing,
    }),
    [columnWidth, isEditing],
  );

  return (
    <NoumElementContext.Provider value={value}>
      {children}
    </NoumElementContext.Provider>
  );
}
