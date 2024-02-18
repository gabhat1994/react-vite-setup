/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MoveToolToNoumLayoutColumnMutationVariables = Types.Exact<{
  input: Types.MoveToolToNoumLayoutColumnInput;
}>;


export type MoveToolToNoumLayoutColumnMutation = { __typename?: 'Mutation', moveToolToNoumLayoutColumn: boolean };


export const MoveToolToNoumLayoutColumnDocument = gql`
    mutation moveToolToNoumLayoutColumn($input: MoveToolToNoumLayoutColumnInput!) {
  moveToolToNoumLayoutColumn(input: $input)
}
    `;
export type MoveToolToNoumLayoutColumnMutationFn = Apollo.MutationFunction<MoveToolToNoumLayoutColumnMutation, MoveToolToNoumLayoutColumnMutationVariables>;

/**
 * __useMoveToolToNoumLayoutColumnMutation__
 *
 * To run a mutation, you first call `useMoveToolToNoumLayoutColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveToolToNoumLayoutColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveToolToNoumLayoutColumnMutation, { data, loading, error }] = useMoveToolToNoumLayoutColumnMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveToolToNoumLayoutColumnMutation(baseOptions?: Apollo.MutationHookOptions<MoveToolToNoumLayoutColumnMutation, MoveToolToNoumLayoutColumnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveToolToNoumLayoutColumnMutation, MoveToolToNoumLayoutColumnMutationVariables>(MoveToolToNoumLayoutColumnDocument, options);
      }
export type MoveToolToNoumLayoutColumnMutationHookResult = ReturnType<typeof useMoveToolToNoumLayoutColumnMutation>;
export type MoveToolToNoumLayoutColumnMutationResult = Apollo.MutationResult<MoveToolToNoumLayoutColumnMutation>;
export type MoveToolToNoumLayoutColumnMutationOptions = Apollo.BaseMutationOptions<MoveToolToNoumLayoutColumnMutation, MoveToolToNoumLayoutColumnMutationVariables>;