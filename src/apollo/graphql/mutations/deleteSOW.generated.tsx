/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteSowMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteSowMutation = { __typename?: 'Mutation', deleteSOW?: boolean | null };


export const DeleteSowDocument = gql`
    mutation DeleteSOW($id: ID!) {
  deleteSOW(_id: $id)
}
    `;
export type DeleteSowMutationFn = Apollo.MutationFunction<DeleteSowMutation, DeleteSowMutationVariables>;

/**
 * __useDeleteSowMutation__
 *
 * To run a mutation, you first call `useDeleteSowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSowMutation, { data, loading, error }] = useDeleteSowMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSowMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSowMutation, DeleteSowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSowMutation, DeleteSowMutationVariables>(DeleteSowDocument, options);
      }
export type DeleteSowMutationHookResult = ReturnType<typeof useDeleteSowMutation>;
export type DeleteSowMutationResult = Apollo.MutationResult<DeleteSowMutation>;
export type DeleteSowMutationOptions = Apollo.BaseMutationOptions<DeleteSowMutation, DeleteSowMutationVariables>;