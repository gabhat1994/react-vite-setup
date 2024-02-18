/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteInvoiceMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteInvoiceMutation = { __typename?: 'Mutation', deleteInvoice?: { __typename?: 'InvoiceOutput', id: string } | null };


export const DeleteInvoiceDocument = gql`
    mutation deleteInvoice($id: ID!) {
  deleteInvoice(id: $id) {
    id
  }
}
    `;
export type DeleteInvoiceMutationFn = Apollo.MutationFunction<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>;

/**
 * __useDeleteInvoiceMutation__
 *
 * To run a mutation, you first call `useDeleteInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInvoiceMutation, { data, loading, error }] = useDeleteInvoiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>(DeleteInvoiceDocument, options);
      }
export type DeleteInvoiceMutationHookResult = ReturnType<typeof useDeleteInvoiceMutation>;
export type DeleteInvoiceMutationResult = Apollo.MutationResult<DeleteInvoiceMutation>;
export type DeleteInvoiceMutationOptions = Apollo.BaseMutationOptions<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>;