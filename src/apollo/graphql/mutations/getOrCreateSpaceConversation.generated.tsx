/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ConversationOutputFragmentDoc } from '../fragments/conversationOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOrCreateSpaceConversationMutationVariables = Types.Exact<{
  spaceId: Types.Scalars['ID'];
  userIds?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['ID']>> | Types.InputMaybe<Types.Scalars['ID']>>;
}>;


export type GetOrCreateSpaceConversationMutation = { __typename?: 'Mutation', getOrCreateSpaceConversation?: { __typename?: 'ConversationOutput', _id?: string | null, cid?: string | null, spaceId?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null, participants?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, username?: string | null, title?: string | null, userStatus?: string | null, status?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null, metaData?: { __typename?: 'ConversationMeta', sid: string, totalUnreadConversationCount?: number | null } | null } | null };


export const GetOrCreateSpaceConversationDocument = gql`
    mutation getOrCreateSpaceConversation($spaceId: ID!, $userIds: [ID]) {
  getOrCreateSpaceConversation(spaceId: $spaceId, userIds: $userIds) {
    ...ConversationOutput
  }
}
    ${ConversationOutputFragmentDoc}`;
export type GetOrCreateSpaceConversationMutationFn = Apollo.MutationFunction<GetOrCreateSpaceConversationMutation, GetOrCreateSpaceConversationMutationVariables>;

/**
 * __useGetOrCreateSpaceConversationMutation__
 *
 * To run a mutation, you first call `useGetOrCreateSpaceConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetOrCreateSpaceConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getOrCreateSpaceConversationMutation, { data, loading, error }] = useGetOrCreateSpaceConversationMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useGetOrCreateSpaceConversationMutation(baseOptions?: Apollo.MutationHookOptions<GetOrCreateSpaceConversationMutation, GetOrCreateSpaceConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetOrCreateSpaceConversationMutation, GetOrCreateSpaceConversationMutationVariables>(GetOrCreateSpaceConversationDocument, options);
      }
export type GetOrCreateSpaceConversationMutationHookResult = ReturnType<typeof useGetOrCreateSpaceConversationMutation>;
export type GetOrCreateSpaceConversationMutationResult = Apollo.MutationResult<GetOrCreateSpaceConversationMutation>;
export type GetOrCreateSpaceConversationMutationOptions = Apollo.BaseMutationOptions<GetOrCreateSpaceConversationMutation, GetOrCreateSpaceConversationMutationVariables>;