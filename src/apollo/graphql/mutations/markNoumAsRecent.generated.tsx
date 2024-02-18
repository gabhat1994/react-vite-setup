/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkNoumAsRecentMutationVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type MarkNoumAsRecentMutation = { __typename?: 'Mutation', markNoumAsRecent: boolean };


export const MarkNoumAsRecentDocument = gql`
    mutation markNoumAsRecent($noumId: ID!) {
  markNoumAsRecent(noumId: $noumId)
}
    `;
export type MarkNoumAsRecentMutationFn = Apollo.MutationFunction<MarkNoumAsRecentMutation, MarkNoumAsRecentMutationVariables>;

/**
 * __useMarkNoumAsRecentMutation__
 *
 * To run a mutation, you first call `useMarkNoumAsRecentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNoumAsRecentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNoumAsRecentMutation, { data, loading, error }] = useMarkNoumAsRecentMutation({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useMarkNoumAsRecentMutation(baseOptions?: Apollo.MutationHookOptions<MarkNoumAsRecentMutation, MarkNoumAsRecentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNoumAsRecentMutation, MarkNoumAsRecentMutationVariables>(MarkNoumAsRecentDocument, options);
      }
export type MarkNoumAsRecentMutationHookResult = ReturnType<typeof useMarkNoumAsRecentMutation>;
export type MarkNoumAsRecentMutationResult = Apollo.MutationResult<MarkNoumAsRecentMutation>;
export type MarkNoumAsRecentMutationOptions = Apollo.BaseMutationOptions<MarkNoumAsRecentMutation, MarkNoumAsRecentMutationVariables>;