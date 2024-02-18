/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveToolFromNoumLayoutMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type RemoveToolFromNoumLayoutMutation = { __typename?: 'Mutation', removeToolFromNoumLayout: boolean };


export const RemoveToolFromNoumLayoutDocument = gql`
    mutation removeToolFromNoumLayout($id: ID!) {
  removeToolFromNoumLayout(toolId: $id)
}
    `;
export type RemoveToolFromNoumLayoutMutationFn = Apollo.MutationFunction<RemoveToolFromNoumLayoutMutation, RemoveToolFromNoumLayoutMutationVariables>;

/**
 * __useRemoveToolFromNoumLayoutMutation__
 *
 * To run a mutation, you first call `useRemoveToolFromNoumLayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveToolFromNoumLayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeToolFromNoumLayoutMutation, { data, loading, error }] = useRemoveToolFromNoumLayoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveToolFromNoumLayoutMutation(baseOptions?: Apollo.MutationHookOptions<RemoveToolFromNoumLayoutMutation, RemoveToolFromNoumLayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveToolFromNoumLayoutMutation, RemoveToolFromNoumLayoutMutationVariables>(RemoveToolFromNoumLayoutDocument, options);
      }
export type RemoveToolFromNoumLayoutMutationHookResult = ReturnType<typeof useRemoveToolFromNoumLayoutMutation>;
export type RemoveToolFromNoumLayoutMutationResult = Apollo.MutationResult<RemoveToolFromNoumLayoutMutation>;
export type RemoveToolFromNoumLayoutMutationOptions = Apollo.BaseMutationOptions<RemoveToolFromNoumLayoutMutation, RemoveToolFromNoumLayoutMutationVariables>;