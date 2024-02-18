/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type CustomerPayeeListFragment = { __typename?: 'CustomerPayeeList', id: string, customerName: string, maskAccountNumber?: string | null, accountType?: Types.AccountType | null, subAccountType?: Types.SubAccountType | null, walletName?: string | null, accountId: string, chamberId?: string | null, userId?: { __typename?: 'UserOutput', _id: string, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null };

export const CustomerPayeeListFragmentDoc = gql`
    fragment CustomerPayeeList on CustomerPayeeList {
  id
  customerName
  maskAccountNumber
  accountType
  subAccountType
  walletName
  accountId
  chamberId
  userId {
    _id
    profile {
      _id
      profilePicture
    }
  }
}
    `;