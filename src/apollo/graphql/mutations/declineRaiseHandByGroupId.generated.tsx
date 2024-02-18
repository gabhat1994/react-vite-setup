/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeclineRaiseHandByGroupIdMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
  requestedByUserId: Types.Scalars['ID'];
}>;


export type DeclineRaiseHandByGroupIdMutation = { __typename?: 'Mutation', declineRaiseHandByGroupId?: { __typename?: 'SocialGroup', _id: string } | null };


export const DeclineRaiseHandByGroupIdDocument = gql`
    mutation declineRaiseHandByGroupId($groupId: ID!, $requestedByUserId: ID!) {
  declineRaiseHandByGroupId(
    groupId: $groupId
    requestedByUserId: $requestedByUserId
  ) {
    _id
  }
}
    `;
export type DeclineRaiseHandByGroupIdMutationFn = Apollo.MutationFunction<DeclineRaiseHandByGroupIdMutation, DeclineRaiseHandByGroupIdMutationVariables>;

/**
 * __useDeclineRaiseHandByGroupIdMutation__
 *
 * To run a mutation, you first call `useDeclineRaiseHandByGroupIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineRaiseHandByGroupIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineRaiseHandByGroupIdMutation, { data, loading, error }] = useDeclineRaiseHandByGroupIdMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      requestedByUserId: // value for 'requestedByUserId'
 *   },
 * });
 */
export function useDeclineRaiseHandByGroupIdMutation(baseOptions?: Apollo.MutationHookOptions<DeclineRaiseHandByGroupIdMutation, DeclineRaiseHandByGroupIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineRaiseHandByGroupIdMutation, DeclineRaiseHandByGroupIdMutationVariables>(DeclineRaiseHandByGroupIdDocument, options);
      }
export type DeclineRaiseHandByGroupIdMutationHookResult = ReturnType<typeof useDeclineRaiseHandByGroupIdMutation>;
export type DeclineRaiseHandByGroupIdMutationResult = Apollo.MutationResult<DeclineRaiseHandByGroupIdMutation>;
export type DeclineRaiseHandByGroupIdMutationOptions = Apollo.BaseMutationOptions<DeclineRaiseHandByGroupIdMutation, DeclineRaiseHandByGroupIdMutationVariables>;