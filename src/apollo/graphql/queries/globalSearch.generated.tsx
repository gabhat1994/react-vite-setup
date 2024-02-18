/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { GlobalSearchPostEntityFragmentDoc } from '../fragments/globalSearchPostEntity.generated';
import { GlobalSearchNoumEntityFragmentDoc } from '../fragments/globalSearchNoumEntity.generated';
import { GlobalSearchEventEntityFragmentDoc } from '../fragments/globalSearchEventEntity.generated';
import { GlobalSearchEntityUserFragmentDoc } from '../fragments/globalSearchEntityUser.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GlobalSearchQueryVariables = Types.Exact<{
  query?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  entityType?: Types.InputMaybe<Types.EntityType>;
  excludeEntityTypes?: Types.InputMaybe<Array<Types.InputMaybe<Types.EntityType>> | Types.InputMaybe<Types.EntityType>>;
  userStatuses?: Types.InputMaybe<Array<Types.GlobalSearchUserEntityStatus> | Types.GlobalSearchUserEntityStatus>;
}>;


export type GlobalSearchQuery = { __typename?: 'Query', globalSearch: { __typename?: 'GlobalSearchResult', count: number, data: Array<{ __typename?: 'GlobalSearchEntity', id: string, entityType: Types.EntityType, post?: { __typename?: 'GlobalSearchPostEntity', noumId?: string | null, noumName?: string | null, noumThumbnailUrl?: string | null, type?: Types.PostType | null, content?: string | null, createdAt: any, status?: Types.NoumStatus | null, tags?: Array<{ __typename?: 'Tag', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null, noum?: { __typename?: 'GlobalSearchNoumEntity', name: string, type: string, thumbnailUrl?: string | null, isConnected: boolean, isFollowing: boolean, status?: Types.NoumStatus | null } | null, event?: { __typename?: 'GlobalSearchEventEntity', noumId?: string | null, name: string, status?: Types.EventStatus | null, createdAt: any } | null, user: { __typename?: 'GlobalSearchEntityUser', id?: string | null, name?: string | null, title?: string | null, thumbnailUrl?: string | null, status?: Types.GlobalSearchUserEntityStatus | null, isNoumenaEmployee: boolean, firstName?: string | null, lastName?: string | null } }> } };


export const GlobalSearchDocument = gql`
    query globalSearch($query: String, $limit: Int, $offset: Int, $entityType: EntityType, $excludeEntityTypes: [EntityType], $userStatuses: [GlobalSearchUserEntityStatus!]) {
  globalSearch(
    query: $query
    offset: $offset
    limit: $limit
    entityType: $entityType
    excludeEntityTypes: $excludeEntityTypes
    userStatuses: $userStatuses
  ) {
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
    ${GlobalSearchPostEntityFragmentDoc}
${GlobalSearchNoumEntityFragmentDoc}
${GlobalSearchEventEntityFragmentDoc}
${GlobalSearchEntityUserFragmentDoc}`;

/**
 * __useGlobalSearchQuery__
 *
 * To run a query within a React component, call `useGlobalSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      entityType: // value for 'entityType'
 *      excludeEntityTypes: // value for 'excludeEntityTypes'
 *      userStatuses: // value for 'userStatuses'
 *   },
 * });
 */
export function useGlobalSearchQuery(baseOptions?: Apollo.QueryHookOptions<GlobalSearchQuery, GlobalSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GlobalSearchQuery, GlobalSearchQueryVariables>(GlobalSearchDocument, options);
      }
export function useGlobalSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GlobalSearchQuery, GlobalSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GlobalSearchQuery, GlobalSearchQueryVariables>(GlobalSearchDocument, options);
        }
export type GlobalSearchQueryHookResult = ReturnType<typeof useGlobalSearchQuery>;
export type GlobalSearchLazyQueryHookResult = ReturnType<typeof useGlobalSearchLazyQuery>;
export type GlobalSearchQueryResult = Apollo.QueryResult<GlobalSearchQuery, GlobalSearchQueryVariables>;