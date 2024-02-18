/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkSearchEntityAsClickedMutationVariables = Types.Exact<{
  markSearchEntityAsClickedId: Types.Scalars['ID'];
}>;


export type MarkSearchEntityAsClickedMutation = { __typename?: 'Mutation', markSearchEntityAsClicked: boolean };


export const MarkSearchEntityAsClickedDocument = gql`
    mutation markSearchEntityAsClicked($markSearchEntityAsClickedId: ID!) {
  markSearchEntityAsClicked(id: $markSearchEntityAsClickedId)
}
    `;
export type MarkSearchEntityAsClickedMutationFn = Apollo.MutationFunction<MarkSearchEntityAsClickedMutation, MarkSearchEntityAsClickedMutationVariables>;

/**
 * __useMarkSearchEntityAsClickedMutation__
 *
 * To run a mutation, you first call `useMarkSearchEntityAsClickedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkSearchEntityAsClickedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markSearchEntityAsClickedMutation, { data, loading, error }] = useMarkSearchEntityAsClickedMutation({
 *   variables: {
 *      markSearchEntityAsClickedId: // value for 'markSearchEntityAsClickedId'
 *   },
 * });
 */
export function useMarkSearchEntityAsClickedMutation(baseOptions?: Apollo.MutationHookOptions<MarkSearchEntityAsClickedMutation, MarkSearchEntityAsClickedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkSearchEntityAsClickedMutation, MarkSearchEntityAsClickedMutationVariables>(MarkSearchEntityAsClickedDocument, options);
      }
export type MarkSearchEntityAsClickedMutationHookResult = ReturnType<typeof useMarkSearchEntityAsClickedMutation>;
export type MarkSearchEntityAsClickedMutationResult = Apollo.MutationResult<MarkSearchEntityAsClickedMutation>;
export type MarkSearchEntityAsClickedMutationOptions = Apollo.BaseMutationOptions<MarkSearchEntityAsClickedMutation, MarkSearchEntityAsClickedMutationVariables>;