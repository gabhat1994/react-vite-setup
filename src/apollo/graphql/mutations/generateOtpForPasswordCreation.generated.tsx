/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GenerateOtpForPasswordCreationMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type GenerateOtpForPasswordCreationMutation = { __typename?: 'Mutation', generateOTPForPasswordCreation?: { __typename?: 'OTPForPasswordOutput', success: boolean, message?: string | null, remainingRequest?: number | null, nextRequestAfter?: string | null, nextRequestAfterInSecond?: number | null } | null };


export const GenerateOtpForPasswordCreationDocument = gql`
    mutation generateOTPForPasswordCreation {
  generateOTPForPasswordCreation {
    success
    message
    remainingRequest
    nextRequestAfter
    nextRequestAfterInSecond
  }
}
    `;
export type GenerateOtpForPasswordCreationMutationFn = Apollo.MutationFunction<GenerateOtpForPasswordCreationMutation, GenerateOtpForPasswordCreationMutationVariables>;

/**
 * __useGenerateOtpForPasswordCreationMutation__
 *
 * To run a mutation, you first call `useGenerateOtpForPasswordCreationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateOtpForPasswordCreationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateOtpForPasswordCreationMutation, { data, loading, error }] = useGenerateOtpForPasswordCreationMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateOtpForPasswordCreationMutation(baseOptions?: Apollo.MutationHookOptions<GenerateOtpForPasswordCreationMutation, GenerateOtpForPasswordCreationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateOtpForPasswordCreationMutation, GenerateOtpForPasswordCreationMutationVariables>(GenerateOtpForPasswordCreationDocument, options);
      }
export type GenerateOtpForPasswordCreationMutationHookResult = ReturnType<typeof useGenerateOtpForPasswordCreationMutation>;
export type GenerateOtpForPasswordCreationMutationResult = Apollo.MutationResult<GenerateOtpForPasswordCreationMutation>;
export type GenerateOtpForPasswordCreationMutationOptions = Apollo.BaseMutationOptions<GenerateOtpForPasswordCreationMutation, GenerateOtpForPasswordCreationMutationVariables>;