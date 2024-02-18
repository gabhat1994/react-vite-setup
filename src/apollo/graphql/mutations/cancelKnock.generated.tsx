/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CancelKnockMutationVariables = Types.Exact<{
  knockId: Types.Scalars['ID'];
}>;


export type CancelKnockMutation = { __typename?: 'Mutation', cancelKnock?: { __typename?: 'Knock', _id: string, groupId?: string | null } | null };


export const CancelKnockDocument = gql`
    mutation cancelKnock($knockId: ID!) {
  cancelKnock(knockId: $knockId) {
    _id
    groupId
  }
}
    `;
export type CancelKnockMutationFn = Apollo.MutationFunction<CancelKnockMutation, CancelKnockMutationVariables>;

/**
 * __useCancelKnockMutation__
 *
 * To run a mutation, you first call `useCancelKnockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelKnockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelKnockMutation, { data, loading, error }] = useCancelKnockMutation({
 *   variables: {
 *      knockId: // value for 'knockId'
 *   },
 * });
 */
export function useCancelKnockMutation(baseOptions?: Apollo.MutationHookOptions<CancelKnockMutation, CancelKnockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelKnockMutation, CancelKnockMutationVariables>(CancelKnockDocument, options);
      }
export type CancelKnockMutationHookResult = ReturnType<typeof useCancelKnockMutation>;
export type CancelKnockMutationResult = Apollo.MutationResult<CancelKnockMutation>;
export type CancelKnockMutationOptions = Apollo.BaseMutationOptions<CancelKnockMutation, CancelKnockMutationVariables>;