import {
  type UserDetailsOfTransactionFragment,
  type AccountDetailsOfTransactionFragment,
} from '@/apollo/graphql/fragments/transactions.generated';

import { type AccountListOutputFragment } from '@/apollo/graphql';

import UserProfile from '@/assets/images/profile_default.png';
import ChamberProfile from '@/assets/images/chamber_default.png';

export const AccountDetailsUtil = {
  getUserPicture: (user?: UserDetailsOfTransactionFragment | null) => {
    if (!user) return UserProfile;
    return user?.profile?.profilePicture || UserProfile;
  },

  getBank: (
    account?:
      | AccountDetailsOfTransactionFragment
      | AccountListOutputFragment
      | null,
  ) => {
    if (account?.__typename === 'TransferDetail') {
      return `${account?.accountName} ***${account?.maskNumber}`;
    }
    if (account?.__typename === 'AccountListOutput') {
      return `${account?.accountName} ***${account?.maskAccountNumber}`;
    }
    return '';
  },

  getCreditCard: (account?: AccountDetailsOfTransactionFragment | null) => {
    if (!account) return '';
    return `Credit Card ***${account?.maskNumber}`;
  },

  getSubWalletPicture: (
    account?: AccountDetailsOfTransactionFragment | null,
  ) => {
    if (!account) return ChamberProfile;
    return account?.chamber?.profileImage || ChamberProfile;
  },

  getSubWalletName: (account?: AccountDetailsOfTransactionFragment | null) => {
    if (!account) return '';
    return account?.chamber?.name;
  },

  getUserAndSubwalletName: (
    user?: UserDetailsOfTransactionFragment | null,
    account?: AccountDetailsOfTransactionFragment | null,
  ) => {
    if (!account || !user) return '';
    return `${user?.firstName} ${user?.lastName}'s ${account?.chamber?.name}`;
  },

  getOutsidePayeeName: (account?: AccountDetailsOfTransactionFragment | null) =>
    account?.name,

  getDefaultUserPicture: () => UserProfile,
};
