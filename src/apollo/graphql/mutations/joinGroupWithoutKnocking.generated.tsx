/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type JoinGroupWithoutKnockingMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
}>;


export type JoinGroupWithoutKnockingMutation = { __typename?: 'Mutation', joinGroupWithoutKnocking?: { __typename?: 'SocialGroup', _id: string } | null };


export const JoinGroupWithoutKnockingDocument = gql`
    mutation joinGroupWithoutKnocking($groupId: ID!) {
  joinGroupWithoutKnocking(groupId: $groupId) {
    _id
  }
}
    `;
export type JoinGroupWithoutKnockingMutationFn = Apollo.MutationFunction<JoinGroupWithoutKnockingMutation, JoinGroupWithoutKnockingMutationVariables>;

/**
 * __useJoinGroupWithoutKnockingMutation__
 *
 * To run a mutation, you first call `useJoinGroupWithoutKnockingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGroupWithoutKnockingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGroupWithoutKnockingMutation, { data, loading, error }] = useJoinGroupWithoutKnockingMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useJoinGroupWithoutKnockingMutation(baseOptions?: Apollo.MutationHookOptions<JoinGroupWithoutKnockingMutation, JoinGroupWithoutKnockingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinGroupWithoutKnockingMutation, JoinGroupWithoutKnockingMutationVariables>(JoinGroupWithoutKnockingDocument, options);
      }
export type JoinGroupWithoutKnockingMutationHookResult = ReturnType<typeof useJoinGroupWithoutKnockingMutation>;
export type JoinGroupWithoutKnockingMutationResult = Apollo.MutationResult<JoinGroupWithoutKnockingMutation>;
export type JoinGroupWithoutKnockingMutationOptions = Apollo.BaseMutationOptions<JoinGroupWithoutKnockingMutation, JoinGroupWithoutKnockingMutationVariables>;