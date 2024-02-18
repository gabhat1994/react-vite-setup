/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { TokenFragmentDoc, TokenTransactionFragmentDoc } from '../fragments/token.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCleverTapUserQueryVariables = Types.Exact<{
  homeNoumId: Types.Scalars['ID'];
  referralProduct: Types.Scalars['String'];
}>;


export type GetCleverTapUserQuery = { __typename?: 'Query', space?: { __typename?: 'SpaceOutput', percentCompleted?: number | null, token?: { __typename?: 'Token', _id: string, count: number } | null } | null, referralEntry?: { __typename?: 'Referral', referralCode?: string | null } | null, cq?: { __typename?: 'CapitalquotientQueries', getNoumenaScore?: { __typename?: 'NoumenaScoreOutput', capitalQuotient?: string | null } | null } | null, wallets?: Array<{ __typename?: 'AccountListOutput', id: string }> | null };


export const GetCleverTapUserDocument = gql`
    query GetCleverTapUser($homeNoumId: ID!, $referralProduct: String!) {
  space: getSpaceById(id: $homeNoumId) {
    percentCompleted
    token {
      ...Token
    }
  }
  referralEntry: userReferralEntry(productKey: $referralProduct) {
    referralCode
  }
  cq: capitalquotient {
    getNoumenaScore {
      capitalQuotient
    }
  }
  wallets: getAccountList(
    query: {self: true, accountType: WALLET, limit: 100, page: 1}
  ) {
    id
  }
}
    ${TokenFragmentDoc}`;

/**
 * __useGetCleverTapUserQuery__
 *
 * To run a query within a React component, call `useGetCleverTapUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCleverTapUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCleverTapUserQuery({
 *   variables: {
 *      homeNoumId: // value for 'homeNoumId'
 *      referralProduct: // value for 'referralProduct'
 *   },
 * });
 */
export function useGetCleverTapUserQuery(baseOptions: Apollo.QueryHookOptions<GetCleverTapUserQuery, GetCleverTapUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCleverTapUserQuery, GetCleverTapUserQueryVariables>(GetCleverTapUserDocument, options);
      }
export function useGetCleverTapUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCleverTapUserQuery, GetCleverTapUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCleverTapUserQuery, GetCleverTapUserQueryVariables>(GetCleverTapUserDocument, options);
        }
export type GetCleverTapUserQueryHookResult = ReturnType<typeof useGetCleverTapUserQuery>;
export type GetCleverTapUserLazyQueryHookResult = ReturnType<typeof useGetCleverTapUserLazyQuery>;
export type GetCleverTapUserQueryResult = Apollo.QueryResult<GetCleverTapUserQuery, GetCleverTapUserQueryVariables>;