import {
  type RequestedConnectionQueryVariables,
  useRequestedConnectionQuery,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';

export const useRequestedConnections = (
  variables?: RequestedConnectionQueryVariables,
) => {
  const { user } = useAuth();

  const { data, loading, refetch, fetchMore } = useRequestedConnectionQuery({
    variables,
    fetchPolicy: 'cache-and-network',
    skip: !user?._id,
  });

  return {
    data,
    loading,
    refetch,
    fetchMore,
  };
};
