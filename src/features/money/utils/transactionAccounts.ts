import { AccountType } from '@/apollo/generated/types';
import { type AccountDetailsOfTransactionFragment } from '@/apollo/graphql/fragments/transactions.generated';
import { type AccountListOutputFragment } from '@/apollo/graphql';

export const TransactionAccountsUtil = {
  isWallet: (
    account?:
      | AccountDetailsOfTransactionFragment
      | AccountListOutputFragment
      | null,
  ) => account?.accountType === AccountType.Wallet,

  isMainWallet: (
    account?:
      | AccountDetailsOfTransactionFragment
      | AccountListOutputFragment
      | null,
  ) => account?.accountType === AccountType.Wallet && !account?.chamber,

  isSubWallet: (
    account?:
      | AccountDetailsOfTransactionFragment
      | AccountListOutputFragment
      | null,
  ) => account?.accountType === AccountType.Wallet && !!account?.chamber,

  isBank: (
    account?:
      | AccountDetailsOfTransactionFragment
      | AccountListOutputFragment
      | null,
  ) => account?.accountType === AccountType.Bank,

  isCard: (account?: AccountDetailsOfTransactionFragment | null) =>
    account?.accountType === AccountType.Card,
};
