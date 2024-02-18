import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from 'react';

interface ISessionContext {
  setIsIdleStateAllowed: Dispatch<SetStateAction<boolean>>;
}

export const SessionContext = createContext<ISessionContext>({
  setIsIdleStateAllowed: () => {},
});

export function useSessionContext() {
  return useContext(SessionContext);
}
