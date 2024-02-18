import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useGetNoumLinkConnectionsLazyQuery,
  useGetNoumLinkFollowersLazyQuery,
} from '@/apollo/graphql';
import { SortOperator, type SpaceOutputResponse } from '@/apollo/generated/types';
import { LinkedNoumEnum } from '../types';

export function useLinkDetailsHelper(
  noumLinkID: string | undefined,
  selectedValue: string,
) {
  const PAGE_SIZE = 10;

  const [
    getOwnNoumLinkFollowers,
    {
      data: dataFollowing,
      loading: loadingFollowing,
      error: errorFollowing,
      fetchMore: fetchMoreFollowing,
    },
  ] = useGetNoumLinkFollowersLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [
    getOwnNoumLinkConnections,
    {
      data: dataConnection,
      loading: loadingConnection,
      error: errorConnection,
      fetchMore: fetchMoreConnection,
    },
  ] = useGetNoumLinkConnectionsLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const loading = useMemo(
    () => loadingConnection || loadingFollowing,
    [loadingConnection, loadingFollowing],
  );

  const error = useMemo(
    () => errorFollowing || errorConnection,
    [errorConnection, errorFollowing],
  );

  const [connectionData, setConnectionData] = useState<
    SpaceOutputResponse['data'] | undefined
  >(undefined);

  const [followingData, setFollwoingData] = useState<
    SpaceOutputResponse['data'] | undefined
  >(undefined);

  const getInfiniteState = useCallback(
    (dataCount: number) => {
      setInfiniteState(
        !loading && dataCount < PAGE_SIZE ? 'end' : 'hasNextPage',
      );
    },
    [loading],
  );

  const currentLinkedNoums = useMemo(() => {
    switch (selectedValue) {
      case LinkedNoumEnum.Connection:
        return connectionData;
      case LinkedNoumEnum.Following:
        return followingData;
      default:
        return undefined;
    }
  }, [connectionData, followingData, selectedValue]);

  const [infiniteState, setInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');

  useEffect(() => {
    if (noumLinkID) {
      switch (selectedValue) {
        case LinkedNoumEnum.Connection:
          getOwnNoumLinkConnections({
            variables: {
              noumLinkId: noumLinkID,
              limit: PAGE_SIZE,
              offset: 0,
              sort: {
                column: 'approvedAt',
                operator: SortOperator.Asc,
              },
            },
          });
          break;
        case LinkedNoumEnum.Following:
          getOwnNoumLinkFollowers({
            variables: {
              noumLinkId: noumLinkID,
              limit: PAGE_SIZE,
              offset: 0,
              sort: {
                column: 'updatedAt',
                operator: SortOperator.Asc,
              },
            },
          });
          break;
        default:
          setInfiniteState('end');
          break;
      }
    }
  }, [
    getOwnNoumLinkConnections,
    getOwnNoumLinkFollowers,
    noumLinkID,
    selectedValue,
  ]);

  const fetchMore = useCallback(async () => {
    if (!noumLinkID || !selectedValue || !currentLinkedNoums) return;
    let result;
    switch (selectedValue) {
      case LinkedNoumEnum.Connection:
        result = await fetchMoreConnection({
          variables: {
            limit: PAGE_SIZE,
            offset: connectionData?.length || 0,
          },
        });
        if (result.data?.getNoumLinkConnections?.data) {
          const tempData = [
            ...(connectionData || []),
            ...result.data.getNoumLinkConnections.data,
          ];
          setConnectionData(tempData);
        }
        if ((result.data.getNoumLinkConnections?.data?.length || 0) < PAGE_SIZE)
          setInfiniteState('end');
        break;
      case LinkedNoumEnum.Following:
        result = await fetchMoreFollowing({
          variables: {
            limit: PAGE_SIZE,
            offset: followingData?.length || 0,
          },
        });
        if (result.data?.getNoumLinkFollowers?.data) {
          const tempData = [
            ...(followingData || []),
            ...result.data.getNoumLinkFollowers.data,
          ];
          setFollwoingData(tempData);
        }
        if ((result.data.getNoumLinkFollowers?.data?.length || 0) < PAGE_SIZE)
          setInfiniteState('end');
        break;
      default:
        setInfiniteState('end');
        break;
    }
  }, [
    connectionData,
    currentLinkedNoums,
    fetchMoreConnection,
    fetchMoreFollowing,
    followingData,
    noumLinkID,
    selectedValue,
  ]);

  useEffect(() => {
    if (
      dataConnection?.getNoumLinkConnections?.data ||
      dataFollowing?.getNoumLinkFollowers?.data
    ) {
      if (selectedValue === LinkedNoumEnum.Connection) {
        setConnectionData(dataConnection?.getNoumLinkConnections?.data);
        getInfiniteState(
          dataConnection?.getNoumLinkConnections?.data?.length || 0,
        );
      } else if (selectedValue === LinkedNoumEnum.Following) {
        setFollwoingData(dataFollowing?.getNoumLinkFollowers?.data);
        getInfiniteState(
          dataFollowing?.getNoumLinkFollowers?.data?.length || 0,
        );
      }
    }
  }, [
    dataConnection?.getNoumLinkConnections?.data,
    dataFollowing?.getNoumLinkFollowers?.data,
    getInfiniteState,
    selectedValue,
  ]);

  return {
    currentLinkedNoums,
    infiniteState,
    fetchMore,
    loading,
    error,
  };
}
