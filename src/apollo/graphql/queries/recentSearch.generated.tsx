/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { GlobalSearchPostEntityFragmentDoc } from '../fragments/globalSearchPostEntity.generated';
import { GlobalSearchNoumEntityFragmentDoc } from '../fragments/globalSearchNoumEntity.generated';
import { GlobalSearchEventEntityFragmentDoc } from '../fragments/globalSearchEventEntity.generated';
import { GlobalSearchEntityUserFragmentDoc } from '../fragments/globalSearchEntityUser.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RecentSearchesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RecentSearchesQuery = { __typename?: 'Query', recentSearches: { __typename?: 'RecentSearchesResult', searchedQueries: Array<string | null>, clickedEntities: { __typename?: 'GlobalSearchResult', count: number, data: Array<{ __typename?: 'GlobalSearchEntity', id: string, entityType: Types.EntityType, post?: { __typename?: 'GlobalSearchPostEntity', noumId?: string | null, noumName?: string | null, noumThumbnailUrl?: string | null, type?: Types.PostType | null, content?: string | null, createdAt: any, status?: Types.NoumStatus | null, tags?: Array<{ __typename?: 'Tag', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null, noum?: { __typename?: 'GlobalSearchNoumEntity', name: string, type: string, thumbnailUrl?: string | null, isConnected: boolean, isFollowing: boolean, status?: Types.NoumStatus | null } | null, event?: { __typename?: 'GlobalSearchEventEntity', noumId?: string | null, name: string, status?: Types.EventStatus | null, createdAt: any } | null, user: { __typename?: 'GlobalSearchEntityUser', id?: string | null, name?: string | null, title?: string | null, thumbnailUrl?: string | null, status?: Types.GlobalSearchUserEntityStatus | null, isNoumenaEmployee: boolean, firstName?: string | null, lastName?: string | null } }> } } };


export const RecentSearchesDocument = gql`
    query RecentSearches {
  recentSearches {
    searchedQueries
    clickedEntities {
      count
      data {
        id
        entityType
        post {
          ...GlobalSearchPostEntity
        }
        noum {
          ...GlobalSearchNoumEntity
        }
        event {
          ...GlobalSearchEventEntity
        }
        user {
          ...GlobalSearchEntityUser
        }
      }
    }
  }
}
    ${GlobalSearchPostEntityFragmentDoc}
${GlobalSearchNoumEntityFragmentDoc}
${GlobalSearchEventEntityFragmentDoc}
${GlobalSearchEntityUserFragmentDoc}`;

/**
 * __useRecentSearchesQuery__
 *
 * To run a query within a React component, call `useRecentSearchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentSearchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentSearchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecentSearchesQuery(baseOptions?: Apollo.QueryHookOptions<RecentSearchesQuery, RecentSearchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentSearchesQuery, RecentSearchesQueryVariables>(RecentSearchesDocument, options);
      }
export function useRecentSearchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentSearchesQuery, RecentSearchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentSearchesQuery, RecentSearchesQueryVariables>(RecentSearchesDocument, options);
        }
export type RecentSearchesQueryHookResult = ReturnType<typeof useRecentSearchesQuery>;
export type RecentSearchesLazyQueryHookResult = ReturnType<typeof useRecentSearchesLazyQuery>;
export type RecentSearchesQueryResult = Apollo.QueryResult<RecentSearchesQuery, RecentSearchesQueryVariables>;