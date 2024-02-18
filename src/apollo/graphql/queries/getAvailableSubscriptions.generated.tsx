/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SubscriptionFragmentDoc } from '../fragments/subscription.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAvailableSubscriptionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAvailableSubscriptionsQuery = { __typename?: 'Query', getAvailableSubscriptions: Array<{ __typename?: 'SubscriptionOutput', status: string, activated_at?: string | null, billing_period: string, billing_cycles?: number | null, next_billing_at?: string | null, current_term_start?: string | null, current_term_end?: string | null, subscription_id: number, billing_period_unit: string, plan_id: number, uid: string, plan_name?: string | null, plan_type?: string | null, valid_till?: string | null, plan_category?: Types.Plan_Category_Enum | null, plan_price?: number | null, settings?: { __typename?: 'SubSettingOutput', plan_setting_id: number, description?: string | null, menuItems: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }>, noumSetting: { __typename?: 'PlanSettingNoumOutput', limits: Array<{ __typename?: 'PlanSettingNoumOptionsOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type> | null, resource: string, resourceType: string, control: string, settings?: Array<{ __typename?: 'PlanSettingNoumOptionsConfigureOutput', value: number, type?: string | null }> | null }>, tools: Array<{ __typename?: 'PlanSettingNoumOptionsOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type> | null, resource: string, resourceType: string, control: string, settings?: Array<{ __typename?: 'PlanSettingNoumOptionsConfigureOutput', value: number, type?: string | null }> | null }> }, financialProducts: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }>, learningProducts: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }> } | null, counters?: { __typename?: 'SubSettingCountersOutput', noumSetup: { __typename?: 'SubSettingCounterOptionsOutput', current: number, limit: number } } | null }> };


export const GetAvailableSubscriptionsDocument = gql`
    query getAvailableSubscriptions {
  getAvailableSubscriptions {
    ...Subscription
  }
}
    ${SubscriptionFragmentDoc}`;

/**
 * __useGetAvailableSubscriptionsQuery__
 *
 * To run a query within a React component, call `useGetAvailableSubscriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableSubscriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableSubscriptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAvailableSubscriptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAvailableSubscriptionsQuery, GetAvailableSubscriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAvailableSubscriptionsQuery, GetAvailableSubscriptionsQueryVariables>(GetAvailableSubscriptionsDocument, options);
      }
export function useGetAvailableSubscriptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAvailableSubscriptionsQuery, GetAvailableSubscriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAvailableSubscriptionsQuery, GetAvailableSubscriptionsQueryVariables>(GetAvailableSubscriptionsDocument, options);
        }
export type GetAvailableSubscriptionsQueryHookResult = ReturnType<typeof useGetAvailableSubscriptionsQuery>;
export type GetAvailableSubscriptionsLazyQueryHookResult = ReturnType<typeof useGetAvailableSubscriptionsLazyQuery>;
export type GetAvailableSubscriptionsQueryResult = Apollo.QueryResult<GetAvailableSubscriptionsQuery, GetAvailableSubscriptionsQueryVariables>;