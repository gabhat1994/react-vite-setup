/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { GlobalPlanSettingsFragmentDoc } from '../fragments/globalPlanSettings.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GlobalPlanSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GlobalPlanSettingsQuery = { __typename?: 'Query', getPaymentSubscriptionSetting: Array<{ __typename?: 'SettingsOutput', settings_id: number, setting_name: string, setting_value_type: string, setting_value: string }> };


export const GlobalPlanSettingsDocument = gql`
    query globalPlanSettings {
  getPaymentSubscriptionSetting {
    ...GlobalPlanSettings
  }
}
    ${GlobalPlanSettingsFragmentDoc}`;

/**
 * __useGlobalPlanSettingsQuery__
 *
 * To run a query within a React component, call `useGlobalPlanSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalPlanSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalPlanSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalPlanSettingsQuery(baseOptions?: Apollo.QueryHookOptions<GlobalPlanSettingsQuery, GlobalPlanSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GlobalPlanSettingsQuery, GlobalPlanSettingsQueryVariables>(GlobalPlanSettingsDocument, options);
      }
export function useGlobalPlanSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GlobalPlanSettingsQuery, GlobalPlanSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GlobalPlanSettingsQuery, GlobalPlanSettingsQueryVariables>(GlobalPlanSettingsDocument, options);
        }
export type GlobalPlanSettingsQueryHookResult = ReturnType<typeof useGlobalPlanSettingsQuery>;
export type GlobalPlanSettingsLazyQueryHookResult = ReturnType<typeof useGlobalPlanSettingsLazyQuery>;
export type GlobalPlanSettingsQueryResult = Apollo.QueryResult<GlobalPlanSettingsQuery, GlobalPlanSettingsQueryVariables>;