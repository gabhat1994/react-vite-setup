/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RearrangeSectionInNoumLayoutMutationVariables = Types.Exact<{
  input: Types.RearrangeSectionInNoumLayoutInput;
}>;


export type RearrangeSectionInNoumLayoutMutation = { __typename?: 'Mutation', rearrangeSectionInNoumLayout: boolean };


export const RearrangeSectionInNoumLayoutDocument = gql`
    mutation rearrangeSectionInNoumLayout($input: RearrangeSectionInNoumLayoutInput!) {
  rearrangeSectionInNoumLayout(input: $input)
}
    `;
export type RearrangeSectionInNoumLayoutMutationFn = Apollo.MutationFunction<RearrangeSectionInNoumLayoutMutation, RearrangeSectionInNoumLayoutMutationVariables>;

/**
 * __useRearrangeSectionInNoumLayoutMutation__
 *
 * To run a mutation, you first call `useRearrangeSectionInNoumLayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRearrangeSectionInNoumLayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rearrangeSectionInNoumLayoutMutation, { data, loading, error }] = useRearrangeSectionInNoumLayoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRearrangeSectionInNoumLayoutMutation(baseOptions?: Apollo.MutationHookOptions<RearrangeSectionInNoumLayoutMutation, RearrangeSectionInNoumLayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RearrangeSectionInNoumLayoutMutation, RearrangeSectionInNoumLayoutMutationVariables>(RearrangeSectionInNoumLayoutDocument, options);
      }
export type RearrangeSectionInNoumLayoutMutationHookResult = ReturnType<typeof useRearrangeSectionInNoumLayoutMutation>;
export type RearrangeSectionInNoumLayoutMutationResult = Apollo.MutationResult<RearrangeSectionInNoumLayoutMutation>;
export type RearrangeSectionInNoumLayoutMutationOptions = Apollo.BaseMutationOptions<RearrangeSectionInNoumLayoutMutation, RearrangeSectionInNoumLayoutMutationVariables>;