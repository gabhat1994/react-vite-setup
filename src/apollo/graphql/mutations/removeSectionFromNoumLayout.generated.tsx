/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveSectionFromNoumLayoutMutationVariables = Types.Exact<{
  ID: Types.Scalars['ID'];
}>;


export type RemoveSectionFromNoumLayoutMutation = { __typename?: 'Mutation', removeSectionFromNoumLayout: boolean };


export const RemoveSectionFromNoumLayoutDocument = gql`
    mutation removeSectionFromNoumLayout($ID: ID!) {
  removeSectionFromNoumLayout(sectionId: $ID)
}
    `;
export type RemoveSectionFromNoumLayoutMutationFn = Apollo.MutationFunction<RemoveSectionFromNoumLayoutMutation, RemoveSectionFromNoumLayoutMutationVariables>;

/**
 * __useRemoveSectionFromNoumLayoutMutation__
 *
 * To run a mutation, you first call `useRemoveSectionFromNoumLayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSectionFromNoumLayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSectionFromNoumLayoutMutation, { data, loading, error }] = useRemoveSectionFromNoumLayoutMutation({
 *   variables: {
 *      ID: // value for 'ID'
 *   },
 * });
 */
export function useRemoveSectionFromNoumLayoutMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSectionFromNoumLayoutMutation, RemoveSectionFromNoumLayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSectionFromNoumLayoutMutation, RemoveSectionFromNoumLayoutMutationVariables>(RemoveSectionFromNoumLayoutDocument, options);
      }
export type RemoveSectionFromNoumLayoutMutationHookResult = ReturnType<typeof useRemoveSectionFromNoumLayoutMutation>;
export type RemoveSectionFromNoumLayoutMutationResult = Apollo.MutationResult<RemoveSectionFromNoumLayoutMutation>;
export type RemoveSectionFromNoumLayoutMutationOptions = Apollo.BaseMutationOptions<RemoveSectionFromNoumLayoutMutation, RemoveSectionFromNoumLayoutMutationVariables>;