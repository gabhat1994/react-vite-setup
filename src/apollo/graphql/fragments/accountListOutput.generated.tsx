/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type AccountListOutputFragment = { __typename?: 'AccountListOutput', id: string, masterWalletId?: string | null, status?: string | null, customerName?: string | null, walletName?: string | null, balance?: number | null, paymentChannel?: Types.PaymentChannelsEnum | null, accountType?: Types.AccountType | null, accountName?: string | null, chamberId?: string | null, primary: boolean, maskAccountNumber?: string | null, createdAt?: string | null, updatedAt?: string | null, microDeposits?: Array<{ __typename?: 'VerifyMicroDeposit', id?: string | null, status?: string | null, amount1?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null, amount2?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null } | null> | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null, userId?: { __typename?: 'UserOutput', _id: string, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null };

export type CurrencyOutputFragment = { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum };

export const CurrencyOutputFragmentDoc = gql`
    fragment CurrencyOutput on CurrencyOutput {
  value
  currency
}
    `;
export const AccountListOutputFragmentDoc = gql`
    fragment AccountListOutput on AccountListOutput {
  id
  masterWalletId
  status
  microDeposits {
    id
    amount1 {
      ...CurrencyOutput
    }
    amount2 {
      ...CurrencyOutput
    }
    status
  }
  customerName
  walletName
  balance
  paymentChannel
  accountType
  accountName
  chamberId
  chamber {
    _id
    profileImage
    uid {
      _id
    }
  }
  userId {
    _id
    profile {
      _id
      profilePicture
    }
  }
  primary
  maskAccountNumber
  createdAt
  updatedAt
}
    ${CurrencyOutputFragmentDoc}`;