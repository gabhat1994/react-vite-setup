/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SaveCardStripeMutationVariables = Types.Exact<{
  paymentId: Types.Scalars['String'];
}>;


export type SaveCardStripeMutation = { __typename?: 'Mutation', saveCardStripe?: { __typename?: 'StripeCardOutput', id?: string | null, brand?: string | null, last4?: string | null } | null };


export const SaveCardStripeDocument = gql`
    mutation saveCardStripe($paymentId: String!) {
  saveCardStripe(paymentId: $paymentId) {
    id
    brand
    last4
  }
}
    `;
export type SaveCardStripeMutationFn = Apollo.MutationFunction<SaveCardStripeMutation, SaveCardStripeMutationVariables>;

/**
 * __useSaveCardStripeMutation__
 *
 * To run a mutation, you first call `useSaveCardStripeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveCardStripeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCardStripeMutation, { data, loading, error }] = useSaveCardStripeMutation({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function useSaveCardStripeMutation(baseOptions?: Apollo.MutationHookOptions<SaveCardStripeMutation, SaveCardStripeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveCardStripeMutation, SaveCardStripeMutationVariables>(SaveCardStripeDocument, options);
      }
export type SaveCardStripeMutationHookResult = ReturnType<typeof useSaveCardStripeMutation>;
export type SaveCardStripeMutationResult = Apollo.MutationResult<SaveCardStripeMutation>;
export type SaveCardStripeMutationOptions = Apollo.BaseMutationOptions<SaveCardStripeMutation, SaveCardStripeMutationVariables>;