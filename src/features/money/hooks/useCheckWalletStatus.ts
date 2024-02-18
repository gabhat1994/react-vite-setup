import { KycNoumenaStatusEnum } from '@/apollo/generated/types';
import { useGetWalletQuery } from '@/apollo/graphql';

export const useCheckWalletStatus = () => {
  const { data } = useGetWalletQuery();

  const walletStatus =
    data?.getWalletBalance?.noumenaStatus === KycNoumenaStatusEnum.Approved;

  return {
    walletStatus,
  };
};
