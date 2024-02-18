/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RaiseInvoicePaymentMutationVariables = Types.Exact<{
  input: Types.RaiseInvoicePaymentInput;
}>;


export type RaiseInvoicePaymentMutation = { __typename?: 'Mutation', raiseInvoicePayment?: { __typename?: 'RaisePaymentOutput', id?: string | null, paymentId?: string | null, clientSecret?: string | null } | null };


export const RaiseInvoicePaymentDocument = gql`
    mutation raiseInvoicePayment($input: RaiseInvoicePaymentInput!) {
  raiseInvoicePayment(input: $input) {
    id
    paymentId
    clientSecret
  }
}
    `;
export type RaiseInvoicePaymentMutationFn = Apollo.MutationFunction<RaiseInvoicePaymentMutation, RaiseInvoicePaymentMutationVariables>;

/**
 * __useRaiseInvoicePaymentMutation__
 *
 * To run a mutation, you first call `useRaiseInvoicePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRaiseInvoicePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [raiseInvoicePaymentMutation, { data, loading, error }] = useRaiseInvoicePaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRaiseInvoicePaymentMutation(baseOptions?: Apollo.MutationHookOptions<RaiseInvoicePaymentMutation, RaiseInvoicePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RaiseInvoicePaymentMutation, RaiseInvoicePaymentMutationVariables>(RaiseInvoicePaymentDocument, options);
      }
export type RaiseInvoicePaymentMutationHookResult = ReturnType<typeof useRaiseInvoicePaymentMutation>;
export type RaiseInvoicePaymentMutationResult = Apollo.MutationResult<RaiseInvoicePaymentMutation>;
export type RaiseInvoicePaymentMutationOptions = Apollo.BaseMutationOptions<RaiseInvoicePaymentMutation, RaiseInvoicePaymentMutationVariables>;