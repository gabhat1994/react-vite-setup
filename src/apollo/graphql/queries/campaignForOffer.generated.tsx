/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CampaignOfferBasicFragmentDoc } from '../fragments/campaign.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignForOfferQueryVariables = Types.Exact<{
  campaignId: Types.Scalars['ID'];
}>;


export type CampaignForOfferQuery = { __typename?: 'Query', getSelectedAdCampaignDetails?: { __typename?: 'AdCampaignOutput', status?: string | null, title?: string | null, adId?: string | null, startDate?: any | null, paymentRef?: { __typename?: 'PaymentOutput', paymentStatus?: string | null } | null, createdBy?: { __typename?: 'UserOutput', firstName?: string | null } | null, audience?: { __typename?: 'AdCampaignAudienceOutput', category?: Array<string | null> | null, targetLocation?: Array<string | null> | null, targetLanguage?: Array<string | null> | null } | null, noumId?: { __typename?: 'SpaceOutput', profileImage?: string | null, name?: string | null, projectType?: string | null } | null } | null };


export const CampaignForOfferDocument = gql`
    query campaignForOffer($campaignId: ID!) {
  getSelectedAdCampaignDetails(campaignId: $campaignId) {
    status
    paymentRef {
      paymentStatus
    }
    createdBy {
      firstName
    }
    ...CampaignOfferBasic
  }
}
    ${CampaignOfferBasicFragmentDoc}`;

/**
 * __useCampaignForOfferQuery__
 *
 * To run a query within a React component, call `useCampaignForOfferQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignForOfferQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignForOfferQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */
export function useCampaignForOfferQuery(baseOptions: Apollo.QueryHookOptions<CampaignForOfferQuery, CampaignForOfferQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignForOfferQuery, CampaignForOfferQueryVariables>(CampaignForOfferDocument, options);
      }
export function useCampaignForOfferLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignForOfferQuery, CampaignForOfferQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignForOfferQuery, CampaignForOfferQueryVariables>(CampaignForOfferDocument, options);
        }
export type CampaignForOfferQueryHookResult = ReturnType<typeof useCampaignForOfferQuery>;
export type CampaignForOfferLazyQueryHookResult = ReturnType<typeof useCampaignForOfferLazyQuery>;
export type CampaignForOfferQueryResult = Apollo.QueryResult<CampaignForOfferQuery, CampaignForOfferQueryVariables>;