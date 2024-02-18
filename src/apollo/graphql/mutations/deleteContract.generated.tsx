/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteContractMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteContractMutation = { __typename?: 'Mutation', deleteContract: boolean };


export const DeleteContractDocument = gql`
    mutation DeleteContract($id: ID!) {
  deleteContract(contractId: $id)
}
    `;
export type DeleteContractMutationFn = Apollo.MutationFunction<DeleteContractMutation, DeleteContractMutationVariables>;

/**
 * __useDeleteContractMutation__
 *
 * To run a mutation, you first call `useDeleteContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContractMutation, { data, loading, error }] = useDeleteContractMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContractMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContractMutation, DeleteContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContractMutation, DeleteContractMutationVariables>(DeleteContractDocument, options);
      }
export type DeleteContractMutationHookResult = ReturnType<typeof useDeleteContractMutation>;
export type DeleteContractMutationResult = Apollo.MutationResult<DeleteContractMutation>;
export type DeleteContractMutationOptions = Apollo.BaseMutationOptions<DeleteContractMutation, DeleteContractMutationVariables>;