/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type KnockMutationVariables = Types.Exact<{
  hallAttendeeId?: Types.InputMaybe<Types.Scalars['ID']>;
  groupId?: Types.InputMaybe<Types.Scalars['ID']>;
  knockMessage?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type KnockMutation = { __typename?: 'Mutation', knock?: { __typename?: 'Knock', _id: string, groupId?: string | null } | null };


export const KnockDocument = gql`
    mutation knock($hallAttendeeId: ID, $groupId: ID, $knockMessage: String) {
  knock(
    input: {hallAttendeeId: $hallAttendeeId, groupId: $groupId, knockMessage: $knockMessage}
  ) {
    _id
    groupId
  }
}
    `;
export type KnockMutationFn = Apollo.MutationFunction<KnockMutation, KnockMutationVariables>;

/**
 * __useKnockMutation__
 *
 * To run a mutation, you first call `useKnockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKnockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [knockMutation, { data, loading, error }] = useKnockMutation({
 *   variables: {
 *      hallAttendeeId: // value for 'hallAttendeeId'
 *      groupId: // value for 'groupId'
 *      knockMessage: // value for 'knockMessage'
 *   },
 * });
 */
export function useKnockMutation(baseOptions?: Apollo.MutationHookOptions<KnockMutation, KnockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<KnockMutation, KnockMutationVariables>(KnockDocument, options);
      }
export type KnockMutationHookResult = ReturnType<typeof useKnockMutation>;
export type KnockMutationResult = Apollo.MutationResult<KnockMutation>;
export type KnockMutationOptions = Apollo.BaseMutationOptions<KnockMutation, KnockMutationVariables>;