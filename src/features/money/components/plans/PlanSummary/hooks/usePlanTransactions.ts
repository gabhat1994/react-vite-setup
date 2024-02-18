import { useGetAllInvoicesQuery } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { useError, useLaunchDarkly } from '@/hooks';
import { useCallback, useState } from 'react';

const PAGE_LIMIT = 10;

export type TInvoiceFilters = {
  date_from: string;
  date_to: string;
  subscriptionId: string | null;
};

export const usePlanTransactions = (filter: TInvoiceFilters) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { flags } = useLaunchDarkly();
  const { user } = useAuth();
  const { logError } = useError();
  const { data, loading, refetch } = useGetAllInvoicesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      input: {
        filters: {
          date_from: filter.date_from,
          date_to: filter.date_to,
          uid: user?._id,
          subscription_id: filter.subscriptionId
            ? Number(filter.subscriptionId)
            : undefined,
        },
        limit: PAGE_LIMIT,
        offset: pageNumber === 1 ? 0 : pageNumber,
      },
    },
    skip: !flags.paymentSubscriptions,
    onError: (err) => {
      logError(err, 'GetAllInvoicesQuery');
    },
  });

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  const planTransactions = data?.getAllInvoices.data || [];

  const planTransactionsCount = data?.getAllInvoices.count || 0;

  return {
    planTransactions,
    refresh,
    planTransactionsCount,
    loading,
    handlePageChange,
    pageNumber,
  };
};
