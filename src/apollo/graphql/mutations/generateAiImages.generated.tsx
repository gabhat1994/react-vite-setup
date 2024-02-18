/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GenerateAiImagesMutationVariables = Types.Exact<{
  prompt: Types.Scalars['String'];
}>;


export type GenerateAiImagesMutation = { __typename?: 'Mutation', generateAiImages: Array<string> };


export const GenerateAiImagesDocument = gql`
    mutation generateAiImages($prompt: String!) {
  generateAiImages(prompt: $prompt)
}
    `;
export type GenerateAiImagesMutationFn = Apollo.MutationFunction<GenerateAiImagesMutation, GenerateAiImagesMutationVariables>;

/**
 * __useGenerateAiImagesMutation__
 *
 * To run a mutation, you first call `useGenerateAiImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateAiImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateAiImagesMutation, { data, loading, error }] = useGenerateAiImagesMutation({
 *   variables: {
 *      prompt: // value for 'prompt'
 *   },
 * });
 */
export function useGenerateAiImagesMutation(baseOptions?: Apollo.MutationHookOptions<GenerateAiImagesMutation, GenerateAiImagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateAiImagesMutation, GenerateAiImagesMutationVariables>(GenerateAiImagesDocument, options);
      }
export type GenerateAiImagesMutationHookResult = ReturnType<typeof useGenerateAiImagesMutation>;
export type GenerateAiImagesMutationResult = Apollo.MutationResult<GenerateAiImagesMutation>;
export type GenerateAiImagesMutationOptions = Apollo.BaseMutationOptions<GenerateAiImagesMutation, GenerateAiImagesMutationVariables>;