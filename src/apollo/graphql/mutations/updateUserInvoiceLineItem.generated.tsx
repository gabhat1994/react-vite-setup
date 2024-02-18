/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserInvoiceLineItemMutationVariables = Types.Exact<{
  _id: Types.Scalars['ID'];
  input: Types.UpdateInvoiceLineItemInput;
}>;


export type UpdateUserInvoiceLineItemMutation = { __typename?: 'Mutation', updateUserInvoiceLineItem?: { __typename?: 'InvoiceLineItem', description: string, quantity: number, unitPrice: number, taxRate?: number | null, taxLabel?: string | null, currency: Types.AllCurrencyEnum, amount: number } | null };


export const UpdateUserInvoiceLineItemDocument = gql`
    mutation updateUserInvoiceLineItem($_id: ID!, $input: UpdateInvoiceLineItemInput!) {
  updateUserInvoiceLineItem(_id: $_id, input: $input) {
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
export type UpdateUserInvoiceLineItemMutationFn = Apollo.MutationFunction<UpdateUserInvoiceLineItemMutation, UpdateUserInvoiceLineItemMutationVariables>;

/**
 * __useUpdateUserInvoiceLineItemMutation__
 *
 * To run a mutation, you first call `useUpdateUserInvoiceLineItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInvoiceLineItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInvoiceLineItemMutation, { data, loading, error }] = useUpdateUserInvoiceLineItemMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserInvoiceLineItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserInvoiceLineItemMutation, UpdateUserInvoiceLineItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserInvoiceLineItemMutation, UpdateUserInvoiceLineItemMutationVariables>(UpdateUserInvoiceLineItemDocument, options);
      }
export type UpdateUserInvoiceLineItemMutationHookResult = ReturnType<typeof useUpdateUserInvoiceLineItemMutation>;
export type UpdateUserInvoiceLineItemMutationResult = Apollo.MutationResult<UpdateUserInvoiceLineItemMutation>;
export type UpdateUserInvoiceLineItemMutationOptions = Apollo.BaseMutationOptions<UpdateUserInvoiceLineItemMutation, UpdateUserInvoiceLineItemMutationVariables>;