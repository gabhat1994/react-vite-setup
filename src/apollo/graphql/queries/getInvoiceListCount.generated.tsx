/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetInvoiceListCountQueryVariables = Types.Exact<{
  filter: Types.InvoiceQueryInput;
}>;


export type GetInvoiceListCountQuery = { __typename?: 'Query', getInvoiceList?: { __typename?: 'InvoiceList', count: number } | null };


export const GetInvoiceListCountDocument = gql`
    query getInvoiceListCount($filter: InvoiceQueryInput!) {
  getInvoiceList(filter: $filter) {
    count
  }
}
    `;

/**
 * __useGetInvoiceListCountQuery__
 *
 * To run a query within a React component, call `useGetInvoiceListCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceListCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceListCountQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetInvoiceListCountQuery(baseOptions: Apollo.QueryHookOptions<GetInvoiceListCountQuery, GetInvoiceListCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoiceListCountQuery, GetInvoiceListCountQueryVariables>(GetInvoiceListCountDocument, options);
      }
export function useGetInvoiceListCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoiceListCountQuery, GetInvoiceListCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoiceListCountQuery, GetInvoiceListCountQueryVariables>(GetInvoiceListCountDocument, options);
        }
export type GetInvoiceListCountQueryHookResult = ReturnType<typeof useGetInvoiceListCountQuery>;
export type GetInvoiceListCountLazyQueryHookResult = ReturnType<typeof useGetInvoiceListCountLazyQuery>;
export type GetInvoiceListCountQueryResult = Apollo.QueryResult<GetInvoiceListCountQuery, GetInvoiceListCountQueryVariables>;