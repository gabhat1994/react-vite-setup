/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserKycMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.KycInput>;
}>;


export type UpdateUserKycMutation = { __typename?: 'Mutation', updateUserKyc?: { __typename?: 'KycOutput', ssn?: string | null, dob?: string | null } | null };


export const UpdateUserKycDocument = gql`
    mutation updateUserKyc($input: KycInput) {
  updateUserKyc(input: $input) {
    ssn
    dob
  }
}
    `;
export type UpdateUserKycMutationFn = Apollo.MutationFunction<UpdateUserKycMutation, UpdateUserKycMutationVariables>;

/**
 * __useUpdateUserKycMutation__
 *
 * To run a mutation, you first call `useUpdateUserKycMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserKycMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserKycMutation, { data, loading, error }] = useUpdateUserKycMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserKycMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserKycMutation, UpdateUserKycMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserKycMutation, UpdateUserKycMutationVariables>(UpdateUserKycDocument, options);
      }
export type UpdateUserKycMutationHookResult = ReturnType<typeof useUpdateUserKycMutation>;
export type UpdateUserKycMutationResult = Apollo.MutationResult<UpdateUserKycMutation>;
export type UpdateUserKycMutationOptions = Apollo.BaseMutationOptions<UpdateUserKycMutation, UpdateUserKycMutationVariables>;