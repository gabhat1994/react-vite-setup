/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteNoumFileMutationVariables = Types.Exact<{
  fileId: Types.Scalars['ID'];
}>;


export type DeleteNoumFileMutation = { __typename?: 'Mutation', deleteNoumFile: boolean };


export const DeleteNoumFileDocument = gql`
    mutation deleteNoumFile($fileId: ID!) {
  deleteNoumFile(fileId: $fileId)
}
    `;
export type DeleteNoumFileMutationFn = Apollo.MutationFunction<DeleteNoumFileMutation, DeleteNoumFileMutationVariables>;

/**
 * __useDeleteNoumFileMutation__
 *
 * To run a mutation, you first call `useDeleteNoumFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoumFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoumFileMutation, { data, loading, error }] = useDeleteNoumFileMutation({
 *   variables: {
 *      fileId: // value for 'fileId'
 *   },
 * });
 */
export function useDeleteNoumFileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNoumFileMutation, DeleteNoumFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNoumFileMutation, DeleteNoumFileMutationVariables>(DeleteNoumFileDocument, options);
      }
export type DeleteNoumFileMutationHookResult = ReturnType<typeof useDeleteNoumFileMutation>;
export type DeleteNoumFileMutationResult = Apollo.MutationResult<DeleteNoumFileMutation>;
export type DeleteNoumFileMutationOptions = Apollo.BaseMutationOptions<DeleteNoumFileMutation, DeleteNoumFileMutationVariables>;