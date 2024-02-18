/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type TokenFragment = { __typename?: 'Token', _id: string, count: number };

export type TokenTransactionFragment = { __typename?: 'TokenTransaction', chamberId: string, data?: Array<{ __typename?: 'TokenTransactionType', count?: number | null, activityType?: string | null, message?: string | null, createdAt?: any | null, id?: string | null } | null> | null };

export type TokenTransactionTypeFragment = { __typename?: 'TokenTransactionType', count?: number | null, activityType?: string | null, message?: string | null, createdAt?: any | null, id?: string | null };

export const TokenFragmentDoc = gql`
    fragment Token on Token {
  _id
  count
}
    `;
export const TokenTransactionTypeFragmentDoc = gql`
    fragment TokenTransactionType on TokenTransactionType {
  count
  activityType
  message
  createdAt
  id
}
    `;
export const TokenTransactionFragmentDoc = gql`
    fragment TokenTransaction on TokenTransaction {
  chamberId
  data {
    ...TokenTransactionType
  }
}
    ${TokenTransactionTypeFragmentDoc}`;