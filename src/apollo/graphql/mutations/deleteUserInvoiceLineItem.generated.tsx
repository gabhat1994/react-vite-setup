/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteUserInvoiceLineItemMutationVariables = Types.Exact<{
  _id: Types.Scalars['ID'];
}>;


export type DeleteUserInvoiceLineItemMutation = { __typename?: 'Mutation', deleteUserInvoiceLineItem?: { __typename?: 'InvoiceLineItem', id: string, description: string, quantity: number, unitPrice: number, taxRate?: number | null, taxLabel?: string | null, currency: Types.AllCurrencyEnum, amount: number } | null };


export const DeleteUserInvoiceLineItemDocument = gql`
    mutation deleteUserInvoiceLineItem($_id: ID!) {
  deleteUserInvoiceLineItem(_id: $_id) {
    id
    description
    quantity
    unitPrice
    taxRate
    taxLabel
    currency
    amount
  }
}
    `;
export type DeleteUserInvoiceLineItemMutationFn = Apollo.MutationFunction<DeleteUserInvoiceLineItemMutation, DeleteUserInvoiceLineItemMutationVariables>;

/**
 * __useDeleteUserInvoiceLineItemMutation__
 *
 * To run a mutation, you first call `useDeleteUserInvoiceLineItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserInvoiceLineItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserInvoiceLineItemMutation, { data, loading, error }] = useDeleteUserInvoiceLineItemMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteUserInvoiceLineItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserInvoiceLineItemMutation, DeleteUserInvoiceLineItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserInvoiceLineItemMutation, DeleteUserInvoiceLineItemMutationVariables>(DeleteUserInvoiceLineItemDocument, options);
      }
export type DeleteUserInvoiceLineItemMutationHookResult = ReturnType<typeof useDeleteUserInvoiceLineItemMutation>;
export type DeleteUserInvoiceLineItemMutationResult = Apollo.MutationResult<DeleteUserInvoiceLineItemMutation>;
export type DeleteUserInvoiceLineItemMutationOptions = Apollo.BaseMutationOptions<DeleteUserInvoiceLineItemMutation, DeleteUserInvoiceLineItemMutationVariables>;