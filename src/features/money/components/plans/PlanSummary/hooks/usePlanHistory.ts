import { useGetAllSubscriptionsForUserQuery } from '@/apollo/graphql';
import { useError, useLaunchDarkly } from '@/hooks';
import { useCallback } from 'react';

export const usePlanHistory = () => {
  const { flags } = useLaunchDarkly();

  const { logError } = useError();

  const { data, loading, refetch } = useGetAllSubscriptionsForUserQuery({
    fetchPolicy: 'network-only',
    skip: !flags.paymentSubscriptions,
    variables: {},
    onError: (err) => {
      logError(err, 'GetAllSubscriptionsForUserQuery');
    },
  });

  const planHistory = data?.getAllSubscriptionsForUser || [];

  const noDataFound = (data?.getAllSubscriptionsForUser || []).length === 0;

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    refresh,
    planHistory,
    loading,
    noDataFound,
  };
};
