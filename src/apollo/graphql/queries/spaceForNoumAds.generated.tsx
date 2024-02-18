/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SpaceForNoumAdsFragmentDoc } from '../fragments/campaign.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SpaceForNoumAdsQueryVariables = Types.Exact<{
  campaign: Types.Scalars['ID'];
}>;


export type SpaceForNoumAdsQuery = { __typename?: 'Query', getSelectedAdCampaignDetails?: { __typename?: 'AdCampaignOutput', noumId?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, description?: string | null, slug?: string | null, enableAds?: boolean | null, keywords?: Array<string | null> | null } | null } | null };


export const SpaceForNoumAdsDocument = gql`
    query SpaceForNoumAds($campaign: ID!) {
  getSelectedAdCampaignDetails(campaignId: $campaign) {
    noumId {
      ...SpaceForNoumAds
      _id
    }
  }
}
    ${SpaceForNoumAdsFragmentDoc}`;

/**
 * __useSpaceForNoumAdsQuery__
 *
 * To run a query within a React component, call `useSpaceForNoumAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceForNoumAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceForNoumAdsQuery({
 *   variables: {
 *      campaign: // value for 'campaign'
 *   },
 * });
 */
export function useSpaceForNoumAdsQuery(baseOptions: Apollo.QueryHookOptions<SpaceForNoumAdsQuery, SpaceForNoumAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpaceForNoumAdsQuery, SpaceForNoumAdsQueryVariables>(SpaceForNoumAdsDocument, options);
      }
export function useSpaceForNoumAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpaceForNoumAdsQuery, SpaceForNoumAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpaceForNoumAdsQuery, SpaceForNoumAdsQueryVariables>(SpaceForNoumAdsDocument, options);
        }
export type SpaceForNoumAdsQueryHookResult = ReturnType<typeof useSpaceForNoumAdsQuery>;
export type SpaceForNoumAdsLazyQueryHookResult = ReturnType<typeof useSpaceForNoumAdsLazyQuery>;
export type SpaceForNoumAdsQueryResult = Apollo.QueryResult<SpaceForNoumAdsQuery, SpaceForNoumAdsQueryVariables>;