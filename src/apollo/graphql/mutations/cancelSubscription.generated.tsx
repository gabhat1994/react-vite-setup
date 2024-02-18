/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CancelSubscriptionMutationVariables = Types.Exact<{
  subscription_id: Types.Scalars['Float'];
  reason?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type CancelSubscriptionMutation = { __typename?: 'Mutation', cancelSubscription: boolean };


export const CancelSubscriptionDocument = gql`
    mutation cancelSubscription($subscription_id: Float!, $reason: String) {
  cancelSubscription(subscription_id: $subscription_id, reason: $reason)
}
    `;
export type CancelSubscriptionMutationFn = Apollo.MutationFunction<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;

/**
 * __useCancelSubscriptionMutation__
 *
 * To run a mutation, you first call `useCancelSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelSubscriptionMutation, { data, loading, error }] = useCancelSubscriptionMutation({
 *   variables: {
 *      subscription_id: // value for 'subscription_id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useCancelSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(CancelSubscriptionDocument, options);
      }
export type CancelSubscriptionMutationHookResult = ReturnType<typeof useCancelSubscriptionMutation>;
export type CancelSubscriptionMutationResult = Apollo.MutationResult<CancelSubscriptionMutation>;
export type CancelSubscriptionMutationOptions = Apollo.BaseMutationOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;