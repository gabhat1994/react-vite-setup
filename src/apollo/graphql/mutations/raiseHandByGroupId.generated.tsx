/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RaiseHandByGroupIdMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
}>;


export type RaiseHandByGroupIdMutation = { __typename?: 'Mutation', raiseHandByGroupId?: { __typename?: 'SocialGroup', _id: string, name?: string | null, socialHallId?: string | null, speakers?: Array<string | null> | null, hosts?: Array<string | null> | null } | null };


export const RaiseHandByGroupIdDocument = gql`
    mutation raiseHandByGroupId($groupId: ID!) {
  raiseHandByGroupId(groupId: $groupId) {
    _id
    name
    socialHallId
    speakers
    hosts
  }
}
    `;
export type RaiseHandByGroupIdMutationFn = Apollo.MutationFunction<RaiseHandByGroupIdMutation, RaiseHandByGroupIdMutationVariables>;

/**
 * __useRaiseHandByGroupIdMutation__
 *
 * To run a mutation, you first call `useRaiseHandByGroupIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRaiseHandByGroupIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [raiseHandByGroupIdMutation, { data, loading, error }] = useRaiseHandByGroupIdMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useRaiseHandByGroupIdMutation(baseOptions?: Apollo.MutationHookOptions<RaiseHandByGroupIdMutation, RaiseHandByGroupIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RaiseHandByGroupIdMutation, RaiseHandByGroupIdMutationVariables>(RaiseHandByGroupIdDocument, options);
      }
export type RaiseHandByGroupIdMutationHookResult = ReturnType<typeof useRaiseHandByGroupIdMutation>;
export type RaiseHandByGroupIdMutationResult = Apollo.MutationResult<RaiseHandByGroupIdMutation>;
export type RaiseHandByGroupIdMutationOptions = Apollo.BaseMutationOptions<RaiseHandByGroupIdMutation, RaiseHandByGroupIdMutationVariables>;