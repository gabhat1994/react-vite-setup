import { SpaceTypeEnum } from '@/apollo/generated/types';
import {
  type SpaceOutputFragment,
  useGetSpaceByTypeLazyQuery,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';

const NoumContext = createContext<{
  loading: boolean;
  masterNoum: SpaceOutputFragment | null;
  masterId: string | null;
}>({
  loading: false,
  masterNoum: null,
  masterId: null,
});

export const NoumProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { user } = useAuth();
  const [masterNoum, setMasterNoum] = useState<SpaceOutputFragment | null>(
    null,
  );
  const [getMasterNoum, { loading }] = useGetSpaceByTypeLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (response) => {
      if (response.getSpaceByType && response.getSpaceByType.length) {
        setMasterNoum(response.getSpaceByType[0]);
      }
    },
  });

  const masterId = useMemo(() => masterNoum?._id || '', [masterNoum]);
  const userId = useMemo(() => user?._id || '', [user]);
  const payload = useMemo(
    () => ({ masterId, masterNoum, loading }),
    [masterId, masterNoum, loading],
  );

  useEffect(() => {
    if (userId) {
      getMasterNoum({
        variables: { type: SpaceTypeEnum.Home },
      });
    }
  }, [userId, getMasterNoum]);

  return (
    <NoumContext.Provider value={payload}>{children}</NoumContext.Provider>
  );
};
