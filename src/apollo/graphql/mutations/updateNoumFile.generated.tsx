/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumFileFragmentDoc } from '../fragments/noumFile.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateNoumFileMutationVariables = Types.Exact<{
  input: Types.UpdateNoumFileInput;
}>;


export type UpdateNoumFileMutation = { __typename?: 'Mutation', updateNoumFile: { __typename?: 'NoumFile', _id: string, name: string, description?: string | null, extension?: string | null, fileUrl?: string | null, downloadsCount: number, viewsCount: number, uploadedAt: any, updatedAt?: any | null, visibilityRoles: Array<string>, status: Types.NoumFileStatus, fileSize: number, owner?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, userStatus?: string | null } | null } };


export const UpdateNoumFileDocument = gql`
    mutation updateNoumFile($input: UpdateNoumFileInput!) {
  updateNoumFile(input: $input) {
    ...NoumFile
  }
}
    ${NoumFileFragmentDoc}`;
export type UpdateNoumFileMutationFn = Apollo.MutationFunction<UpdateNoumFileMutation, UpdateNoumFileMutationVariables>;

/**
 * __useUpdateNoumFileMutation__
 *
 * To run a mutation, you first call `useUpdateNoumFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoumFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoumFileMutation, { data, loading, error }] = useUpdateNoumFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNoumFileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoumFileMutation, UpdateNoumFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNoumFileMutation, UpdateNoumFileMutationVariables>(UpdateNoumFileDocument, options);
      }
export type UpdateNoumFileMutationHookResult = ReturnType<typeof useUpdateNoumFileMutation>;
export type UpdateNoumFileMutationResult = Apollo.MutationResult<UpdateNoumFileMutation>;
export type UpdateNoumFileMutationOptions = Apollo.BaseMutationOptions<UpdateNoumFileMutation, UpdateNoumFileMutationVariables>;