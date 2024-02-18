/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SettingItemFragmentDoc, NoumSettingFragmentDoc } from './planSettingsForComparision.generated';
export type SettingsForSubscriptionFragment = { __typename?: 'SubSettingOutput', plan_setting_id: number, description?: string | null, menuItems: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }>, noumSetting: { __typename?: 'PlanSettingNoumOutput', limits: Array<{ __typename?: 'PlanSettingNoumOptionsOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type> | null, resource: string, resourceType: string, control: string, settings?: Array<{ __typename?: 'PlanSettingNoumOptionsConfigureOutput', value: number, type?: string | null }> | null }>, tools: Array<{ __typename?: 'PlanSettingNoumOptionsOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type> | null, resource: string, resourceType: string, control: string, settings?: Array<{ __typename?: 'PlanSettingNoumOptionsConfigureOutput', value: number, type?: string | null }> | null }> }, financialProducts: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }>, learningProducts: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }> };

export type SubscriptionFragment = { __typename?: 'SubscriptionOutput', status: string, activated_at?: string | null, billing_period: string, billing_cycles?: number | null, next_billing_at?: string | null, current_term_start?: string | null, current_term_end?: string | null, subscription_id: number, billing_period_unit: string, plan_id: number, uid: string, plan_name?: string | null, plan_type?: string | null, valid_till?: string | null, plan_category?: Types.Plan_Category_Enum | null, plan_price?: number | null, settings?: { __typename?: 'SubSettingOutput', plan_setting_id: number, description?: string | null, menuItems: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }>, noumSetting: { __typename?: 'PlanSettingNoumOutput', limits: Array<{ __typename?: 'PlanSettingNoumOptionsOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type> | null, resource: string, resourceType: string, control: string, settings?: Array<{ __typename?: 'PlanSettingNoumOptionsConfigureOutput', value: number, type?: string | null }> | null }>, tools: Array<{ __typename?: 'PlanSettingNoumOptionsOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type> | null, resource: string, resourceType: string, control: string, settings?: Array<{ __typename?: 'PlanSettingNoumOptionsConfigureOutput', value: number, type?: string | null }> | null }> }, financialProducts: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }>, learningProducts: Array<{ __typename?: 'PlanSettingItemOutput', id?: string | null, label: string, action?: Array<Types.Plan_Setting_Action_Type | null> | null, resource: string, resourceType: string, control: string }> } | null, counters?: { __typename?: 'SubSettingCountersOutput', noumSetup: { __typename?: 'SubSettingCounterOptionsOutput', current: number, limit: number } } | null };

export type SubscriptionInvoicesFragment = { __typename?: 'InvoiceDetail', external_invoice_id?: string | null, invoice_id?: number | null, plan_name?: string | null, issue_date?: string | null, first_invoice?: boolean | null, amount_paid?: number | null, plan_type?: string | null, payment_method?: string | null, payment_method_details?: string | null, status?: string | null, total?: number | null };

export type SubscriptionAfterCreatePlanFragment = { __typename?: 'SubscriptionOutput', subscription_id: number, status: string };

export const SettingsForSubscriptionFragmentDoc = gql`
    fragment SettingsForSubscription on SubSettingOutput {
  plan_setting_id
  description
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
}
    ${SettingItemFragmentDoc}
${NoumSettingFragmentDoc}`;
export const SubscriptionFragmentDoc = gql`
    fragment Subscription on SubscriptionOutput {
  status
  activated_at
  billing_period
  billing_cycles
  next_billing_at
  current_term_start
  current_term_end
  subscription_id
  billing_period_unit
  plan_id
  uid
  plan_name
  plan_type
  valid_till
  plan_category
  plan_price
  settings {
    ...SettingsForSubscription
  }
  counters {
    noumSetup {
      current
      limit
    }
  }
}
    ${SettingsForSubscriptionFragmentDoc}`;
export const SubscriptionInvoicesFragmentDoc = gql`
    fragment SubscriptionInvoices on InvoiceDetail {
  external_invoice_id
  invoice_id
  plan_name
  issue_date
  first_invoice
  amount_paid
  plan_type
  payment_method
  payment_method_details
  status
  total
}
    `;
export const SubscriptionAfterCreatePlanFragmentDoc = gql`
    fragment SubscriptionAfterCreatePlan on SubscriptionOutput {
  subscription_id
  status
}
    `;