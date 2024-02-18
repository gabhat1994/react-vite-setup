/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserBasicOutputFragmentDoc } from '../fragments/userBasicOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllUidForChamberPostsQueryVariables = Types.Exact<{
  chamberId: Types.Scalars['ID'];
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetAllUidForChamberPostsQuery = { __typename?: 'Query', getAllUidForChamberPosts?: { __typename?: 'ChamberAuthors', count?: number | null, data?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null> | null } | null };


export const GetAllUidForChamberPostsDocument = gql`
    query getAllUidForChamberPosts($chamberId: ID!, $offset: Int, $limit: Int) {
  getAllUidForChamberPosts(chamberId: $chamberId, offset: $offset, limit: $limit) {
    count
    data {
      ...UserBasicOutput
    }
  }
}
    ${UserBasicOutputFragmentDoc}`;

/**
 * __useGetAllUidForChamberPostsQuery__
 *
 * To run a query within a React component, call `useGetAllUidForChamberPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUidForChamberPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUidForChamberPostsQuery({
 *   variables: {
 *      chamberId: // value for 'chamberId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetAllUidForChamberPostsQuery(baseOptions: Apollo.QueryHookOptions<GetAllUidForChamberPostsQuery, GetAllUidForChamberPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUidForChamberPostsQuery, GetAllUidForChamberPostsQueryVariables>(GetAllUidForChamberPostsDocument, options);
      }
export function useGetAllUidForChamberPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUidForChamberPostsQuery, GetAllUidForChamberPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUidForChamberPostsQuery, GetAllUidForChamberPostsQueryVariables>(GetAllUidForChamberPostsDocument, options);
        }
export type GetAllUidForChamberPostsQueryHookResult = ReturnType<typeof useGetAllUidForChamberPostsQuery>;
export type GetAllUidForChamberPostsLazyQueryHookResult = ReturnType<typeof useGetAllUidForChamberPostsLazyQuery>;
export type GetAllUidForChamberPostsQueryResult = Apollo.QueryResult<GetAllUidForChamberPostsQuery, GetAllUidForChamberPostsQueryVariables>;