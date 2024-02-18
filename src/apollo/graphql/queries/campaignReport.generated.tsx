/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CampaignReportFragmentDoc } from '../fragments/campaign.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignReportQueryVariables = Types.Exact<{
  campaignId: Types.Scalars['ID'];
  reportId: Types.Scalars['String'];
}>;


export type CampaignReportQuery = { __typename?: 'Query', campaign?: { __typename?: 'AdCampaignOutput', title?: string | null, createdAt: any, adId?: string | null, createdBy?: { __typename?: 'UserOutput', firstName?: string | null } | null } | null, report: { __typename?: 'AdCampaignReportOutput', clientMessage?: string | null, _id?: string | null, reportId?: string | null, createdAt?: any | null, reportDate?: any | null, metrics?: { __typename?: 'AdCampaignReportMetricsOutput', clicks?: number | null, impressions?: number | null, ctr?: number | null, avgCPC?: number | null, cost?: number | null } | null, createdBy?: { __typename?: 'UserOutput', firstName?: string | null, lastName?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null } | null } | null } };


export const CampaignReportDocument = gql`
    query campaignReport($campaignId: ID!, $reportId: String!) {
  campaign: getSelectedAdCampaignDetails(campaignId: $campaignId) {
    title
    createdAt
    adId
    createdBy {
      firstName
    }
  }
  report: getAdCampaignReportOne(id: $reportId) {
    ...CampaignReport
  }
}
    ${CampaignReportFragmentDoc}`;

/**
 * __useCampaignReportQuery__
 *
 * To run a query within a React component, call `useCampaignReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignReportQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *      reportId: // value for 'reportId'
 *   },
 * });
 */
export function useCampaignReportQuery(baseOptions: Apollo.QueryHookOptions<CampaignReportQuery, CampaignReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignReportQuery, CampaignReportQueryVariables>(CampaignReportDocument, options);
      }
export function useCampaignReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignReportQuery, CampaignReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignReportQuery, CampaignReportQueryVariables>(CampaignReportDocument, options);
        }
export type CampaignReportQueryHookResult = ReturnType<typeof useCampaignReportQuery>;
export type CampaignReportLazyQueryHookResult = ReturnType<typeof useCampaignReportLazyQuery>;
export type CampaignReportQueryResult = Apollo.QueryResult<CampaignReportQuery, CampaignReportQueryVariables>;