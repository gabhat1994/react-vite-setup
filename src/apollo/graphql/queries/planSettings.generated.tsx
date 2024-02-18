/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { PlanSettingFragmentDoc } from '../fragments/planSettingsForComparision.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PlanSettingsQueryVariables = Types.Exact<{
  forPurchase: Types.Scalars['Boolean'];
}>;


export type PlanSettingsQuery = { __typename?: 'Query', getAllPlansDetails?: Array<{ __typename?: 'PlanSettingOutput', item_id: string, enabled: boolean, spotlight: boolean, plan_name?: string | null, description?: string | null, sort_index: number, category?: Types.Plan_Category_Enum | null, plan_setting_id: number, menuItems: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }>, noumSetting: { __typename?: 'PlanSettingNoumOutput', limits: Array<{ __typename?: 'PlanSettingNoumOptionsOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type> | null, resource: string, resourceType: string, control: string, settings?: Array<{ __typename?: 'PlanSettingNoumOptionsConfigureOutput', value: number, type?: string | null }> | null }>, tools: Array<{ __typename?: 'PlanSettingNoumOptionsOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type> | null, resource: string, resourceType: string, control: string, settings?: Array<{ __typename?: 'PlanSettingNoumOptionsConfigureOutput', value: number, type?: string | null }> | null }> }, financialProducts: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }>, learningProducts: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }>, plans: Array<{ __typename?: 'PlanItem', plan_id?: number | null, name?: string | null, external_name?: string | null, currency_code?: string | null, description?: string | null, status?: string | null, price?: number | null, period_unit?: string | null, plan_name_id?: string | null, trial_period?: number | null, plan_details?: Array<{ __typename?: 'PlanDetail', discount_percent?: number | null }> | null }> } | null> | null };


export const PlanSettingsDocument = gql`
    query planSettings($forPurchase: Boolean!) {
  getAllPlansDetails(forPurchase: $forPurchase) {
    ...PlanSetting
  }
}
    ${PlanSettingFragmentDoc}`;

/**
 * __usePlanSettingsQuery__
 *
 * To run a query within a React component, call `usePlanSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanSettingsQuery({
 *   variables: {
 *      forPurchase: // value for 'forPurchase'
 *   },
 * });
 */
export function usePlanSettingsQuery(baseOptions: Apollo.QueryHookOptions<PlanSettingsQuery, PlanSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlanSettingsQuery, PlanSettingsQueryVariables>(PlanSettingsDocument, options);
      }
export function usePlanSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlanSettingsQuery, PlanSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlanSettingsQuery, PlanSettingsQueryVariables>(PlanSettingsDocument, options);
        }
export type PlanSettingsQueryHookResult = ReturnType<typeof usePlanSettingsQuery>;
export type PlanSettingsLazyQueryHookResult = ReturnType<typeof usePlanSettingsLazyQuery>;
export type PlanSettingsQueryResult = Apollo.QueryResult<PlanSettingsQuery, PlanSettingsQueryVariables>;