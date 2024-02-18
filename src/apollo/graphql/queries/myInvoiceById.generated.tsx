/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MyInvoiceByIdQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.SelectedInvoiceInput>;
}>;


export type MyInvoiceByIdQuery = { __typename?: 'Query', getSelectedInvoiceDetails: Array<{ __typename?: 'InvoiceDetail', linked_payments?: Array<{ __typename?: 'LinkedPaymentOutput', txn_status?: string | null }> | null }> };


export const MyInvoiceByIdDocument = gql`
    query myInvoiceById($input: SelectedInvoiceInput) {
  getSelectedInvoiceDetails(input: $input) {
    linked_payments {
      txn_status
    }
  }
}
    `;

/**
 * __useMyInvoiceByIdQuery__
 *
 * To run a query within a React component, call `useMyInvoiceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyInvoiceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyInvoiceByIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMyInvoiceByIdQuery(baseOptions?: Apollo.QueryHookOptions<MyInvoiceByIdQuery, MyInvoiceByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyInvoiceByIdQuery, MyInvoiceByIdQueryVariables>(MyInvoiceByIdDocument, options);
      }
export function useMyInvoiceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyInvoiceByIdQuery, MyInvoiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyInvoiceByIdQuery, MyInvoiceByIdQueryVariables>(MyInvoiceByIdDocument, options);
        }
export type MyInvoiceByIdQueryHookResult = ReturnType<typeof useMyInvoiceByIdQuery>;
export type MyInvoiceByIdLazyQueryHookResult = ReturnType<typeof useMyInvoiceByIdLazyQuery>;
export type MyInvoiceByIdQueryResult = Apollo.QueryResult<MyInvoiceByIdQuery, MyInvoiceByIdQueryVariables>;