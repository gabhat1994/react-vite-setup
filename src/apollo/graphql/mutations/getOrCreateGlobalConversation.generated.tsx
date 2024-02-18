/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ConversationOutputFragmentDoc } from '../fragments/conversationOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOrCreateGlobalConversationMutationVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['ID']>;
  userIds?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['ID']>> | Types.InputMaybe<Types.Scalars['ID']>>;
}>;


export type GetOrCreateGlobalConversationMutation = { __typename?: 'Mutation', getOrCreateGlobalConversation?: { __typename?: 'ConversationOutput', _id?: string | null, cid?: string | null, spaceId?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null, participants?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null, metaData?: { __typename?: 'ConversationMeta', sid: string, totalUnreadConversationCount?: number | null } | null } | null };


export const GetOrCreateGlobalConversationDocument = gql`
    mutation getOrCreateGlobalConversation($id: ID, $userIds: [ID]) {
  getOrCreateGlobalConversation(_id: $id, userIds: $userIds) {
    ...ConversationOutput
  }
}
    ${ConversationOutputFragmentDoc}`;
export type GetOrCreateGlobalConversationMutationFn = Apollo.MutationFunction<GetOrCreateGlobalConversationMutation, GetOrCreateGlobalConversationMutationVariables>;

/**
 * __useGetOrCreateGlobalConversationMutation__
 *
 * To run a mutation, you first call `useGetOrCreateGlobalConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetOrCreateGlobalConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getOrCreateGlobalConversationMutation, { data, loading, error }] = useGetOrCreateGlobalConversationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useGetOrCreateGlobalConversationMutation(baseOptions?: Apollo.MutationHookOptions<GetOrCreateGlobalConversationMutation, GetOrCreateGlobalConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetOrCreateGlobalConversationMutation, GetOrCreateGlobalConversationMutationVariables>(GetOrCreateGlobalConversationDocument, options);
      }
export type GetOrCreateGlobalConversationMutationHookResult = ReturnType<typeof useGetOrCreateGlobalConversationMutation>;
export type GetOrCreateGlobalConversationMutationResult = Apollo.MutationResult<GetOrCreateGlobalConversationMutation>;
export type GetOrCreateGlobalConversationMutationOptions = Apollo.BaseMutationOptions<GetOrCreateGlobalConversationMutation, GetOrCreateGlobalConversationMutationVariables>;