/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CampaignReportForCampaignSummaryFragmentDoc } from '../fragments/campaign.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignReportsIdQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
  campaignId: Types.Scalars['ID'];
}>;


export type CampaignReportsIdQuery = { __typename?: 'Query', getAdCampaignReports?: { __typename?: 'AdCampaignReportsOutputPaginated', count?: number | null, data?: Array<{ __typename?: 'AdCampaignReportOutput', _id?: string | null, reportId?: string | null, createdAt?: any | null, reportDate?: any | null } | null> | null } | null };


export const CampaignReportsIdDocument = gql`
    query campaignReportsId($limit: Int!, $offset: Int!, $campaignId: ID!) {
  getAdCampaignReports(limit: $limit, offset: $offset, campaignId: $campaignId) {
    count
    data {
      ...CampaignReportForCampaignSummary
    }
  }
}
    ${CampaignReportForCampaignSummaryFragmentDoc}`;

/**
 * __useCampaignReportsIdQuery__
 *
 * To run a query within a React component, call `useCampaignReportsIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignReportsIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignReportsIdQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */
export function useCampaignReportsIdQuery(baseOptions: Apollo.QueryHookOptions<CampaignReportsIdQuery, CampaignReportsIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignReportsIdQuery, CampaignReportsIdQueryVariables>(CampaignReportsIdDocument, options);
      }
export function useCampaignReportsIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignReportsIdQuery, CampaignReportsIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignReportsIdQuery, CampaignReportsIdQueryVariables>(CampaignReportsIdDocument, options);
        }
export type CampaignReportsIdQueryHookResult = ReturnType<typeof useCampaignReportsIdQuery>;
export type CampaignReportsIdLazyQueryHookResult = ReturnType<typeof useCampaignReportsIdLazyQuery>;
export type CampaignReportsIdQueryResult = Apollo.QueryResult<CampaignReportsIdQuery, CampaignReportsIdQueryVariables>;