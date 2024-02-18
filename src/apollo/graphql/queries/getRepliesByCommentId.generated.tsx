/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ThreadOutputFragmentDoc } from '../fragments/threadOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetRepliesByCommentIdQueryVariables = Types.Exact<{
  commentId?: Types.InputMaybe<Types.Scalars['ID']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  sortOrder?: Types.InputMaybe<Types.SortOperator>;
}>;


export type GetRepliesByCommentIdQuery = { __typename?: 'Query', getRepliesByCommentId?: { __typename?: 'PaginatedThreads', count?: number | null, data?: Array<{ __typename?: 'ThreadOutput', _id?: string | null, content?: string | null, createdAt?: any | null, tags?: Array<{ __typename?: 'TagsOutput', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null };


export const GetRepliesByCommentIdDocument = gql`
    query getRepliesByCommentId($commentId: ID, $limit: Int, $offset: Int, $sortOrder: SortOperator) {
  getRepliesByCommentId(
    commentId: $commentId
    limit: $limit
    offset: $offset
    sortOrder: $sortOrder
  ) {
    count
    data {
      ...ThreadOutput
    }
  }
}
    ${ThreadOutputFragmentDoc}`;

/**
 * __useGetRepliesByCommentIdQuery__
 *
 * To run a query within a React component, call `useGetRepliesByCommentIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepliesByCommentIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepliesByCommentIdQuery({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useGetRepliesByCommentIdQuery(baseOptions?: Apollo.QueryHookOptions<GetRepliesByCommentIdQuery, GetRepliesByCommentIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRepliesByCommentIdQuery, GetRepliesByCommentIdQueryVariables>(GetRepliesByCommentIdDocument, options);
      }
export function useGetRepliesByCommentIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRepliesByCommentIdQuery, GetRepliesByCommentIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRepliesByCommentIdQuery, GetRepliesByCommentIdQueryVariables>(GetRepliesByCommentIdDocument, options);
        }
export type GetRepliesByCommentIdQueryHookResult = ReturnType<typeof useGetRepliesByCommentIdQuery>;
export type GetRepliesByCommentIdLazyQueryHookResult = ReturnType<typeof useGetRepliesByCommentIdLazyQuery>;
export type GetRepliesByCommentIdQueryResult = Apollo.QueryResult<GetRepliesByCommentIdQuery, GetRepliesByCommentIdQueryVariables>;