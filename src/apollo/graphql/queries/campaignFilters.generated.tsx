/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumDropDownListFragmentDoc } from '../fragments/campaign.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignFiltersQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.AdCampaignSettingsInput>;
}>;


export type CampaignFiltersQuery = { __typename?: 'Query', status?: { __typename?: 'AdCampaignSettingsOutput', settingsValue?: any | null } | null, noums?: Array<{ __typename?: 'AdCampaignOutput', noumId?: { __typename?: 'SpaceOutput', _id?: string | null, profileImage?: string | null, name?: string | null, projectType?: string | null } | null } | null> | null };


export const CampaignFiltersDocument = gql`
    query campaignFilters($input: AdCampaignSettingsInput) {
  status: getAdCampaignSettings(input: $input) {
    settingsValue
  }
  noums: getDistinctNoumAdCampaigns {
    noumId {
      ...NoumDropDownList
    }
  }
}
    ${NoumDropDownListFragmentDoc}`;

/**
 * __useCampaignFiltersQuery__
 *
 * To run a query within a React component, call `useCampaignFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignFiltersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCampaignFiltersQuery(baseOptions?: Apollo.QueryHookOptions<CampaignFiltersQuery, CampaignFiltersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignFiltersQuery, CampaignFiltersQueryVariables>(CampaignFiltersDocument, options);
      }
export function useCampaignFiltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignFiltersQuery, CampaignFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignFiltersQuery, CampaignFiltersQueryVariables>(CampaignFiltersDocument, options);
        }
export type CampaignFiltersQueryHookResult = ReturnType<typeof useCampaignFiltersQuery>;
export type CampaignFiltersLazyQueryHookResult = ReturnType<typeof useCampaignFiltersLazyQuery>;
export type CampaignFiltersQueryResult = Apollo.QueryResult<CampaignFiltersQuery, CampaignFiltersQueryVariables>;