/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CampaignBasicFragmentDoc } from '../fragments/campaign.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignListQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  filter?: Types.InputMaybe<Types.AdCampaignFilter>;
}>;


export type CampaignListQuery = { __typename?: 'Query', getAdCampaignsByUser?: { __typename?: 'AdCampaignOutputPaginated', count?: number | null, data?: Array<{ __typename?: 'AdCampaignOutput', _id?: string | null, title?: string | null, status?: string | null, startDate?: any | null, endDate?: any | null, noumId?: { __typename?: 'SpaceOutput', _id?: string | null, profileImage?: string | null, name?: string | null, projectType?: string | null } | null } | null> | null } | null };


export const CampaignListDocument = gql`
    query campaignList($limit: Int, $offset: Int, $filter: AdCampaignFilter) {
  getAdCampaignsByUser(limit: $limit, offset: $offset, filter: $filter) {
    count
    data {
      ...CampaignBasic
    }
  }
}
    ${CampaignBasicFragmentDoc}`;

/**
 * __useCampaignListQuery__
 *
 * To run a query within a React component, call `useCampaignListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignListQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCampaignListQuery(baseOptions?: Apollo.QueryHookOptions<CampaignListQuery, CampaignListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignListQuery, CampaignListQueryVariables>(CampaignListDocument, options);
      }
export function useCampaignListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignListQuery, CampaignListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignListQuery, CampaignListQueryVariables>(CampaignListDocument, options);
        }
export type CampaignListQueryHookResult = ReturnType<typeof useCampaignListQuery>;
export type CampaignListLazyQueryHookResult = ReturnType<typeof useCampaignListLazyQuery>;
export type CampaignListQueryResult = Apollo.QueryResult<CampaignListQuery, CampaignListQueryVariables>;