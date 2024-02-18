/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkNoumFileAsDownloadedMutationVariables = Types.Exact<{
  fileId: Types.Scalars['ID'];
}>;


export type MarkNoumFileAsDownloadedMutation = { __typename?: 'Mutation', markNoumFileAsDownloaded: boolean };


export const MarkNoumFileAsDownloadedDocument = gql`
    mutation markNoumFileAsDownloaded($fileId: ID!) {
  markNoumFileAsDownloaded(fileId: $fileId)
}
    `;
export type MarkNoumFileAsDownloadedMutationFn = Apollo.MutationFunction<MarkNoumFileAsDownloadedMutation, MarkNoumFileAsDownloadedMutationVariables>;

/**
 * __useMarkNoumFileAsDownloadedMutation__
 *
 * To run a mutation, you first call `useMarkNoumFileAsDownloadedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNoumFileAsDownloadedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNoumFileAsDownloadedMutation, { data, loading, error }] = useMarkNoumFileAsDownloadedMutation({
 *   variables: {
 *      fileId: // value for 'fileId'
 *   },
 * });
 */
export function useMarkNoumFileAsDownloadedMutation(baseOptions?: Apollo.MutationHookOptions<MarkNoumFileAsDownloadedMutation, MarkNoumFileAsDownloadedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNoumFileAsDownloadedMutation, MarkNoumFileAsDownloadedMutationVariables>(MarkNoumFileAsDownloadedDocument, options);
      }
export type MarkNoumFileAsDownloadedMutationHookResult = ReturnType<typeof useMarkNoumFileAsDownloadedMutation>;
export type MarkNoumFileAsDownloadedMutationResult = Apollo.MutationResult<MarkNoumFileAsDownloadedMutation>;
export type MarkNoumFileAsDownloadedMutationOptions = Apollo.BaseMutationOptions<MarkNoumFileAsDownloadedMutation, MarkNoumFileAsDownloadedMutationVariables>;