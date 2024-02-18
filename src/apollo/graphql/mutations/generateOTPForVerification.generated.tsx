/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GenerateOtpForVerificationMutationVariables = Types.Exact<{
  email?: Types.InputMaybe<Types.Scalars['String']>;
  phone?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GenerateOtpForVerificationMutation = { __typename?: 'Mutation', generateOTPForVerification?: { __typename?: 'OTPResponseOutput', Status?: number | null, error?: boolean | null, message?: string | null, success?: boolean | null } | null };


export const GenerateOtpForVerificationDocument = gql`
    mutation generateOTPForVerification($email: String, $phone: String) {
  generateOTPForVerification(email: $email, phone: $phone) {
    Status
    error
    message
    success
  }
}
    `;
export type GenerateOtpForVerificationMutationFn = Apollo.MutationFunction<GenerateOtpForVerificationMutation, GenerateOtpForVerificationMutationVariables>;

/**
 * __useGenerateOtpForVerificationMutation__
 *
 * To run a mutation, you first call `useGenerateOtpForVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateOtpForVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateOtpForVerificationMutation, { data, loading, error }] = useGenerateOtpForVerificationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useGenerateOtpForVerificationMutation(baseOptions?: Apollo.MutationHookOptions<GenerateOtpForVerificationMutation, GenerateOtpForVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateOtpForVerificationMutation, GenerateOtpForVerificationMutationVariables>(GenerateOtpForVerificationDocument, options);
      }
export type GenerateOtpForVerificationMutationHookResult = ReturnType<typeof useGenerateOtpForVerificationMutation>;
export type GenerateOtpForVerificationMutationResult = Apollo.MutationResult<GenerateOtpForVerificationMutation>;
export type GenerateOtpForVerificationMutationOptions = Apollo.BaseMutationOptions<GenerateOtpForVerificationMutation, GenerateOtpForVerificationMutationVariables>;