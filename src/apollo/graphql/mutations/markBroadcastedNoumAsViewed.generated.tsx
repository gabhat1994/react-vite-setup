/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkBroadcastedNoumAsViewedMutationVariables = Types.Exact<{
  spaceId: Types.Scalars['ID'];
}>;


export type MarkBroadcastedNoumAsViewedMutation = { __typename?: 'Mutation', markBroadcastedNoumAsViewed?: boolean | null };


export const MarkBroadcastedNoumAsViewedDocument = gql`
    mutation markBroadcastedNoumAsViewed($spaceId: ID!) {
  markBroadcastedNoumAsViewed(spaceId: $spaceId)
}
    `;
export type MarkBroadcastedNoumAsViewedMutationFn = Apollo.MutationFunction<MarkBroadcastedNoumAsViewedMutation, MarkBroadcastedNoumAsViewedMutationVariables>;

/**
 * __useMarkBroadcastedNoumAsViewedMutation__
 *
 * To run a mutation, you first call `useMarkBroadcastedNoumAsViewedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkBroadcastedNoumAsViewedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markBroadcastedNoumAsViewedMutation, { data, loading, error }] = useMarkBroadcastedNoumAsViewedMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useMarkBroadcastedNoumAsViewedMutation(baseOptions?: Apollo.MutationHookOptions<MarkBroadcastedNoumAsViewedMutation, MarkBroadcastedNoumAsViewedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkBroadcastedNoumAsViewedMutation, MarkBroadcastedNoumAsViewedMutationVariables>(MarkBroadcastedNoumAsViewedDocument, options);
      }
export type MarkBroadcastedNoumAsViewedMutationHookResult = ReturnType<typeof useMarkBroadcastedNoumAsViewedMutation>;
export type MarkBroadcastedNoumAsViewedMutationResult = Apollo.MutationResult<MarkBroadcastedNoumAsViewedMutation>;
export type MarkBroadcastedNoumAsViewedMutationOptions = Apollo.BaseMutationOptions<MarkBroadcastedNoumAsViewedMutation, MarkBroadcastedNoumAsViewedMutationVariables>;