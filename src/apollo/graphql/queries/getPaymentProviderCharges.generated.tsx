/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPaymentProviderChargesQueryVariables = Types.Exact<{
  query: Types.PaymentProviderChargesInput;
}>;


export type GetPaymentProviderChargesQuery = { __typename?: 'Query', getPaymentProviderCharges?: { __typename?: 'PaymentProviderChargesOutput', charges?: number | null, netAmount?: number | null } | null };


export const GetPaymentProviderChargesDocument = gql`
    query getPaymentProviderCharges($query: PaymentProviderChargesInput!) {
  getPaymentProviderCharges(query: $query) {
    charges
    netAmount
  }
}
    `;

/**
 * __useGetPaymentProviderChargesQuery__
 *
 * To run a query within a React component, call `useGetPaymentProviderChargesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentProviderChargesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentProviderChargesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetPaymentProviderChargesQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentProviderChargesQuery, GetPaymentProviderChargesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentProviderChargesQuery, GetPaymentProviderChargesQueryVariables>(GetPaymentProviderChargesDocument, options);
      }
export function useGetPaymentProviderChargesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentProviderChargesQuery, GetPaymentProviderChargesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentProviderChargesQuery, GetPaymentProviderChargesQueryVariables>(GetPaymentProviderChargesDocument, options);
        }
export type GetPaymentProviderChargesQueryHookResult = ReturnType<typeof useGetPaymentProviderChargesQuery>;
export type GetPaymentProviderChargesLazyQueryHookResult = ReturnType<typeof useGetPaymentProviderChargesLazyQuery>;
export type GetPaymentProviderChargesQueryResult = Apollo.QueryResult<GetPaymentProviderChargesQuery, GetPaymentProviderChargesQueryVariables>;