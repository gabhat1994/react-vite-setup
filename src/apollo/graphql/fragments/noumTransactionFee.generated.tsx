/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type NoumSetupCounterFragment = { __typename?: 'SubscriptionOutput', subscription_id: number, counters?: { __typename?: 'SubSettingCountersOutput', noumSetup: { __typename?: 'SubSettingCounterOptionsOutput', current: number } } | null };

export type NoumTransactionFragment = { __typename?: 'NoumTransactionFee', valid_till?: string | null, noum_transaction_fee_id?: number | null, is_publishable?: boolean | null, status?: Types.Status_Noum | null, subscription_id?: { __typename?: 'SubscriptionOutput', subscription_id: number, counters?: { __typename?: 'SubSettingCountersOutput', noumSetup: { __typename?: 'SubSettingCounterOptionsOutput', current: number } } | null } | null, chamber_id?: { __typename?: 'ChamberByIdRef', _id: string, type?: string | null, name?: string | null, profileImage?: string | null } | null };

export const NoumSetupCounterFragmentDoc = gql`
    fragment NoumSetupCounter on SubscriptionOutput {
  subscription_id
  counters {
    noumSetup {
      current
    }
  }
}
    `;
export const NoumTransactionFragmentDoc = gql`
    fragment NoumTransaction on NoumTransactionFee {
  valid_till
  noum_transaction_fee_id
  subscription_id {
    ...NoumSetupCounter
  }
  is_publishable
  status
  chamber_id {
    _id
    type
    name
    profileImage
  }
}
    ${NoumSetupCounterFragmentDoc}`;