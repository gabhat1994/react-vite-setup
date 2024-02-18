/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetInviteInactiveMutationVariables = Types.Exact<{
  token: Types.Scalars['String'];
}>;


export type SetInviteInactiveMutation = { __typename?: 'Mutation', setInviteInactive?: boolean | null };


export const SetInviteInactiveDocument = gql`
    mutation setInviteInactive($token: String!) {
  setInviteInactive(token: $token)
}
    `;
export type SetInviteInactiveMutationFn = Apollo.MutationFunction<SetInviteInactiveMutation, SetInviteInactiveMutationVariables>;

/**
 * __useSetInviteInactiveMutation__
 *
 * To run a mutation, you first call `useSetInviteInactiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetInviteInactiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setInviteInactiveMutation, { data, loading, error }] = useSetInviteInactiveMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSetInviteInactiveMutation(baseOptions?: Apollo.MutationHookOptions<SetInviteInactiveMutation, SetInviteInactiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetInviteInactiveMutation, SetInviteInactiveMutationVariables>(SetInviteInactiveDocument, options);
      }
export type SetInviteInactiveMutationHookResult = ReturnType<typeof useSetInviteInactiveMutation>;
export type SetInviteInactiveMutationResult = Apollo.MutationResult<SetInviteInactiveMutation>;
export type SetInviteInactiveMutationOptions = Apollo.BaseMutationOptions<SetInviteInactiveMutation, SetInviteInactiveMutationVariables>;