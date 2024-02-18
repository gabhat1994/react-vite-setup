/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { PostItemFragmentDoc } from '../fragments/postOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PinPostMutationVariables = Types.Exact<{
  postId?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type PinPostMutation = { __typename?: 'Mutation', pinPost?: { __typename?: 'PostOutput', _id: string, commentsCount?: number | null, createdAt?: any | null, isPinned?: boolean | null, pinnedTimestamp?: any | null, rawJSON?: any | null, postStatus?: Types.PostStatus | null, reactionsCount?: number | null, updatedAt?: any | null, text?: string | null, userReaction?: Types.ReactionCategory | null, visibility?: Types.PostVisibility | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, name?: string | null, fonts?: any | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, post?: { __typename?: 'Post', category?: Types.PostCategory | null, content?: string | null, thumbnail?: string | null } | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, tags?: Array<{ __typename?: 'TagsOutput', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, reactions?: Array<{ __typename?: 'Reaction', _id: string, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null };


export const PinPostDocument = gql`
    mutation pinPost($postId: ID) {
  pinPost(postId: $postId) {
    ...PostItem
  }
}
    ${PostItemFragmentDoc}`;
export type PinPostMutationFn = Apollo.MutationFunction<PinPostMutation, PinPostMutationVariables>;

/**
 * __usePinPostMutation__
 *
 * To run a mutation, you first call `usePinPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePinPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pinPostMutation, { data, loading, error }] = usePinPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePinPostMutation(baseOptions?: Apollo.MutationHookOptions<PinPostMutation, PinPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PinPostMutation, PinPostMutationVariables>(PinPostDocument, options);
      }
export type PinPostMutationHookResult = ReturnType<typeof usePinPostMutation>;
export type PinPostMutationResult = Apollo.MutationResult<PinPostMutation>;
export type PinPostMutationOptions = Apollo.BaseMutationOptions<PinPostMutation, PinPostMutationVariables>;