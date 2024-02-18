/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VerifyWithOneTimeAuthMutationVariables = Types.Exact<{
  token?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type VerifyWithOneTimeAuthMutation = { __typename?: 'Mutation', verifyWithOneTimeAuth?: { __typename?: 'OneTimeTokenOutput', accessToken?: string | null, email?: string | null, refreshToken?: string | null } | null };


export const VerifyWithOneTimeAuthDocument = gql`
    mutation verifyWithOneTimeAuth($token: ID) {
  verifyWithOneTimeAuth(token: $token) {
    accessToken
    email
    refreshToken
  }
}
    `;
export type VerifyWithOneTimeAuthMutationFn = Apollo.MutationFunction<VerifyWithOneTimeAuthMutation, VerifyWithOneTimeAuthMutationVariables>;

/**
 * __useVerifyWithOneTimeAuthMutation__
 *
 * To run a mutation, you first call `useVerifyWithOneTimeAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyWithOneTimeAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyWithOneTimeAuthMutation, { data, loading, error }] = useVerifyWithOneTimeAuthMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyWithOneTimeAuthMutation(baseOptions?: Apollo.MutationHookOptions<VerifyWithOneTimeAuthMutation, VerifyWithOneTimeAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyWithOneTimeAuthMutation, VerifyWithOneTimeAuthMutationVariables>(VerifyWithOneTimeAuthDocument, options);
      }
export type VerifyWithOneTimeAuthMutationHookResult = ReturnType<typeof useVerifyWithOneTimeAuthMutation>;
export type VerifyWithOneTimeAuthMutationResult = Apollo.MutationResult<VerifyWithOneTimeAuthMutation>;
export type VerifyWithOneTimeAuthMutationOptions = Apollo.BaseMutationOptions<VerifyWithOneTimeAuthMutation, VerifyWithOneTimeAuthMutationVariables>;