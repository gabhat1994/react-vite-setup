import { useEffect } from 'react';
import {
  type ReceivedConnectionRequestQueryVariables,
  useReceivedConnectionRequestLazyQuery,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';

export const useReceivedConnections = (
  variables?: ReceivedConnectionRequestQueryVariables,
  isOwner: boolean = true,
) => {
  const { user } = useAuth();

  const [getReceivedConnections, { data, loading, refetch, fetchMore }] =
    useReceivedConnectionRequestLazyQuery({
      variables,
      fetchPolicy: 'cache-and-network',
    });

  useEffect(() => {
    if (user?._id && isOwner) {
      getReceivedConnections();
    }
  }, [user, getReceivedConnections, isOwner]);

  return {
    data,
    loading,
    refetch,
    fetchMore,
    getReceivedConnections,
  };
};
