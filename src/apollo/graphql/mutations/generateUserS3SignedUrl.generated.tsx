/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GenerateUserS3SignedUrlMutationVariables = Types.Exact<{
  file: Types.FileInput;
}>;


export type GenerateUserS3SignedUrlMutation = { __typename?: 'Mutation', generateUserS3SignedUrl?: { __typename?: 'SignedUrlOutput', url?: string | null } | null };


export const GenerateUserS3SignedUrlDocument = gql`
    mutation generateUserS3SignedUrl($file: FileInput!) {
  generateUserS3SignedUrl(file: $file) {
    url
  }
}
    `;
export type GenerateUserS3SignedUrlMutationFn = Apollo.MutationFunction<GenerateUserS3SignedUrlMutation, GenerateUserS3SignedUrlMutationVariables>;

/**
 * __useGenerateUserS3SignedUrlMutation__
 *
 * To run a mutation, you first call `useGenerateUserS3SignedUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateUserS3SignedUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateUserS3SignedUrlMutation, { data, loading, error }] = useGenerateUserS3SignedUrlMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useGenerateUserS3SignedUrlMutation(baseOptions?: Apollo.MutationHookOptions<GenerateUserS3SignedUrlMutation, GenerateUserS3SignedUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateUserS3SignedUrlMutation, GenerateUserS3SignedUrlMutationVariables>(GenerateUserS3SignedUrlDocument, options);
      }
export type GenerateUserS3SignedUrlMutationHookResult = ReturnType<typeof useGenerateUserS3SignedUrlMutation>;
export type GenerateUserS3SignedUrlMutationResult = Apollo.MutationResult<GenerateUserS3SignedUrlMutation>;
export type GenerateUserS3SignedUrlMutationOptions = Apollo.BaseMutationOptions<GenerateUserS3SignedUrlMutation, GenerateUserS3SignedUrlMutationVariables>;