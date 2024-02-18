import { Plan_Category_Enum } from '@/apollo/generated/types';
import { type GlobalPlanSettingsFragment } from '@/apollo/graphql/fragments/globalPlanSettings.generated';
import {
  type PlanSettingFragment,
  type PlanItemBasicFragment,
} from '@/apollo/graphql/fragments/planSettingsForComparision.generated';
import { type Maybe } from 'graphql/jsutils/Maybe';

function filterAndSortValidPlans(settings: PlanSettingFragment[]) {
  return settings
    .filter(
      (setting) =>
        setting.enabled && setting.category === Plan_Category_Enum.Membership,
    )
    .sort((a, b) => a.sort_index - b.sort_index);
}

function filterFrequencyForTrail(frequency: PlanItemBasicFragment[]) {
  return frequency.filter((plan) => !!plan.trial_period);
}

function filterForTrail(settings: PlanSettingFragment[]) {
  return settings.filter(
    (setting) => setting.enabled && filterFrequencyForTrail(setting.plans),
  );
}

function getGlobalSettings(data: Maybe<GlobalPlanSettingsFragment[]>) {
  return data?.find((setting) => setting.setting_name === 'PLAN_GLOBAL_SETING');
}

export const PlanFilerUtils = {
  filterForTrail,
  filterFrequencyForTrail,
  filterAndSortValidPlans,
  getGlobalSettings,
};
