/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AcceptKnockMutationVariables = Types.Exact<{
  knockId: Types.Scalars['ID'];
}>;


export type AcceptKnockMutation = { __typename?: 'Mutation', acceptKnock?: { __typename?: 'SocialGroup', _id: string, token?: string | null, channelName?: string | null } | null };


export const AcceptKnockDocument = gql`
    mutation acceptKnock($knockId: ID!) {
  acceptKnock(knockId: $knockId) {
    _id
    token
    channelName
  }
}
    `;
export type AcceptKnockMutationFn = Apollo.MutationFunction<AcceptKnockMutation, AcceptKnockMutationVariables>;

/**
 * __useAcceptKnockMutation__
 *
 * To run a mutation, you first call `useAcceptKnockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptKnockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptKnockMutation, { data, loading, error }] = useAcceptKnockMutation({
 *   variables: {
 *      knockId: // value for 'knockId'
 *   },
 * });
 */
export function useAcceptKnockMutation(baseOptions?: Apollo.MutationHookOptions<AcceptKnockMutation, AcceptKnockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptKnockMutation, AcceptKnockMutationVariables>(AcceptKnockDocument, options);
      }
export type AcceptKnockMutationHookResult = ReturnType<typeof useAcceptKnockMutation>;
export type AcceptKnockMutationResult = Apollo.MutationResult<AcceptKnockMutation>;
export type AcceptKnockMutationOptions = Apollo.BaseMutationOptions<AcceptKnockMutation, AcceptKnockMutationVariables>;