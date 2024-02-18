/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { PostItemFragmentDoc } from '../fragments/postOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPostsByChamberIdQueryVariables = Types.Exact<{
  chamberId: Types.Scalars['ID'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  sort?: Types.InputMaybe<Types.SortType>;
  filter?: Types.InputMaybe<Types.PostFilter>;
}>;


export type GetPostsByChamberIdQuery = { __typename?: 'Query', getPostsByChamberId?: { __typename?: 'PostOutputData', count?: number | null, data?: Array<{ __typename?: 'PostOutput', _id: string, commentsCount?: number | null, createdAt?: any | null, isPinned?: boolean | null, pinnedTimestamp?: any | null, rawJSON?: any | null, postStatus?: Types.PostStatus | null, reactionsCount?: number | null, updatedAt?: any | null, text?: string | null, userReaction?: Types.ReactionCategory | null, visibility?: Types.PostVisibility | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, name?: string | null, fonts?: any | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, post?: { __typename?: 'Post', category?: Types.PostCategory | null, content?: string | null, thumbnail?: string | null } | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, tags?: Array<{ __typename?: 'TagsOutput', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, reactions?: Array<{ __typename?: 'Reaction', _id: string, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null> | null } | null };


export const GetPostsByChamberIdDocument = gql`
    query getPostsByChamberId($chamberId: ID!, $limit: Int, $offset: Int, $sort: SortType, $filter: PostFilter) {
  getPostsByChamberId(
    chamberId: $chamberId
    limit: $limit
    offset: $offset
    sort: $sort
    filter: $filter
  ) {
    data {
      ...PostItem
    }
    count
  }
}
    ${PostItemFragmentDoc}`;

/**
 * __useGetPostsByChamberIdQuery__
 *
 * To run a query within a React component, call `useGetPostsByChamberIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByChamberIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByChamberIdQuery({
 *   variables: {
 *      chamberId: // value for 'chamberId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPostsByChamberIdQuery(baseOptions: Apollo.QueryHookOptions<GetPostsByChamberIdQuery, GetPostsByChamberIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsByChamberIdQuery, GetPostsByChamberIdQueryVariables>(GetPostsByChamberIdDocument, options);
      }
export function useGetPostsByChamberIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsByChamberIdQuery, GetPostsByChamberIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsByChamberIdQuery, GetPostsByChamberIdQueryVariables>(GetPostsByChamberIdDocument, options);
        }
export type GetPostsByChamberIdQueryHookResult = ReturnType<typeof useGetPostsByChamberIdQuery>;
export type GetPostsByChamberIdLazyQueryHookResult = ReturnType<typeof useGetPostsByChamberIdLazyQuery>;
export type GetPostsByChamberIdQueryResult = Apollo.QueryResult<GetPostsByChamberIdQuery, GetPostsByChamberIdQueryVariables>;