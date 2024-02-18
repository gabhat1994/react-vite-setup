/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CommentOutputFragmentDoc } from '../fragments/postComment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddCommentToPostMutationVariables = Types.Exact<{
  _id: Types.Scalars['ID'];
  content?: Types.InputMaybe<Types.Scalars['String']>;
  tags?: Types.InputMaybe<Array<Types.InputMaybe<Types.TagsInput>> | Types.InputMaybe<Types.TagsInput>>;
}>;


export type AddCommentToPostMutation = { __typename?: 'Mutation', addCommentToPost?: { __typename?: 'CommentOutput', _id: string, content?: string | null, createdAt?: any | null, updatedAt?: any | null, replies?: { __typename?: 'ReplyOutput', total?: number | null, firstReply?: { __typename?: 'ThreadOutput', _id?: string | null, content?: string | null, createdAt?: any | null, tags?: Array<{ __typename?: 'TagsOutput', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, userIdList?: Array<{ __typename?: 'ThreadUser', _id?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, tags?: Array<{ __typename?: 'TagsOutput', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null };


export const AddCommentToPostDocument = gql`
    mutation addCommentToPost($_id: ID!, $content: String, $tags: [TagsInput]) {
  addCommentToPost(_id: $_id, content: $content, tags: $tags) {
    ...CommentOutput
  }
}
    ${CommentOutputFragmentDoc}`;
export type AddCommentToPostMutationFn = Apollo.MutationFunction<AddCommentToPostMutation, AddCommentToPostMutationVariables>;

/**
 * __useAddCommentToPostMutation__
 *
 * To run a mutation, you first call `useAddCommentToPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentToPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentToPostMutation, { data, loading, error }] = useAddCommentToPostMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      content: // value for 'content'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAddCommentToPostMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentToPostMutation, AddCommentToPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentToPostMutation, AddCommentToPostMutationVariables>(AddCommentToPostDocument, options);
      }
export type AddCommentToPostMutationHookResult = ReturnType<typeof useAddCommentToPostMutation>;
export type AddCommentToPostMutationResult = Apollo.MutationResult<AddCommentToPostMutation>;
export type AddCommentToPostMutationOptions = Apollo.BaseMutationOptions<AddCommentToPostMutation, AddCommentToPostMutationVariables>;