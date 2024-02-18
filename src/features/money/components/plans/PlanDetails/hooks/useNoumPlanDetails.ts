import { useCallback } from 'react';
import { useGetNoumTransactionFeeDetailsQuery } from '@/apollo/graphql';
import {
  Status_Noum,
  type NoumTransactionDetailInputType,
} from '@/apollo/generated/types';
import { useError } from '@/hooks/useError';
import { useLaunchDarkly } from '@/hooks/launchDarkly';

export const useNoumPlanDetails = (filter: NoumTransactionDetailInputType) => {
  const { logError } = useError();
  const { flags } = useLaunchDarkly();
  const { data, refetch, loading } = useGetNoumTransactionFeeDetailsQuery({
    fetchPolicy: 'network-only',
    skip: !flags.paymentSubscriptions,
    variables: {
      noumDetailInput: { ...filter, status: Status_Noum.Active },
    },
    onError: (err) => {
      logError(err, 'gqlGetNoumTransactionFeeDetails');
    },
  });

  const noums = data?.getNoumTransactionFeeDetails || [];

  const noDataFound = (data?.getNoumTransactionFeeDetails || []).length === 0;

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    noums,
    noDataFound,
    refresh,
    loading,
  };
};

export default useNoumPlanDetails;
