/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CampaignOfferFragmentDoc } from '../fragments/campaignOffer.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignOfferByIdQueryVariables = Types.Exact<{
  offerId: Types.Scalars['String'];
}>;


export type CampaignOfferByIdQuery = { __typename?: 'Query', getAdCampaignOfferOne: { __typename?: 'AdCampaignOffer', _id: string, startAt?: any | null, costTotal?: number | null, costWeekly?: number | null, clicksWeekly?: number | null, cpc?: number | null, reachTotal?: number | null, status: Types.EnumAdCampaignOfferStatus, createdAt: any, message?: string | null, updatedAt: any, endAt?: any | null, oid: number, createdBy?: { __typename?: 'UserOutput', firstName?: string | null, lastName?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null } | null } | null, goalNoumVisibility?: { __typename?: 'AdCampaignOfferGoalsNoumVisibility', currentViews?: number | null, predictedViews?: number | null } | null, goalConnectedUsers?: { __typename?: 'AdCampaignOfferGoalsConnectedUsers', currentUsers?: number | null, predictedUsers?: number | null, currentFollowers?: number | null, predictedFollowers?: number | null } | null } };


export const CampaignOfferByIdDocument = gql`
    query campaignOfferById($offerId: String!) {
  getAdCampaignOfferOne(id: $offerId) {
    ...CampaignOffer
  }
}
    ${CampaignOfferFragmentDoc}`;

/**
 * __useCampaignOfferByIdQuery__
 *
 * To run a query within a React component, call `useCampaignOfferByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignOfferByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignOfferByIdQuery({
 *   variables: {
 *      offerId: // value for 'offerId'
 *   },
 * });
 */
export function useCampaignOfferByIdQuery(baseOptions: Apollo.QueryHookOptions<CampaignOfferByIdQuery, CampaignOfferByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignOfferByIdQuery, CampaignOfferByIdQueryVariables>(CampaignOfferByIdDocument, options);
      }
export function useCampaignOfferByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignOfferByIdQuery, CampaignOfferByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignOfferByIdQuery, CampaignOfferByIdQueryVariables>(CampaignOfferByIdDocument, options);
        }
export type CampaignOfferByIdQueryHookResult = ReturnType<typeof useCampaignOfferByIdQuery>;
export type CampaignOfferByIdLazyQueryHookResult = ReturnType<typeof useCampaignOfferByIdLazyQuery>;
export type CampaignOfferByIdQueryResult = Apollo.QueryResult<CampaignOfferByIdQuery, CampaignOfferByIdQueryVariables>;