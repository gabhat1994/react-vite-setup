/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OtpVerificationMutationVariables = Types.Exact<{
  email?: Types.InputMaybe<Types.Scalars['String']>;
  otp?: Types.InputMaybe<Types.Scalars['Int']>;
  phone?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type OtpVerificationMutation = { __typename?: 'Mutation', OTPVerification?: { __typename?: 'OTPResponseOutput', Status?: number | null, error?: boolean | null, message?: string | null, success?: boolean | null } | null };


export const OtpVerificationDocument = gql`
    mutation OTPVerification($email: String, $otp: Int, $phone: String) {
  OTPVerification(email: $email, otp: $otp, phone: $phone) {
    Status
    error
    message
    success
  }
}
    `;
export type OtpVerificationMutationFn = Apollo.MutationFunction<OtpVerificationMutation, OtpVerificationMutationVariables>;

/**
 * __useOtpVerificationMutation__
 *
 * To run a mutation, you first call `useOtpVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOtpVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [otpVerificationMutation, { data, loading, error }] = useOtpVerificationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      otp: // value for 'otp'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useOtpVerificationMutation(baseOptions?: Apollo.MutationHookOptions<OtpVerificationMutation, OtpVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OtpVerificationMutation, OtpVerificationMutationVariables>(OtpVerificationDocument, options);
      }
export type OtpVerificationMutationHookResult = ReturnType<typeof useOtpVerificationMutation>;
export type OtpVerificationMutationResult = Apollo.MutationResult<OtpVerificationMutation>;
export type OtpVerificationMutationOptions = Apollo.BaseMutationOptions<OtpVerificationMutation, OtpVerificationMutationVariables>;