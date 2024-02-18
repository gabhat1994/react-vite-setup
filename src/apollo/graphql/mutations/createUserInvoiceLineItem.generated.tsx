/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateUserInvoiceLineItemMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.InvoiceLineItemInput>;
}>;


export type CreateUserInvoiceLineItemMutation = { __typename?: 'Mutation', createUserInvoiceLineItem?: { __typename?: 'InvoiceLineItem', id: string, description: string, quantity: number, unitPrice: number, taxRate?: number | null, taxLabel?: string | null, currency: Types.AllCurrencyEnum, amount: number } | null };


export const CreateUserInvoiceLineItemDocument = gql`
    mutation createUserInvoiceLineItem($input: InvoiceLineItemInput) {
  createUserInvoiceLineItem(input: $input) {
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
export type CreateUserInvoiceLineItemMutationFn = Apollo.MutationFunction<CreateUserInvoiceLineItemMutation, CreateUserInvoiceLineItemMutationVariables>;

/**
 * __useCreateUserInvoiceLineItemMutation__
 *
 * To run a mutation, you first call `useCreateUserInvoiceLineItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserInvoiceLineItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserInvoiceLineItemMutation, { data, loading, error }] = useCreateUserInvoiceLineItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserInvoiceLineItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserInvoiceLineItemMutation, CreateUserInvoiceLineItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserInvoiceLineItemMutation, CreateUserInvoiceLineItemMutationVariables>(CreateUserInvoiceLineItemDocument, options);
      }
export type CreateUserInvoiceLineItemMutationHookResult = ReturnType<typeof useCreateUserInvoiceLineItemMutation>;
export type CreateUserInvoiceLineItemMutationResult = Apollo.MutationResult<CreateUserInvoiceLineItemMutation>;
export type CreateUserInvoiceLineItemMutationOptions = Apollo.BaseMutationOptions<CreateUserInvoiceLineItemMutation, CreateUserInvoiceLineItemMutationVariables>;