/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CloseSocialHallGroupMutationVariables = Types.Exact<{
  socialHallId: Types.Scalars['ID'];
}>;


export type CloseSocialHallGroupMutation = { __typename?: 'Mutation', closeSocialHallGroup?: boolean | null };


export const CloseSocialHallGroupDocument = gql`
    mutation closeSocialHallGroup($socialHallId: ID!) {
  closeSocialHallGroup(socialHallId: $socialHallId)
}
    `;
export type CloseSocialHallGroupMutationFn = Apollo.MutationFunction<CloseSocialHallGroupMutation, CloseSocialHallGroupMutationVariables>;

/**
 * __useCloseSocialHallGroupMutation__
 *
 * To run a mutation, you first call `useCloseSocialHallGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseSocialHallGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeSocialHallGroupMutation, { data, loading, error }] = useCloseSocialHallGroupMutation({
 *   variables: {
 *      socialHallId: // value for 'socialHallId'
 *   },
 * });
 */
export function useCloseSocialHallGroupMutation(baseOptions?: Apollo.MutationHookOptions<CloseSocialHallGroupMutation, CloseSocialHallGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CloseSocialHallGroupMutation, CloseSocialHallGroupMutationVariables>(CloseSocialHallGroupDocument, options);
      }
export type CloseSocialHallGroupMutationHookResult = ReturnType<typeof useCloseSocialHallGroupMutation>;
export type CloseSocialHallGroupMutationResult = Apollo.MutationResult<CloseSocialHallGroupMutation>;
export type CloseSocialHallGroupMutationOptions = Apollo.BaseMutationOptions<CloseSocialHallGroupMutation, CloseSocialHallGroupMutationVariables>;