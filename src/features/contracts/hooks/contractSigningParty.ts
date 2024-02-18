import { type Maybe } from '@/apollo/generated/types';
import { type NoumContactBasicFragment } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';

type ContractSigneeType = 'buyer' | 'seller';

interface ContractSigningParty {
  signeeType: ContractSigneeType | null;
  signee: NoumContactBasicFragment | null;
}

interface ContractType {
  buyer?: Maybe<NoumContactBasicFragment> | undefined;
  seller?: Maybe<NoumContactBasicFragment> | undefined;
}

export function useContractSigningParty(
  contract: ContractType | null,
): ContractSigningParty {
  const { user } = useAuth();

  if (contract?.buyer && contract.buyer?.userId._id === user?._id) {
    return {
      signeeType: 'buyer',
      signee: contract.buyer,
    };
  }

  if (contract?.seller && contract.seller.userId._id === user?._id) {
    return {
      signeeType: 'seller',
      signee: contract.seller,
    };
  }

  return {
    signeeType: null,
    signee: null,
  };
}
