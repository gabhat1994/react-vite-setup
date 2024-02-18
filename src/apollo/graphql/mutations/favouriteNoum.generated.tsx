/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FavouriteNoumMutationVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type FavouriteNoumMutation = { __typename?: 'Mutation', favouriteNoum?: boolean | null };


export const FavouriteNoumDocument = gql`
    mutation favouriteNoum($noumId: ID!) {
  favouriteNoum(noumId: $noumId)
}
    `;
export type FavouriteNoumMutationFn = Apollo.MutationFunction<FavouriteNoumMutation, FavouriteNoumMutationVariables>;

/**
 * __useFavouriteNoumMutation__
 *
 * To run a mutation, you first call `useFavouriteNoumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavouriteNoumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favouriteNoumMutation, { data, loading, error }] = useFavouriteNoumMutation({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useFavouriteNoumMutation(baseOptions?: Apollo.MutationHookOptions<FavouriteNoumMutation, FavouriteNoumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FavouriteNoumMutation, FavouriteNoumMutationVariables>(FavouriteNoumDocument, options);
      }
export type FavouriteNoumMutationHookResult = ReturnType<typeof useFavouriteNoumMutation>;
export type FavouriteNoumMutationResult = Apollo.MutationResult<FavouriteNoumMutation>;
export type FavouriteNoumMutationOptions = Apollo.BaseMutationOptions<FavouriteNoumMutation, FavouriteNoumMutationVariables>;