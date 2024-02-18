/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ValidateInvoiceSequenceQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  sequence: Types.Scalars['String'];
  invoiceId?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type ValidateInvoiceSequenceQuery = { __typename?: 'Query', validateInvoiceSequence: { __typename?: 'ValidateInvoiceSequenceOutput', success: boolean, message?: string | null } };


export const ValidateInvoiceSequenceDocument = gql`
    query validateInvoiceSequence($noumId: ID!, $sequence: String!, $invoiceId: ID) {
  validateInvoiceSequence(
    noumId: $noumId
    sequence: $sequence
    invoiceId: $invoiceId
  ) {
    success
    message
  }
}
    `;

/**
 * __useValidateInvoiceSequenceQuery__
 *
 * To run a query within a React component, call `useValidateInvoiceSequenceQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateInvoiceSequenceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateInvoiceSequenceQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      sequence: // value for 'sequence'
 *      invoiceId: // value for 'invoiceId'
 *   },
 * });
 */
export function useValidateInvoiceSequenceQuery(baseOptions: Apollo.QueryHookOptions<ValidateInvoiceSequenceQuery, ValidateInvoiceSequenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateInvoiceSequenceQuery, ValidateInvoiceSequenceQueryVariables>(ValidateInvoiceSequenceDocument, options);
      }
export function useValidateInvoiceSequenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateInvoiceSequenceQuery, ValidateInvoiceSequenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateInvoiceSequenceQuery, ValidateInvoiceSequenceQueryVariables>(ValidateInvoiceSequenceDocument, options);
        }
export type ValidateInvoiceSequenceQueryHookResult = ReturnType<typeof useValidateInvoiceSequenceQuery>;
export type ValidateInvoiceSequenceLazyQueryHookResult = ReturnType<typeof useValidateInvoiceSequenceLazyQuery>;
export type ValidateInvoiceSequenceQueryResult = Apollo.QueryResult<ValidateInvoiceSequenceQuery, ValidateInvoiceSequenceQueryVariables>;