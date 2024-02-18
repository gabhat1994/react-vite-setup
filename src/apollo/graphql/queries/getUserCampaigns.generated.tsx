/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserCampaignsQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  filter?: Types.InputMaybe<Types.ProjectNoumCampaignFilter>;
}>;


export type GetUserCampaignsQuery = { __typename?: 'Query', getUserCampaigns?: { __typename?: 'ProjectNoumCampaignResponse', count?: number | null, data?: Array<{ __typename?: 'ProjectNoumCampaign', _id?: string | null, status?: Types.ProjectNoumCampaignStatus | null, views?: number | null, followersGained?: number | null, connectionsDeclined?: number | null, connectionsMade?: number | null, clicksToNoums?: number | null, invitesSent?: number | null, startedAt?: any | null, refreshedAt?: any | null, finishedAt?: any | null } | null> | null } | null };


export const GetUserCampaignsDocument = gql`
    query getUserCampaigns($offset: Int, $limit: Int, $filter: ProjectNoumCampaignFilter) {
  getUserCampaigns(offset: $offset, limit: $limit, filter: $filter) {
    data {
      _id
      status
      views
      followersGained
      connectionsDeclined
      connectionsMade
      clicksToNoums
      invitesSent
      startedAt
      refreshedAt
      finishedAt
    }
    count
  }
}
    `;

/**
 * __useGetUserCampaignsQuery__
 *
 * To run a query within a React component, call `useGetUserCampaignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCampaignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCampaignsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetUserCampaignsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserCampaignsQuery, GetUserCampaignsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserCampaignsQuery, GetUserCampaignsQueryVariables>(GetUserCampaignsDocument, options);
      }
export function useGetUserCampaignsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCampaignsQuery, GetUserCampaignsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserCampaignsQuery, GetUserCampaignsQueryVariables>(GetUserCampaignsDocument, options);
        }
export type GetUserCampaignsQueryHookResult = ReturnType<typeof useGetUserCampaignsQuery>;
export type GetUserCampaignsLazyQueryHookResult = ReturnType<typeof useGetUserCampaignsLazyQuery>;
export type GetUserCampaignsQueryResult = Apollo.QueryResult<GetUserCampaignsQuery, GetUserCampaignsQueryVariables>;