/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnfavouriteNoumMutationVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type UnfavouriteNoumMutation = { __typename?: 'Mutation', unfavouriteNoum?: boolean | null };


export const UnfavouriteNoumDocument = gql`
    mutation unfavouriteNoum($noumId: ID!) {
  unfavouriteNoum(noumId: $noumId)
}
    `;
export type UnfavouriteNoumMutationFn = Apollo.MutationFunction<UnfavouriteNoumMutation, UnfavouriteNoumMutationVariables>;

/**
 * __useUnfavouriteNoumMutation__
 *
 * To run a mutation, you first call `useUnfavouriteNoumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfavouriteNoumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfavouriteNoumMutation, { data, loading, error }] = useUnfavouriteNoumMutation({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useUnfavouriteNoumMutation(baseOptions?: Apollo.MutationHookOptions<UnfavouriteNoumMutation, UnfavouriteNoumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfavouriteNoumMutation, UnfavouriteNoumMutationVariables>(UnfavouriteNoumDocument, options);
      }
export type UnfavouriteNoumMutationHookResult = ReturnType<typeof useUnfavouriteNoumMutation>;
export type UnfavouriteNoumMutationResult = Apollo.MutationResult<UnfavouriteNoumMutation>;
export type UnfavouriteNoumMutationOptions = Apollo.BaseMutationOptions<UnfavouriteNoumMutation, UnfavouriteNoumMutationVariables>;