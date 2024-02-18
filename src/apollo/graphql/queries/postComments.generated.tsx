/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { PostCommentFragmentDoc } from '../fragments/postComment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PostCommentsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  postId: Types.Scalars['ID'];
}>;


export type PostCommentsQuery = { __typename?: 'Query', postComments?: { __typename?: 'commentsWithPagination', count?: number | null, data?: Array<{ __typename?: 'Comments', _id: string, content?: string | null, createdAt?: any | null, updatedAt?: any | null, replies?: { __typename?: 'ReplyOutput', total?: number | null, firstReply?: { __typename?: 'ThreadOutput', _id?: string | null, content?: string | null, createdAt?: any | null, tags?: Array<{ __typename?: 'TagsOutput', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, userIdList?: Array<{ __typename?: 'ThreadUser', _id?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, tags?: Array<{ __typename?: 'TagsOutput', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null> | null } | null };

export type PostCommentsCountQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  postId: Types.Scalars['ID'];
}>;


export type PostCommentsCountQuery = { __typename?: 'Query', postComments?: { __typename?: 'commentsWithPagination', count?: number | null } | null };


export const PostCommentsDocument = gql`
    query postComments($limit: Int, $offset: Int, $postId: ID!) {
  postComments(limit: $limit, offset: $offset, postId: $postId) {
    count
    data {
      ...PostComment
    }
  }
}
    ${PostCommentFragmentDoc}`;

/**
 * __usePostCommentsQuery__
 *
 * To run a query within a React component, call `usePostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostCommentsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostCommentsQuery(baseOptions: Apollo.QueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, options);
      }
export function usePostCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, options);
        }
export type PostCommentsQueryHookResult = ReturnType<typeof usePostCommentsQuery>;
export type PostCommentsLazyQueryHookResult = ReturnType<typeof usePostCommentsLazyQuery>;
export type PostCommentsQueryResult = Apollo.QueryResult<PostCommentsQuery, PostCommentsQueryVariables>;
export const PostCommentsCountDocument = gql`
    query postCommentsCount($limit: Int, $offset: Int, $postId: ID!) {
  postComments(limit: $limit, offset: $offset, postId: $postId) {
    count
  }
}
    `;

/**
 * __usePostCommentsCountQuery__
 *
 * To run a query within a React component, call `usePostCommentsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostCommentsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostCommentsCountQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostCommentsCountQuery(baseOptions: Apollo.QueryHookOptions<PostCommentsCountQuery, PostCommentsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostCommentsCountQuery, PostCommentsCountQueryVariables>(PostCommentsCountDocument, options);
      }
export function usePostCommentsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostCommentsCountQuery, PostCommentsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostCommentsCountQuery, PostCommentsCountQueryVariables>(PostCommentsCountDocument, options);
        }
export type PostCommentsCountQueryHookResult = ReturnType<typeof usePostCommentsCountQuery>;
export type PostCommentsCountLazyQueryHookResult = ReturnType<typeof usePostCommentsCountLazyQuery>;
export type PostCommentsCountQueryResult = Apollo.QueryResult<PostCommentsCountQuery, PostCommentsCountQueryVariables>;