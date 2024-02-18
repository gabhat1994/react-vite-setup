/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type UserDetailsOfTransactionFragment = { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null };

export type AccountDetailsOfTransactionFragment = { __typename?: 'TransferDetail', name?: string | null, accountType?: string | null, accountName?: string | null, maskNumber?: string | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, name?: string | null } | null };

export type TransactionsFragment = { __typename?: 'PaymentOutput', id?: string | null, amount?: number | null, charges?: number | null, netAmount?: number | null, createUserId?: string | null, updatedUserId?: string | null, transactionReason?: string | null, paymentDate?: string | null, currency?: string | null, createdAt?: string | null, paymentStatus?: string | null, paymentId?: string | null, sourceUser?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null, destinationUser?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null, sourceDetail?: { __typename?: 'TransferDetail', name?: string | null, accountType?: string | null, accountName?: string | null, maskNumber?: string | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, name?: string | null } | null } | null, destinationDetail?: { __typename?: 'TransferDetail', name?: string | null, accountType?: string | null, accountName?: string | null, maskNumber?: string | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, name?: string | null } | null } | null };

export const UserDetailsOfTransactionFragmentDoc = gql`
    fragment UserDetailsOfTransaction on UserOutput {
  _id
  firstName
  lastName
  userStatus
  profile {
    _id
    profilePicture
  }
}
    `;
export const AccountDetailsOfTransactionFragmentDoc = gql`
    fragment AccountDetailsOfTransaction on TransferDetail {
  name
  accountType
  accountName
  maskNumber
  chamber {
    _id
    profileImage
    name
  }
}
    `;
export const TransactionsFragmentDoc = gql`
    fragment Transactions on PaymentOutput {
  id
  amount
  charges
  netAmount
  createUserId
  updatedUserId
  transactionReason
  paymentDate
  currency
  createdAt
  paymentStatus
  paymentId
  sourceUser {
    ...UserDetailsOfTransaction
  }
  destinationUser {
    ...UserDetailsOfTransaction
  }
  sourceDetail {
    ...AccountDetailsOfTransaction
  }
  destinationDetail {
    ...AccountDetailsOfTransaction
  }
}
    ${UserDetailsOfTransactionFragmentDoc}
${AccountDetailsOfTransactionFragmentDoc}`;