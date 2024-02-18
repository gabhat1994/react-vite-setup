/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpgradeAndDowngradeSubscriptionMutationVariables = Types.Exact<{
  details: Types.SubscriptionUpgradeDowngradeInput;
}>;


export type UpgradeAndDowngradeSubscriptionMutation = { __typename?: 'Mutation', upgradeDowngradeSubscription: any };


export const UpgradeAndDowngradeSubscriptionDocument = gql`
    mutation upgradeAndDowngradeSubscription($details: SubscriptionUpgradeDowngradeInput!) {
  upgradeDowngradeSubscription(details: $details)
}
    `;
export type UpgradeAndDowngradeSubscriptionMutationFn = Apollo.MutationFunction<UpgradeAndDowngradeSubscriptionMutation, UpgradeAndDowngradeSubscriptionMutationVariables>;

/**
 * __useUpgradeAndDowngradeSubscriptionMutation__
 *
 * To run a mutation, you first call `useUpgradeAndDowngradeSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpgradeAndDowngradeSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upgradeAndDowngradeSubscriptionMutation, { data, loading, error }] = useUpgradeAndDowngradeSubscriptionMutation({
 *   variables: {
 *      details: // value for 'details'
 *   },
 * });
 */
export function useUpgradeAndDowngradeSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<UpgradeAndDowngradeSubscriptionMutation, UpgradeAndDowngradeSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpgradeAndDowngradeSubscriptionMutation, UpgradeAndDowngradeSubscriptionMutationVariables>(UpgradeAndDowngradeSubscriptionDocument, options);
      }
export type UpgradeAndDowngradeSubscriptionMutationHookResult = ReturnType<typeof useUpgradeAndDowngradeSubscriptionMutation>;
export type UpgradeAndDowngradeSubscriptionMutationResult = Apollo.MutationResult<UpgradeAndDowngradeSubscriptionMutation>;
export type UpgradeAndDowngradeSubscriptionMutationOptions = Apollo.BaseMutationOptions<UpgradeAndDowngradeSubscriptionMutation, UpgradeAndDowngradeSubscriptionMutationVariables>;