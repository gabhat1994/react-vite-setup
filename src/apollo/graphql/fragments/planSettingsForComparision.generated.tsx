/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type SettingItemFragment = { __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string };

export type NoumOptionsFragment = { __typename?: 'PlanSettingNoumOptionsOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type> | null, resource: string, resourceType: string, control: string, settings?: Array<{ __typename?: 'PlanSettingNoumOptionsConfigureOutput', value: number, type?: string | null }> | null };

export type NoumSettingFragment = { __typename?: 'PlanSettingNoumOutput', limits: Array<{ __typename?: 'PlanSettingNoumOptionsOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type> | null, resource: string, resourceType: string, control: string, settings?: Array<{ __typename?: 'PlanSettingNoumOptionsConfigureOutput', value: number, type?: string | null }> | null }>, tools: Array<{ __typename?: 'PlanSettingNoumOptionsOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type> | null, resource: string, resourceType: string, control: string, settings?: Array<{ __typename?: 'PlanSettingNoumOptionsConfigureOutput', value: number, type?: string | null }> | null }> };

export type PlanSettingBasicFragment = { __typename?: 'PlanSettingOutput', item_id: string, enabled: boolean, spotlight: boolean, plan_name?: string | null, description?: string | null, sort_index: number, category?: Types.Plan_Category_Enum | null, plan_setting_id: number };

export type PlanItemBasicFragment = { __typename?: 'PlanItem', plan_id?: number | null, name?: string | null, external_name?: string | null, currency_code?: string | null, description?: string | null, status?: string | null, price?: number | null, period_unit?: string | null, plan_name_id?: string | null, trial_period?: number | null, plan_details?: Array<{ __typename?: 'PlanDetail', discount_percent?: number | null }> | null };

export type PlanSettingFragment = { __typename?: 'PlanSettingOutput', item_id: string, enabled: boolean, spotlight: boolean, plan_name?: string | null, description?: string | null, sort_index: number, category?: Types.Plan_Category_Enum | null, plan_setting_id: number, menuItems: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }>, noumSetting: { __typename?: 'PlanSettingNoumOutput', limits: Array<{ __typename?: 'PlanSettingNoumOptionsOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type> | null, resource: string, resourceType: string, control: string, settings?: Array<{ __typename?: 'PlanSettingNoumOptionsConfigureOutput', value: number, type?: string | null }> | null }>, tools: Array<{ __typename?: 'PlanSettingNoumOptionsOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type> | null, resource: string, resourceType: string, control: string, settings?: Array<{ __typename?: 'PlanSettingNoumOptionsConfigureOutput', value: number, type?: string | null }> | null }> }, financialProducts: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }>, learningProducts: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }>, plans: Array<{ __typename?: 'PlanItem', plan_id?: number | null, name?: string | null, external_name?: string | null, currency_code?: string | null, description?: string | null, status?: string | null, price?: number | null, period_unit?: string | null, plan_name_id?: string | null, trial_period?: number | null, plan_details?: Array<{ __typename?: 'PlanDetail', discount_percent?: number | null }> | null }> };

export const PlanSettingBasicFragmentDoc = gql`
    fragment PlanSettingBasic on PlanSettingOutput {
  item_id
  enabled
  spotlight
  plan_name
  description
  sort_index
  category
  plan_setting_id
}
    `;
export const SettingItemFragmentDoc = gql`
    fragment SettingItem on PlanSettingItemOutput {
  id
  label
  action
  resource
  resourceType
  control
}
    `;
export const NoumOptionsFragmentDoc = gql`
    fragment NoumOptions on PlanSettingNoumOptionsOutput {
  id
  label
  action
  resource
  resourceType
  control
  settings {
    value
    type
  }
}
    `;
export const NoumSettingFragmentDoc = gql`
    fragment NoumSetting on PlanSettingNoumOutput {
  limits {
    ...NoumOptions
  }
  tools {
    ...NoumOptions
  }
}
    ${NoumOptionsFragmentDoc}`;
export const PlanItemBasicFragmentDoc = gql`
    fragment PlanItemBasic on PlanItem {
  plan_id
  name
  external_name
  currency_code
  description
  status
  price
  period_unit
  plan_name_id
  trial_period
  plan_details {
    discount_percent
  }
}
    `;
export const PlanSettingFragmentDoc = gql`
    fragment PlanSetting on PlanSettingOutput {
  ...PlanSettingBasic
  menuItems {
    ...SettingItem
  }
  noumSetting {
    ...NoumSetting
  }
  financialProducts {
    ...SettingItem
  }
  learningProducts {
    ...SettingItem
  }
  plans {
    ...PlanItemBasic
  }
}
    ${PlanSettingBasicFragmentDoc}
${SettingItemFragmentDoc}
${NoumSettingFragmentDoc}
${PlanItemBasicFragmentDoc}`;