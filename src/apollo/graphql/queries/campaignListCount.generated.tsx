/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignListCountQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  filter?: Types.InputMaybe<Types.AdCampaignFilter>;
}>;


export type CampaignListCountQuery = { __typename?: 'Query', getAdCampaignsByUser?: { __typename?: 'AdCampaignOutputPaginated', count?: number | null } | null };


export const CampaignListCountDocument = gql`
    query campaignListCount($limit: Int, $offset: Int, $filter: AdCampaignFilter) {
  getAdCampaignsByUser(limit: $limit, offset: $offset, filter: $filter) {
    count
  }
}
    `;

/**
 * __useCampaignListCountQuery__
 *
 * To run a query within a React component, call `useCampaignListCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignListCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignListCountQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCampaignListCountQuery(baseOptions?: Apollo.QueryHookOptions<CampaignListCountQuery, CampaignListCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignListCountQuery, CampaignListCountQueryVariables>(CampaignListCountDocument, options);
      }
export function useCampaignListCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignListCountQuery, CampaignListCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignListCountQuery, CampaignListCountQueryVariables>(CampaignListCountDocument, options);
        }
export type CampaignListCountQueryHookResult = ReturnType<typeof useCampaignListCountQuery>;
export type CampaignListCountLazyQueryHookResult = ReturnType<typeof useCampaignListCountLazyQuery>;
export type CampaignListCountQueryResult = Apollo.QueryResult<CampaignListCountQuery, CampaignListCountQueryVariables>;