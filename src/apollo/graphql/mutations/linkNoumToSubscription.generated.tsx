/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LinkNoumToSubscriptionMutationVariables = Types.Exact<{
  noumInput: Types.NoumTransactionInputType;
}>;


export type LinkNoumToSubscriptionMutation = { __typename?: 'Mutation', addRemoveNoumSubscription: { __typename?: 'NoumTransactionFee', status?: Types.Status_Noum | null } };


export const LinkNoumToSubscriptionDocument = gql`
    mutation linkNoumToSubscription($noumInput: NoumTransactionInputType!) {
  addRemoveNoumSubscription(noumInput: $noumInput) {
    status
  }
}
    `;
export type LinkNoumToSubscriptionMutationFn = Apollo.MutationFunction<LinkNoumToSubscriptionMutation, LinkNoumToSubscriptionMutationVariables>;

/**
 * __useLinkNoumToSubscriptionMutation__
 *
 * To run a mutation, you first call `useLinkNoumToSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLinkNoumToSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [linkNoumToSubscriptionMutation, { data, loading, error }] = useLinkNoumToSubscriptionMutation({
 *   variables: {
 *      noumInput: // value for 'noumInput'
 *   },
 * });
 */
export function useLinkNoumToSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<LinkNoumToSubscriptionMutation, LinkNoumToSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LinkNoumToSubscriptionMutation, LinkNoumToSubscriptionMutationVariables>(LinkNoumToSubscriptionDocument, options);
      }
export type LinkNoumToSubscriptionMutationHookResult = ReturnType<typeof useLinkNoumToSubscriptionMutation>;
export type LinkNoumToSubscriptionMutationResult = Apollo.MutationResult<LinkNoumToSubscriptionMutation>;
export type LinkNoumToSubscriptionMutationOptions = Apollo.BaseMutationOptions<LinkNoumToSubscriptionMutation, LinkNoumToSubscriptionMutationVariables>;