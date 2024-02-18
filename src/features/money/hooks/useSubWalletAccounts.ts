import { useGetSubWalletBalanceQuery } from '@/apollo/graphql/queries/paymentAccounts.generated';
import { ElementStatusEnum } from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';

export const useSubWalletAccounts = (spaceId: string, walletStatus: string) => {
  const { isUnregistered } = useAuth();

  const { data, loading, refetch } = useGetSubWalletBalanceQuery({
    variables: {
      chamberId: spaceId,
    },
    skip: isUnregistered || walletStatus !== ElementStatusEnum.Published,
  });

  return {
    subWalletData: {
      subWalletBalance: data?.getSubWalletBalance?.amount,
      id: data?.getSubWalletBalance?.id,
      loading,
    },
    refetch,
  };
};
