/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignOfferIdQueryVariables = Types.Exact<{
  campaignId: Types.Scalars['String'];
  pagination?: Types.InputMaybe<Types.ChamberPaginationInput>;
}>;


export type CampaignOfferIdQuery = { __typename?: 'Query', getAdCampaignOffers: { __typename?: 'AdCampaignOfferPaginated', count: number, data: Array<{ __typename?: 'AdCampaignOffer', _id: string, createdAt: any, status: Types.EnumAdCampaignOfferStatus, oid: number }> } };


export const CampaignOfferIdDocument = gql`
    query campaignOfferId($campaignId: String!, $pagination: ChamberPaginationInput) {
  getAdCampaignOffers(campaignId: $campaignId, pagination: $pagination) {
    count
    data {
      _id
      createdAt
      status
      oid
    }
  }
}
    `;

/**
 * __useCampaignOfferIdQuery__
 *
 * To run a query within a React component, call `useCampaignOfferIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignOfferIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignOfferIdQuery({
 *   variables: {
 *      campaignId: // value for 'campaignId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useCampaignOfferIdQuery(baseOptions: Apollo.QueryHookOptions<CampaignOfferIdQuery, CampaignOfferIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignOfferIdQuery, CampaignOfferIdQueryVariables>(CampaignOfferIdDocument, options);
      }
export function useCampaignOfferIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignOfferIdQuery, CampaignOfferIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignOfferIdQuery, CampaignOfferIdQueryVariables>(CampaignOfferIdDocument, options);
        }
export type CampaignOfferIdQueryHookResult = ReturnType<typeof useCampaignOfferIdQuery>;
export type CampaignOfferIdLazyQueryHookResult = ReturnType<typeof useCampaignOfferIdLazyQuery>;
export type CampaignOfferIdQueryResult = Apollo.QueryResult<CampaignOfferIdQuery, CampaignOfferIdQueryVariables>;