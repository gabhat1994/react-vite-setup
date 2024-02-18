/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { AccountListOutputFragmentDoc } from '../fragments/accountListOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckWalletExistDetailQueryVariables = Types.Exact<{
  sourceUserId: Types.Scalars['ID'];
  targetUserId: Types.Scalars['ID'];
  noumId: Types.Scalars['ID'];
  invoiceId?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type CheckWalletExistDetailQuery = { __typename?: 'Query', checkWalletExistDetail?: { __typename?: 'WalletExistDetailType', sourceWallet: boolean, targetWallet: boolean, sourceWalletDetail?: { __typename?: 'AccountListOutput', id: string, masterWalletId?: string | null, status?: string | null, customerName?: string | null, walletName?: string | null, balance?: number | null, paymentChannel?: Types.PaymentChannelsEnum | null, accountType?: Types.AccountType | null, accountName?: string | null, chamberId?: string | null, primary: boolean, maskAccountNumber?: string | null, createdAt?: string | null, updatedAt?: string | null, microDeposits?: Array<{ __typename?: 'VerifyMicroDeposit', id?: string | null, status?: string | null, amount1?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null, amount2?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null } | null> | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null, userId?: { __typename?: 'UserOutput', _id: string, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null } | null, targetWalletDetail?: Array<{ __typename?: 'AccountListOutput', id: string, masterWalletId?: string | null, status?: string | null, customerName?: string | null, walletName?: string | null, balance?: number | null, paymentChannel?: Types.PaymentChannelsEnum | null, accountType?: Types.AccountType | null, accountName?: string | null, chamberId?: string | null, primary: boolean, maskAccountNumber?: string | null, createdAt?: string | null, updatedAt?: string | null, microDeposits?: Array<{ __typename?: 'VerifyMicroDeposit', id?: string | null, status?: string | null, amount1?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null, amount2?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null } | null> | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null, userId?: { __typename?: 'UserOutput', _id: string, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null } | null> | null } | null };


export const CheckWalletExistDetailDocument = gql`
    query checkWalletExistDetail($sourceUserId: ID!, $targetUserId: ID!, $noumId: ID!, $invoiceId: ID) {
  checkWalletExistDetail(
    sourceUserId: $sourceUserId
    targetUserId: $targetUserId
    noumId: $noumId
    invoiceId: $invoiceId
  ) {
    sourceWallet
    targetWallet
    sourceWalletDetail {
      ...AccountListOutput
    }
    targetWalletDetail {
      ...AccountListOutput
    }
  }
}
    ${AccountListOutputFragmentDoc}`;

/**
 * __useCheckWalletExistDetailQuery__
 *
 * To run a query within a React component, call `useCheckWalletExistDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckWalletExistDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckWalletExistDetailQuery({
 *   variables: {
 *      sourceUserId: // value for 'sourceUserId'
 *      targetUserId: // value for 'targetUserId'
 *      noumId: // value for 'noumId'
 *      invoiceId: // value for 'invoiceId'
 *   },
 * });
 */
export function useCheckWalletExistDetailQuery(baseOptions: Apollo.QueryHookOptions<CheckWalletExistDetailQuery, CheckWalletExistDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckWalletExistDetailQuery, CheckWalletExistDetailQueryVariables>(CheckWalletExistDetailDocument, options);
      }
export function useCheckWalletExistDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckWalletExistDetailQuery, CheckWalletExistDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckWalletExistDetailQuery, CheckWalletExistDetailQueryVariables>(CheckWalletExistDetailDocument, options);
        }
export type CheckWalletExistDetailQueryHookResult = ReturnType<typeof useCheckWalletExistDetailQuery>;
export type CheckWalletExistDetailLazyQueryHookResult = ReturnType<typeof useCheckWalletExistDetailLazyQuery>;
export type CheckWalletExistDetailQueryResult = Apollo.QueryResult<CheckWalletExistDetailQuery, CheckWalletExistDetailQueryVariables>;