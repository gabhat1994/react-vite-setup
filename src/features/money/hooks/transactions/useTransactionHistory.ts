import { useMemo } from 'react';

import { useTransactionsQuery } from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { useAuth } from '@/features/auth/contexts';

import { type PaymentFilter } from '@/apollo/generated/types';
import { TransactionUtil } from '../../utils';

type UseTransactionHistory = {
  filter: PaymentFilter;
  limit: number;
  page: number;
  skipQuery?: boolean;
};

export const useTransactionHistory = ({
  filter,
  limit,
  page,
  skipQuery,
}: UseTransactionHistory) => {
  const auth = useAuth();
  const loggedInUserId = auth?.user?._id || '';

  const { data, loading, refetch } = useTransactionsQuery({
    skip: skipQuery,
    fetchPolicy: 'cache-and-network',
    variables: { filter, limit, page },
  });

  const totalCount = data?.payments?.count || 0;

  const transactionsData = useMemo(
    () => cleanList(data?.payments?.data),
    [data],
  );

  const transactions = useMemo(
    () =>
      TransactionUtil.getAllTransactions({ transactionsData, loggedInUserId }),
    [loggedInUserId, transactionsData],
  );

  return {
    states: {
      loading,
    },

    data: {
      transactions,
      totalCount,
    },

    handlers: {
      refetch,
    },
  };
};
