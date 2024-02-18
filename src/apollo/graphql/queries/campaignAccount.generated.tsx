/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CampaignAccountFragmentDoc } from '../fragments/campaign.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignAccountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CampaignAccountQuery = { __typename?: 'Query', getCampaignAccount?: { __typename?: 'CampaignAccountOutput', id: string, accountName?: string | null, customerName?: string | null, walletName?: string | null, accountType?: Types.AccountType | null, maskAccountNumber?: string | null, primary?: boolean | null } | null };


export const CampaignAccountDocument = gql`
    query campaignAccount {
  getCampaignAccount {
    ...CampaignAccount
  }
}
    ${CampaignAccountFragmentDoc}`;

/**
 * __useCampaignAccountQuery__
 *
 * To run a query within a React component, call `useCampaignAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useCampaignAccountQuery(baseOptions?: Apollo.QueryHookOptions<CampaignAccountQuery, CampaignAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignAccountQuery, CampaignAccountQueryVariables>(CampaignAccountDocument, options);
      }
export function useCampaignAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignAccountQuery, CampaignAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignAccountQuery, CampaignAccountQueryVariables>(CampaignAccountDocument, options);
        }
export type CampaignAccountQueryHookResult = ReturnType<typeof useCampaignAccountQuery>;
export type CampaignAccountLazyQueryHookResult = ReturnType<typeof useCampaignAccountLazyQuery>;
export type CampaignAccountQueryResult = Apollo.QueryResult<CampaignAccountQuery, CampaignAccountQueryVariables>;