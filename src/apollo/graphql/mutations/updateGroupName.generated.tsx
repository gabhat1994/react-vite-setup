/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChangeGroupNameMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.SocialGroupInput>;
  groupId: Types.Scalars['ID'];
}>;


export type ChangeGroupNameMutation = { __typename?: 'Mutation', updateGroupName?: { __typename?: 'SocialGroup', _id: string, name?: string | null } | null };


export const ChangeGroupNameDocument = gql`
    mutation changeGroupName($input: SocialGroupInput, $groupId: ID!) {
  updateGroupName(groupId: $groupId, input: $input) {
    _id
    name
  }
}
    `;
export type ChangeGroupNameMutationFn = Apollo.MutationFunction<ChangeGroupNameMutation, ChangeGroupNameMutationVariables>;

/**
 * __useChangeGroupNameMutation__
 *
 * To run a mutation, you first call `useChangeGroupNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeGroupNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeGroupNameMutation, { data, loading, error }] = useChangeGroupNameMutation({
 *   variables: {
 *      input: // value for 'input'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useChangeGroupNameMutation(baseOptions?: Apollo.MutationHookOptions<ChangeGroupNameMutation, ChangeGroupNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeGroupNameMutation, ChangeGroupNameMutationVariables>(ChangeGroupNameDocument, options);
      }
export type ChangeGroupNameMutationHookResult = ReturnType<typeof useChangeGroupNameMutation>;
export type ChangeGroupNameMutationResult = Apollo.MutationResult<ChangeGroupNameMutation>;
export type ChangeGroupNameMutationOptions = Apollo.BaseMutationOptions<ChangeGroupNameMutation, ChangeGroupNameMutationVariables>;