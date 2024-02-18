/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ValidateOtpForPasswordMutationVariables = Types.Exact<{
  otp: Types.Scalars['String'];
  newPassword: Types.Scalars['String'];
}>;


export type ValidateOtpForPasswordMutation = { __typename?: 'Mutation', validateResetPasswordOTP?: { __typename?: 'validateResetPasswordOutput', success: boolean, message?: string | null } | null };


export const ValidateOtpForPasswordDocument = gql`
    mutation validateOTPForPassword($otp: String!, $newPassword: String!) {
  validateResetPasswordOTP(otp: $otp, newPassword: $newPassword) {
    success
    message
  }
}
    `;
export type ValidateOtpForPasswordMutationFn = Apollo.MutationFunction<ValidateOtpForPasswordMutation, ValidateOtpForPasswordMutationVariables>;

/**
 * __useValidateOtpForPasswordMutation__
 *
 * To run a mutation, you first call `useValidateOtpForPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateOtpForPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateOtpForPasswordMutation, { data, loading, error }] = useValidateOtpForPasswordMutation({
 *   variables: {
 *      otp: // value for 'otp'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useValidateOtpForPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ValidateOtpForPasswordMutation, ValidateOtpForPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateOtpForPasswordMutation, ValidateOtpForPasswordMutationVariables>(ValidateOtpForPasswordDocument, options);
      }
export type ValidateOtpForPasswordMutationHookResult = ReturnType<typeof useValidateOtpForPasswordMutation>;
export type ValidateOtpForPasswordMutationResult = Apollo.MutationResult<ValidateOtpForPasswordMutation>;
export type ValidateOtpForPasswordMutationOptions = Apollo.BaseMutationOptions<ValidateOtpForPasswordMutation, ValidateOtpForPasswordMutationVariables>;