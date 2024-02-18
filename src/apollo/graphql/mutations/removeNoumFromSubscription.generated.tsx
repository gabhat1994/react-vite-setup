/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveNoumFromSubscriptionMutationVariables = Types.Exact<{
  noumInput: Types.NoumTransactionInputType;
}>;


export type RemoveNoumFromSubscriptionMutation = { __typename?: 'Mutation', addRemoveNoumSubscription: { __typename?: 'NoumTransactionFee', status?: Types.Status_Noum | null } };


export const RemoveNoumFromSubscriptionDocument = gql`
    mutation removeNoumFromSubscription($noumInput: NoumTransactionInputType!) {
  addRemoveNoumSubscription(noumInput: $noumInput) {
    status
  }
}
    `;
export type RemoveNoumFromSubscriptionMutationFn = Apollo.MutationFunction<RemoveNoumFromSubscriptionMutation, RemoveNoumFromSubscriptionMutationVariables>;

/**
 * __useRemoveNoumFromSubscriptionMutation__
 *
 * To run a mutation, you first call `useRemoveNoumFromSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveNoumFromSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeNoumFromSubscriptionMutation, { data, loading, error }] = useRemoveNoumFromSubscriptionMutation({
 *   variables: {
 *      noumInput: // value for 'noumInput'
 *   },
 * });
 */
export function useRemoveNoumFromSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveNoumFromSubscriptionMutation, RemoveNoumFromSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveNoumFromSubscriptionMutation, RemoveNoumFromSubscriptionMutationVariables>(RemoveNoumFromSubscriptionDocument, options);
      }
export type RemoveNoumFromSubscriptionMutationHookResult = ReturnType<typeof useRemoveNoumFromSubscriptionMutation>;
export type RemoveNoumFromSubscriptionMutationResult = Apollo.MutationResult<RemoveNoumFromSubscriptionMutation>;
export type RemoveNoumFromSubscriptionMutationOptions = Apollo.BaseMutationOptions<RemoveNoumFromSubscriptionMutation, RemoveNoumFromSubscriptionMutationVariables>;