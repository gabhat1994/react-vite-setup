/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type BasicPlanFragment = { __typename?: 'PlanSettingOutput', enabled: boolean, category?: Types.Plan_Category_Enum | null, sort_index: number, plan_setting_id: number, plans: Array<{ __typename?: 'PlanItem', plan_name_id?: string | null }> };

export const BasicPlanFragmentDoc = gql`
    fragment BasicPlan on PlanSettingOutput {
  enabled
  category
  sort_index
  plan_setting_id
  plans {
    plan_name_id
  }
}
    `;