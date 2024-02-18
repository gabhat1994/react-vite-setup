/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { AccountListOutputFragmentDoc } from '../fragments/accountListOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAccountByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetAccountByIdQuery = { __typename?: 'Query', getAccountById?: { __typename?: 'AccountListOutput', id: string, masterWalletId?: string | null, status?: string | null, customerName?: string | null, walletName?: string | null, balance?: number | null, paymentChannel?: Types.PaymentChannelsEnum | null, accountType?: Types.AccountType | null, accountName?: string | null, chamberId?: string | null, primary: boolean, maskAccountNumber?: string | null, createdAt?: string | null, updatedAt?: string | null, microDeposits?: Array<{ __typename?: 'VerifyMicroDeposit', id?: string | null, status?: string | null, amount1?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null, amount2?: { __typename?: 'CurrencyOutput', value: number, currency: Types.CurrencyEnum } | null } | null> | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, profileImage?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null, userId?: { __typename?: 'UserOutput', _id: string, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null } | null };


export const GetAccountByIdDocument = gql`
    query getAccountById($id: String!) {
  getAccountById(id: $id) {
    ...AccountListOutput
  }
}
    ${AccountListOutputFragmentDoc}`;

/**
 * __useGetAccountByIdQuery__
 *
 * To run a query within a React component, call `useGetAccountByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAccountByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAccountByIdQuery, GetAccountByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountByIdQuery, GetAccountByIdQueryVariables>(GetAccountByIdDocument, options);
      }
export function useGetAccountByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountByIdQuery, GetAccountByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountByIdQuery, GetAccountByIdQueryVariables>(GetAccountByIdDocument, options);
        }
export type GetAccountByIdQueryHookResult = ReturnType<typeof useGetAccountByIdQuery>;
export type GetAccountByIdLazyQueryHookResult = ReturnType<typeof useGetAccountByIdLazyQuery>;
export type GetAccountByIdQueryResult = Apollo.QueryResult<GetAccountByIdQuery, GetAccountByIdQueryVariables>;