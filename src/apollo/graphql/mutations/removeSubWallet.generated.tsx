/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveSubWalletMutationVariables = Types.Exact<{
  chamberId: Types.Scalars['String'];
}>;


export type RemoveSubWalletMutation = { __typename?: 'Mutation', removeSubWallet?: { __typename?: 'MessageOutput', message?: string | null } | null };


export const RemoveSubWalletDocument = gql`
    mutation removeSubWallet($chamberId: String!) {
  removeSubWallet(chamberId: $chamberId) {
    message
  }
}
    `;
export type RemoveSubWalletMutationFn = Apollo.MutationFunction<RemoveSubWalletMutation, RemoveSubWalletMutationVariables>;

/**
 * __useRemoveSubWalletMutation__
 *
 * To run a mutation, you first call `useRemoveSubWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSubWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSubWalletMutation, { data, loading, error }] = useRemoveSubWalletMutation({
 *   variables: {
 *      chamberId: // value for 'chamberId'
 *   },
 * });
 */
export function useRemoveSubWalletMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSubWalletMutation, RemoveSubWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSubWalletMutation, RemoveSubWalletMutationVariables>(RemoveSubWalletDocument, options);
      }
export type RemoveSubWalletMutationHookResult = ReturnType<typeof useRemoveSubWalletMutation>;
export type RemoveSubWalletMutationResult = Apollo.MutationResult<RemoveSubWalletMutation>;
export type RemoveSubWalletMutationOptions = Apollo.BaseMutationOptions<RemoveSubWalletMutation, RemoveSubWalletMutationVariables>;