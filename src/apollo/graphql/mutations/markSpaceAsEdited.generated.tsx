/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkSpaceAsEditedMutationVariables = Types.Exact<{
  spaceId: Types.Scalars['ID'];
}>;


export type MarkSpaceAsEditedMutation = { __typename?: 'Mutation', markSpaceAsEdited?: { __typename?: 'SpaceOutput', _id?: string | null, updatedAt?: any | null } | null };


export const MarkSpaceAsEditedDocument = gql`
    mutation markSpaceAsEdited($spaceId: ID!) {
  markSpaceAsEdited(spaceId: $spaceId) {
    _id
    updatedAt
  }
}
    `;
export type MarkSpaceAsEditedMutationFn = Apollo.MutationFunction<MarkSpaceAsEditedMutation, MarkSpaceAsEditedMutationVariables>;

/**
 * __useMarkSpaceAsEditedMutation__
 *
 * To run a mutation, you first call `useMarkSpaceAsEditedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkSpaceAsEditedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markSpaceAsEditedMutation, { data, loading, error }] = useMarkSpaceAsEditedMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useMarkSpaceAsEditedMutation(baseOptions?: Apollo.MutationHookOptions<MarkSpaceAsEditedMutation, MarkSpaceAsEditedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkSpaceAsEditedMutation, MarkSpaceAsEditedMutationVariables>(MarkSpaceAsEditedDocument, options);
      }
export type MarkSpaceAsEditedMutationHookResult = ReturnType<typeof useMarkSpaceAsEditedMutation>;
export type MarkSpaceAsEditedMutationResult = Apollo.MutationResult<MarkSpaceAsEditedMutation>;
export type MarkSpaceAsEditedMutationOptions = Apollo.BaseMutationOptions<MarkSpaceAsEditedMutation, MarkSpaceAsEditedMutationVariables>;