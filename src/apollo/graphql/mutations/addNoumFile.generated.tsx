/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumFileFragmentDoc } from '../fragments/noumFile.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddNoumFileMutationVariables = Types.Exact<{
  input: Types.AddNoumFileInput;
}>;


export type AddNoumFileMutation = { __typename?: 'Mutation', addNoumFile: { __typename?: 'NoumFile', _id: string, name: string, description?: string | null, extension?: string | null, fileUrl?: string | null, downloadsCount: number, viewsCount: number, uploadedAt: any, updatedAt?: any | null, visibilityRoles: Array<string>, status: Types.NoumFileStatus, fileSize: number, owner?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, userStatus?: string | null } | null } };


export const AddNoumFileDocument = gql`
    mutation addNoumFile($input: AddNoumFileInput!) {
  addNoumFile(input: $input) {
    ...NoumFile
  }
}
    ${NoumFileFragmentDoc}`;
export type AddNoumFileMutationFn = Apollo.MutationFunction<AddNoumFileMutation, AddNoumFileMutationVariables>;

/**
 * __useAddNoumFileMutation__
 *
 * To run a mutation, you first call `useAddNoumFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNoumFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNoumFileMutation, { data, loading, error }] = useAddNoumFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddNoumFileMutation(baseOptions?: Apollo.MutationHookOptions<AddNoumFileMutation, AddNoumFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNoumFileMutation, AddNoumFileMutationVariables>(AddNoumFileDocument, options);
      }
export type AddNoumFileMutationHookResult = ReturnType<typeof useAddNoumFileMutation>;
export type AddNoumFileMutationResult = Apollo.MutationResult<AddNoumFileMutation>;
export type AddNoumFileMutationOptions = Apollo.BaseMutationOptions<AddNoumFileMutation, AddNoumFileMutationVariables>;