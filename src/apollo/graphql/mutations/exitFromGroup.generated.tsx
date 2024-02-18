/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ExitFromGroupMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
}>;


export type ExitFromGroupMutation = { __typename?: 'Mutation', exitFromGroup?: { __typename?: 'SocialGroup', _id: string } | null };


export const ExitFromGroupDocument = gql`
    mutation exitFromGroup($groupId: ID!) {
  exitFromGroup(groupId: $groupId) {
    _id
  }
}
    `;
export type ExitFromGroupMutationFn = Apollo.MutationFunction<ExitFromGroupMutation, ExitFromGroupMutationVariables>;

/**
 * __useExitFromGroupMutation__
 *
 * To run a mutation, you first call `useExitFromGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExitFromGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exitFromGroupMutation, { data, loading, error }] = useExitFromGroupMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useExitFromGroupMutation(baseOptions?: Apollo.MutationHookOptions<ExitFromGroupMutation, ExitFromGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExitFromGroupMutation, ExitFromGroupMutationVariables>(ExitFromGroupDocument, options);
      }
export type ExitFromGroupMutationHookResult = ReturnType<typeof useExitFromGroupMutation>;
export type ExitFromGroupMutationResult = Apollo.MutationResult<ExitFromGroupMutation>;
export type ExitFromGroupMutationOptions = Apollo.BaseMutationOptions<ExitFromGroupMutation, ExitFromGroupMutationVariables>;