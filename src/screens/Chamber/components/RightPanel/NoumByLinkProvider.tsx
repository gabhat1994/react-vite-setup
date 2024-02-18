import {
  useGetNoumLinkByNoumIdQuery,
  type GetNoumLinkByNoumIdQuery,
} from '@/apollo/graphql';
import {
  createContext,
  useContext,
  useMemo,
  type FC,
  type ReactNode,
} from 'react';

const initialValue = {
  noumLinkData: {} as GetNoumLinkByNoumIdQuery,
  refetch: () => {},
  loadingLinked: false,
};

const NoumByLinkContext = createContext<{
  noumLinkData: GetNoumLinkByNoumIdQuery | undefined;
  refetch: () => void;
  loadingLinked: boolean;
}>(initialValue);

export const NoumByLinkProvider: FC<{
  children: ReactNode;
  spaceId?: string;
}> = ({ children, spaceId }) => {
  const {
    loading: loadingLinked,
    data: noumLinkData,
    refetch,
  } = useGetNoumLinkByNoumIdQuery({
    variables: {
      noumId: spaceId || '',
    },
    fetchPolicy: 'cache-and-network',
    skip: !spaceId,
  });

  const value = useMemo(
    () => ({
      noumLinkData,
      loadingLinked,
      refetch,
    }),
    [noumLinkData, loadingLinked, refetch],
  );

  return (
    <NoumByLinkContext.Provider value={value}>
      {children}
    </NoumByLinkContext.Provider>
  );
};

export const useGetNoumByLinkContext = () => useContext(NoumByLinkContext);
