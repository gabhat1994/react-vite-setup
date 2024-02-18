/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOrCreateConversationMutationVariables = Types.Exact<{
  _id?: Types.InputMaybe<Types.Scalars['ID']>;
  userIds?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['ID']>> | Types.InputMaybe<Types.Scalars['ID']>>;
}>;


export type GetOrCreateConversationMutation = { __typename?: 'Mutation', getOrCreateConversation?: { __typename?: 'ConversationIdOutput', cid: string } | null };


export const GetOrCreateConversationDocument = gql`
    mutation getOrCreateConversation($_id: ID, $userIds: [ID]) {
  getOrCreateConversation(_id: $_id, userIds: $userIds) {
    cid
  }
}
    `;
export type GetOrCreateConversationMutationFn = Apollo.MutationFunction<GetOrCreateConversationMutation, GetOrCreateConversationMutationVariables>;

/**
 * __useGetOrCreateConversationMutation__
 *
 * To run a mutation, you first call `useGetOrCreateConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetOrCreateConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getOrCreateConversationMutation, { data, loading, error }] = useGetOrCreateConversationMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useGetOrCreateConversationMutation(baseOptions?: Apollo.MutationHookOptions<GetOrCreateConversationMutation, GetOrCreateConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetOrCreateConversationMutation, GetOrCreateConversationMutationVariables>(GetOrCreateConversationDocument, options);
      }
export type GetOrCreateConversationMutationHookResult = ReturnType<typeof useGetOrCreateConversationMutation>;
export type GetOrCreateConversationMutationResult = Apollo.MutationResult<GetOrCreateConversationMutation>;
export type GetOrCreateConversationMutationOptions = Apollo.BaseMutationOptions<GetOrCreateConversationMutation, GetOrCreateConversationMutationVariables>;