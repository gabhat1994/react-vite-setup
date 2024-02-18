/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InviteNonNoumenaMemberMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.NmUserInput>;
}>;


export type InviteNonNoumenaMemberMutation = { __typename?: 'Mutation', inviteNonNoumenaMember?: { __typename?: 'NMUserOutput', id: string } | null };


export const InviteNonNoumenaMemberDocument = gql`
    mutation inviteNonNoumenaMember($input: NMUserInput) {
  inviteNonNoumenaMember(input: $input) {
    id
  }
}
    `;
export type InviteNonNoumenaMemberMutationFn = Apollo.MutationFunction<InviteNonNoumenaMemberMutation, InviteNonNoumenaMemberMutationVariables>;

/**
 * __useInviteNonNoumenaMemberMutation__
 *
 * To run a mutation, you first call `useInviteNonNoumenaMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteNonNoumenaMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteNonNoumenaMemberMutation, { data, loading, error }] = useInviteNonNoumenaMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInviteNonNoumenaMemberMutation(baseOptions?: Apollo.MutationHookOptions<InviteNonNoumenaMemberMutation, InviteNonNoumenaMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteNonNoumenaMemberMutation, InviteNonNoumenaMemberMutationVariables>(InviteNonNoumenaMemberDocument, options);
      }
export type InviteNonNoumenaMemberMutationHookResult = ReturnType<typeof useInviteNonNoumenaMemberMutation>;
export type InviteNonNoumenaMemberMutationResult = Apollo.MutationResult<InviteNonNoumenaMemberMutation>;
export type InviteNonNoumenaMemberMutationOptions = Apollo.BaseMutationOptions<InviteNonNoumenaMemberMutation, InviteNonNoumenaMemberMutationVariables>;