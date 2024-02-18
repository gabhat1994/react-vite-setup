import { useCallback, useEffect, useState } from 'react';
import { type ApolloQueryResult } from '@apollo/client';
import { type RequestedConnectionQuery } from '@/apollo/graphql';

type UseRequestedConnectionsInfiniteDataArgs = {
  pageSize: number;
  data?: RequestedConnectionQuery;
  fetchMore: (fetchMoreOptions: {
    variables: { offset: number; limit: number };
  }) => Promise<ApolloQueryResult<RequestedConnectionQuery>>;
};

const useRequestedConnectionsInfiniteData = ({
  fetchMore,
  pageSize,
  data,
}: UseRequestedConnectionsInfiniteDataArgs) => {
  const [infiniteData, setInfiniteData] = useState<
    RequestedConnectionQuery | undefined
  >(undefined);

  const [infiniteState, setInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');

  const infinityFetch = useCallback(async () => {
    if (!data?.requestedConnection?.data) return;

    const result = await fetchMore({
      variables: {
        limit: pageSize,
        offset: infiniteData?.requestedConnection?.data?.length || 0,
      },
    });
    if (result.data?.requestedConnection?.data) {
      const tempData = [
        ...(infiniteData?.requestedConnection?.data || []),
        ...result.data.requestedConnection.data,
      ];
      setInfiniteData({
        requestedConnection: {
          data: tempData,
        },
      });
    }
    if ((result.data?.requestedConnection?.data?.length || 0) < pageSize) {
      setInfiniteState('end');
    }
  }, [
    pageSize,
    setInfiniteData,
    data?.requestedConnection?.data,
    fetchMore,
    infiniteData?.requestedConnection?.data,
  ]);

  useEffect(() => {
    if (data?.requestedConnection?.data) {
      setInfiniteData(data);
      setInfiniteState(
        data?.requestedConnection?.data &&
          data?.requestedConnection?.data.length < pageSize
          ? 'end'
          : 'hasNextPage',
      );
    }
  }, [data, data?.requestedConnection?.data, pageSize, setInfiniteData]);

  return {
    infiniteData,
    infiniteState,
    infinityFetch,
  };
};

export default useRequestedConnectionsInfiniteData;
