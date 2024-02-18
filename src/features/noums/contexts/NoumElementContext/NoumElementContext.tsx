import { createContext, useContext } from 'react';

interface NoumElementContextValues {
  columnWidth?: number;
  isEditing: boolean;
}

export const NoumElementContext = createContext<NoumElementContextValues>({
  columnWidth: undefined,
  isEditing: false,
});

export function useNoumElement() {
  return useContext(NoumElementContext);
}
