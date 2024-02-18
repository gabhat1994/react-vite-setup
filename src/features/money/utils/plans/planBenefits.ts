import { find, map, merge } from 'lodash';

import {
  type SettingItemFragment,
  type PlanSettingFragment,
  type NoumOptionsFragment,
} from '@/apollo/graphql/fragments/planSettingsForComparision.generated';

import { cleanList } from '@/utils/list';

import { type Maybe } from 'graphql/jsutils/Maybe';
import { type SettingsForSubscriptionFragment } from '@/apollo/graphql/fragments/subscription.generated';
import {
  type GlobalSettingItem,
  type GlobalSettingObject,
} from '../../components/plans/PlanPurchaseModal/types';

import { isFeatureIncluded } from './planComparison';

type GetPlanBenefitsProps = {
  globalSetting?: GlobalSettingObject;
  planSetting?: Maybe<PlanSettingFragment | SettingsForSubscriptionFragment>;
};

type Benefit = {
  label: string;
  isIncluded: boolean;
};

type MergeSettings = {
  global: GlobalSettingItem[];
  plan: SettingItemFragment[] | NoumOptionsFragment[];
};

type MergeSettingsReturn =
  | (SettingItemFragment & GlobalSettingItem)[]
  | (NoumOptionsFragment & GlobalSettingItem)[];

export function getPlanBenefits({
  globalSetting,
  planSetting,
}: GetPlanBenefitsProps) {
  const benefitList: Benefit[] = [];

  if (!globalSetting || !planSetting) {
    return benefitList;
  }

  const {
    financialProducts,
    menuItems: planMenu,
    noumSetting: { limits: planNoumLimit, tools: planTools },
  } = planSetting;

  const {
    menuItems: globalMenu,
    noumSetting: { tools: globalTools },
  } = globalSetting;

  const noumSetupSetting = planNoumLimit?.find(
    (setting) => setting.id === 'noumSetupLimit',
  );

  const noumSetups = noumSetupSetting?.settings?.[0]?.value || 0;

  const hasFinancialProductAccess = financialProducts.some((setting) =>
    isFeatureIncluded(cleanList(setting.action)),
  );

  const totalNumberOfTools = planTools.length;

  const numberOfToolsAccess = planTools.filter((setting) =>
    isFeatureIncluded(cleanList(setting.action)),
  ).length;

  const globalMenuItems = filterEnabledMenu(globalMenu);

  benefitList.push(
    {
      label: `Free ${noumSetups} Noum Setups`,
      isIncluded: true,
    },
    {
      label: `${numberOfToolsAccess} of ${totalNumberOfTools} Basic Tools`,
      isIncluded: !!numberOfToolsAccess,
    },
    {
      label: 'Access to Financial Products',
      isIncluded: hasFinancialProductAccess,
    },
  );

  if (globalMenuItems && planMenu) {
    const mergedMenu = mergeSettings({
      global: globalMenuItems,
      plan: planMenu,
    });

    if (mergedMenu) {
      benefitList.push({
        label: mergedMenu[0].label,
        isIncluded: isFeatureIncluded(cleanList(mergedMenu[0].action)),
      });
    }
  }

  const globalToolsItems = filterEnabledMenu(globalTools);

  if (globalToolsItems && planTools) {
    const mergedTools = mergeSettings({
      global: globalToolsItems,
      plan: planTools,
    });

    if (mergedTools) {
      benefitList.push({
        label: mergedTools[0].label,
        isIncluded: isFeatureIncluded(cleanList(mergedTools[0].action)),
      });
      benefitList.push({
        label: mergedTools[1].label,
        isIncluded: isFeatureIncluded(cleanList(mergedTools[1].action)),
      });
    }
  }

  return benefitList;
}

function mergeSettings({ global, plan }: MergeSettings) {
  const mergedSettings = map(global, (globalLevelSetting) => {
    const planLevelSetting = find(plan, {
      id: globalLevelSetting.id,
    });

    return merge({}, planLevelSetting, globalLevelSetting);
  });

  return mergedSettings as MergeSettingsReturn;
}

function filterEnabledMenu(menu: GlobalSettingItem[]) {
  return menu.filter((item) => item.enabledOnPurchaseScreen);
}
