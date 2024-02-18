/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SaveNoumLayoutAsDraftMutationVariables = Types.Exact<{
  ID: Types.Scalars['ID'];
}>;


export type SaveNoumLayoutAsDraftMutation = { __typename?: 'Mutation', saveNoumLayoutAsDraft: boolean };


export const SaveNoumLayoutAsDraftDocument = gql`
    mutation saveNoumLayoutAsDraft($ID: ID!) {
  saveNoumLayoutAsDraft(noumId: $ID)
}
    `;
export type SaveNoumLayoutAsDraftMutationFn = Apollo.MutationFunction<SaveNoumLayoutAsDraftMutation, SaveNoumLayoutAsDraftMutationVariables>;

/**
 * __useSaveNoumLayoutAsDraftMutation__
 *
 * To run a mutation, you first call `useSaveNoumLayoutAsDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveNoumLayoutAsDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveNoumLayoutAsDraftMutation, { data, loading, error }] = useSaveNoumLayoutAsDraftMutation({
 *   variables: {
 *      ID: // value for 'ID'
 *   },
 * });
 */
export function useSaveNoumLayoutAsDraftMutation(baseOptions?: Apollo.MutationHookOptions<SaveNoumLayoutAsDraftMutation, SaveNoumLayoutAsDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveNoumLayoutAsDraftMutation, SaveNoumLayoutAsDraftMutationVariables>(SaveNoumLayoutAsDraftDocument, options);
      }
export type SaveNoumLayoutAsDraftMutationHookResult = ReturnType<typeof useSaveNoumLayoutAsDraftMutation>;
export type SaveNoumLayoutAsDraftMutationResult = Apollo.MutationResult<SaveNoumLayoutAsDraftMutation>;
export type SaveNoumLayoutAsDraftMutationOptions = Apollo.BaseMutationOptions<SaveNoumLayoutAsDraftMutation, SaveNoumLayoutAsDraftMutationVariables>;