/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateInvoicePaymentMutationVariables = Types.Exact<{
  input: Types.InvoicePaymentInput;
}>;


export type CreateInvoicePaymentMutation = { __typename?: 'Mutation', createInvoicePayment?: { __typename?: 'InvoicePaymentOutput', _id?: string | null } | null };


export const CreateInvoicePaymentDocument = gql`
    mutation createInvoicePayment($input: InvoicePaymentInput!) {
  createInvoicePayment(input: $input) {
    _id
  }
}
    `;
export type CreateInvoicePaymentMutationFn = Apollo.MutationFunction<CreateInvoicePaymentMutation, CreateInvoicePaymentMutationVariables>;

/**
 * __useCreateInvoicePaymentMutation__
 *
 * To run a mutation, you first call `useCreateInvoicePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvoicePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvoicePaymentMutation, { data, loading, error }] = useCreateInvoicePaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInvoicePaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreateInvoicePaymentMutation, CreateInvoicePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInvoicePaymentMutation, CreateInvoicePaymentMutationVariables>(CreateInvoicePaymentDocument, options);
      }
export type CreateInvoicePaymentMutationHookResult = ReturnType<typeof useCreateInvoicePaymentMutation>;
export type CreateInvoicePaymentMutationResult = Apollo.MutationResult<CreateInvoicePaymentMutation>;
export type CreateInvoicePaymentMutationOptions = Apollo.BaseMutationOptions<CreateInvoicePaymentMutation, CreateInvoicePaymentMutationVariables>;