/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeclineKnockMutationVariables = Types.Exact<{
  knockId: Types.Scalars['ID'];
}>;


export type DeclineKnockMutation = { __typename?: 'Mutation', declineKnock?: { __typename?: 'Knock', _id: string, groupId?: string | null } | null };


export const DeclineKnockDocument = gql`
    mutation declineKnock($knockId: ID!) {
  declineKnock(knockId: $knockId) {
    _id
    groupId
  }
}
    `;
export type DeclineKnockMutationFn = Apollo.MutationFunction<DeclineKnockMutation, DeclineKnockMutationVariables>;

/**
 * __useDeclineKnockMutation__
 *
 * To run a mutation, you first call `useDeclineKnockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineKnockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineKnockMutation, { data, loading, error }] = useDeclineKnockMutation({
 *   variables: {
 *      knockId: // value for 'knockId'
 *   },
 * });
 */
export function useDeclineKnockMutation(baseOptions?: Apollo.MutationHookOptions<DeclineKnockMutation, DeclineKnockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineKnockMutation, DeclineKnockMutationVariables>(DeclineKnockDocument, options);
      }
export type DeclineKnockMutationHookResult = ReturnType<typeof useDeclineKnockMutation>;
export type DeclineKnockMutationResult = Apollo.MutationResult<DeclineKnockMutation>;
export type DeclineKnockMutationOptions = Apollo.BaseMutationOptions<DeclineKnockMutation, DeclineKnockMutationVariables>;