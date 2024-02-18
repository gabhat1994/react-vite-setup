import {
  createContext,
  useContext,
  useMemo,
  type FC,
  type ReactNode,
} from 'react';
import { type SocialLink } from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
import { cleanList } from '@/utils/list';

type INetworkElementContext = {
  networks: SocialLink[];
};

const initialValue: INetworkElementContext = {
  networks: [],
};

const NetworkElementContext =
  createContext<INetworkElementContext>(initialValue);

export const NetworkElementProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { user } = useAuth();
  const networks = useMemo(() => cleanList(user?.profile?.socialLinks), [user]);

  const value = useMemo(
    () => ({
      networks,
    }),
    [networks],
  );

  return (
    <NetworkElementContext.Provider value={value}>
      {children}
    </NetworkElementContext.Provider>
  );
};

export const useNetworkElement = () => {
  const value = useContext(NetworkElementContext);

  return value;
};
