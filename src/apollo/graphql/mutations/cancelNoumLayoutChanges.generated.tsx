/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CancelNoumLayoutChangesMutationVariables = Types.Exact<{
  ID: Types.Scalars['ID'];
}>;


export type CancelNoumLayoutChangesMutation = { __typename?: 'Mutation', cancelNoumLayoutChanges: boolean };


export const CancelNoumLayoutChangesDocument = gql`
    mutation cancelNoumLayoutChanges($ID: ID!) {
  cancelNoumLayoutChanges(noumId: $ID)
}
    `;
export type CancelNoumLayoutChangesMutationFn = Apollo.MutationFunction<CancelNoumLayoutChangesMutation, CancelNoumLayoutChangesMutationVariables>;

/**
 * __useCancelNoumLayoutChangesMutation__
 *
 * To run a mutation, you first call `useCancelNoumLayoutChangesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelNoumLayoutChangesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelNoumLayoutChangesMutation, { data, loading, error }] = useCancelNoumLayoutChangesMutation({
 *   variables: {
 *      ID: // value for 'ID'
 *   },
 * });
 */
export function useCancelNoumLayoutChangesMutation(baseOptions?: Apollo.MutationHookOptions<CancelNoumLayoutChangesMutation, CancelNoumLayoutChangesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelNoumLayoutChangesMutation, CancelNoumLayoutChangesMutationVariables>(CancelNoumLayoutChangesDocument, options);
      }
export type CancelNoumLayoutChangesMutationHookResult = ReturnType<typeof useCancelNoumLayoutChangesMutation>;
export type CancelNoumLayoutChangesMutationResult = Apollo.MutationResult<CancelNoumLayoutChangesMutation>;
export type CancelNoumLayoutChangesMutationOptions = Apollo.BaseMutationOptions<CancelNoumLayoutChangesMutation, CancelNoumLayoutChangesMutationVariables>;