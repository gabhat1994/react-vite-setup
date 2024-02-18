/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveFromSocialHallMutationVariables = Types.Exact<{
  socialHallId: Types.Scalars['ID'];
  userId: Types.Scalars['ID'];
}>;


export type RemoveFromSocialHallMutation = { __typename?: 'Mutation', removeFromSocialHall?: boolean | null };


export const RemoveFromSocialHallDocument = gql`
    mutation removeFromSocialHall($socialHallId: ID!, $userId: ID!) {
  removeFromSocialHall(socialHallId: $socialHallId, userId: $userId)
}
    `;
export type RemoveFromSocialHallMutationFn = Apollo.MutationFunction<RemoveFromSocialHallMutation, RemoveFromSocialHallMutationVariables>;

/**
 * __useRemoveFromSocialHallMutation__
 *
 * To run a mutation, you first call `useRemoveFromSocialHallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromSocialHallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromSocialHallMutation, { data, loading, error }] = useRemoveFromSocialHallMutation({
 *   variables: {
 *      socialHallId: // value for 'socialHallId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveFromSocialHallMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromSocialHallMutation, RemoveFromSocialHallMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromSocialHallMutation, RemoveFromSocialHallMutationVariables>(RemoveFromSocialHallDocument, options);
      }
export type RemoveFromSocialHallMutationHookResult = ReturnType<typeof useRemoveFromSocialHallMutation>;
export type RemoveFromSocialHallMutationResult = Apollo.MutationResult<RemoveFromSocialHallMutation>;
export type RemoveFromSocialHallMutationOptions = Apollo.BaseMutationOptions<RemoveFromSocialHallMutation, RemoveFromSocialHallMutationVariables>;