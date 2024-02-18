/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetInvoiceSequenceQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type GetInvoiceSequenceQuery = { __typename?: 'Query', getInvoiceSequence: { __typename?: 'InvoiceSequenceOutput', _id?: string | null, sequence: string, noumId?: string | null } };


export const GetInvoiceSequenceDocument = gql`
    query getInvoiceSequence($noumId: ID!) {
  getInvoiceSequence(noumId: $noumId) {
    _id
    sequence
    noumId
  }
}
    `;

/**
 * __useGetInvoiceSequenceQuery__
 *
 * To run a query within a React component, call `useGetInvoiceSequenceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceSequenceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceSequenceQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useGetInvoiceSequenceQuery(baseOptions: Apollo.QueryHookOptions<GetInvoiceSequenceQuery, GetInvoiceSequenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoiceSequenceQuery, GetInvoiceSequenceQueryVariables>(GetInvoiceSequenceDocument, options);
      }
export function useGetInvoiceSequenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoiceSequenceQuery, GetInvoiceSequenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoiceSequenceQuery, GetInvoiceSequenceQueryVariables>(GetInvoiceSequenceDocument, options);
        }
export type GetInvoiceSequenceQueryHookResult = ReturnType<typeof useGetInvoiceSequenceQuery>;
export type GetInvoiceSequenceLazyQueryHookResult = ReturnType<typeof useGetInvoiceSequenceLazyQuery>;
export type GetInvoiceSequenceQueryResult = Apollo.QueryResult<GetInvoiceSequenceQuery, GetInvoiceSequenceQueryVariables>;