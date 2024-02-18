/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CampaignSummaryFragmentDoc } from '../fragments/campaign.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignSummaryQueryVariables = Types.Exact<{
  campaignId: Types.Scalars['ID'];
}>;


export type CampaignSummaryQuery = { __typename?: 'Query', getSelectedAdCampaignDetails?: { __typename?: 'AdCampaignOutput', adId?: string | null, goals?: Array<string | null> | null, otherGoals?: string | null, budgetType?: string | null, budgetAmount?: number | null, _id?: string | null, title?: string | null, status?: string | null, startDate?: any | null, endDate?: any | null, audience?: { __typename?: 'AdCampaignAudienceOutput', targetLocation?: Array<string | null> | null, targetLanguage?: Array<string | null> | null, category?: Array<string | null> | null } | null, noumId?: { __typename?: 'SpaceOutput', _id?: string | null, profileImage?: string | null, name?: string | null, projectType?: string | null } | null } | null };


export const CampaignSummaryDocument = gql`
    query campaignSummary($campaignId: ID!) {
  getSelectedAdCampaignDetails(campaignId: $campaignId) {
    ...CampaignSummary
  }
}
    ${CampaignSummaryFragmentDoc}`;

/**
 * __useCampaignSummaryQuery__
 *
 * To run a query within a React component, call `useCampaignSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignSummaryQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */
export function useCampaignSummaryQuery(baseOptions: Apollo.QueryHookOptions<CampaignSummaryQuery, CampaignSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignSummaryQuery, CampaignSummaryQueryVariables>(CampaignSummaryDocument, options);
      }
export function useCampaignSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignSummaryQuery, CampaignSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignSummaryQuery, CampaignSummaryQueryVariables>(CampaignSummaryDocument, options);
        }
export type CampaignSummaryQueryHookResult = ReturnType<typeof useCampaignSummaryQuery>;
export type CampaignSummaryLazyQueryHookResult = ReturnType<typeof useCampaignSummaryLazyQuery>;
export type CampaignSummaryQueryResult = Apollo.QueryResult<CampaignSummaryQuery, CampaignSummaryQueryVariables>;