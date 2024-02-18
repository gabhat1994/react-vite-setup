import { usePaymentsQuery } from '@/apollo/graphql/queries/getTransactions.generated';
import { type PaymentFilter } from '@/apollo/generated/types';

type UseTransactionsOptions = {
  filter: PaymentFilter;
  limit: number;
  page: number;
  disabled?: boolean;
};

export const useTransactions = ({
  filter,
  limit,
  page,
  disabled,
}: UseTransactionsOptions) => {
  const { data, loading, refetch } = usePaymentsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      filter,
      limit,
      page,
    },
    skip: disabled,
  });

  return {
    transactionData: {
      data: data?.payments?.data || [],
      totalCount: data?.payments?.count || 0,
      loading,
    },
    refresh: refetch,
  };
};
