/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResetPassCodeMutationVariables = Types.Exact<{
  input: Types.ResetPassCodeInput;
}>;


export type ResetPassCodeMutation = { __typename?: 'Mutation', resetPassCode?: { __typename?: 'MessageOutput', message?: string | null } | null };


export const ResetPassCodeDocument = gql`
    mutation resetPassCode($input: ResetPassCodeInput!) {
  resetPassCode(input: $input) {
    message
  }
}
    `;
export type ResetPassCodeMutationFn = Apollo.MutationFunction<ResetPassCodeMutation, ResetPassCodeMutationVariables>;

/**
 * __useResetPassCodeMutation__
 *
 * To run a mutation, you first call `useResetPassCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPassCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPassCodeMutation, { data, loading, error }] = useResetPassCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPassCodeMutation(baseOptions?: Apollo.MutationHookOptions<ResetPassCodeMutation, ResetPassCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPassCodeMutation, ResetPassCodeMutationVariables>(ResetPassCodeDocument, options);
      }
export type ResetPassCodeMutationHookResult = ReturnType<typeof useResetPassCodeMutation>;
export type ResetPassCodeMutationResult = Apollo.MutationResult<ResetPassCodeMutation>;
export type ResetPassCodeMutationOptions = Apollo.BaseMutationOptions<ResetPassCodeMutation, ResetPassCodeMutationVariables>;