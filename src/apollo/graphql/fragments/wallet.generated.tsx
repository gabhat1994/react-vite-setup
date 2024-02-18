/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type CurrencyFragment = { __typename?: 'CurrencyData', value?: number | null, currency?: Types.CurrencyEnum | null };

export type WalletFragment = { __typename?: 'FundingSourceBalanceOutput', status: string, providerStatus?: string | null, noumenaStatus?: string | null, docStatus?: string | null, customerType?: string | null, balance?: { __typename?: 'CurrencyData', value?: number | null, currency?: Types.CurrencyEnum | null } | null, total?: { __typename?: 'CurrencyData', value?: number | null, currency?: Types.CurrencyEnum | null } | null };

export const CurrencyFragmentDoc = gql`
    fragment Currency on CurrencyData {
  value
  currency
}
    `;
export const WalletFragmentDoc = gql`
    fragment Wallet on FundingSourceBalanceOutput {
  status
  providerStatus
  noumenaStatus
  docStatus
  customerType
  balance {
    ...Currency
  }
  total {
    ...Currency
  }
}
    ${CurrencyFragmentDoc}`;