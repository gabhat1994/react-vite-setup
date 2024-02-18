import { type ChargebeeAnchorsQuery } from '@/apollo/graphql';
import { type BasicPlanFragment } from '@/apollo/graphql/fragments/basicPlan.generated';
import { type SubscriptionFragment } from '@/apollo/graphql/fragments/subscription.generated';
import { type Maybe } from 'graphql/jsutils/Maybe';

import { cleanList } from '@/utils/list';
import { Plan_Category_Enum } from '@/apollo/generated/types';
import { type NoumData } from '@/screens/Chamber/components/modals/ProjectCreate/types';
import routes from '@/constants/routes';

function getEnabledAndSortedAnchors(anchors?: ChargebeeAnchorsQuery) {
  return cleanList(anchors?.getAllPlansDetails)
    .filter((anchor) => anchor.enabled)
    .sort((a, b) => a.sort_index - b.sort_index);
}

function isLastPlanInHierarchy(
  existingPlan?: Maybe<SubscriptionFragment>,
  lastPlan?: Maybe<BasicPlanFragment>,
) {
  return existingPlan?.settings?.plan_setting_id === lastPlan?.plan_setting_id;
}

function isFirstPlanInHierarchy(
  existingPlan?: Maybe<SubscriptionFragment>,
  firstPlan?: Maybe<BasicPlanFragment>,
) {
  return existingPlan?.settings?.plan_setting_id === firstPlan?.plan_setting_id;
}

function isPayAsYouGoPlan(existingPlan?: Maybe<SubscriptionFragment>) {
  return existingPlan?.plan_category === Plan_Category_Enum.Payasgo;
}

function getRedirectionUrl(
  newNoumData?: NoumData,
  planNameId?: Maybe<string>,
  chamberIdForUnarchive?: Maybe<string>,
) {
  if (chamberIdForUnarchive) {
    return `${window.location.origin}${routes.AUTO_CREATE_OR_UNARCHIVE_NOUM}?chamberIdForUnarchive=${chamberIdForUnarchive}&planNameId=${planNameId}`;
  }

  if (newNoumData) {
    return `${window.location.origin}${
      routes.AUTO_CREATE_OR_UNARCHIVE_NOUM
    }?newNoumData=${JSON.stringify(newNoumData)}&planNameId=${planNameId}`;
  }

  return `${window.location.origin}${routes.MY_PLAN}`;
}

function isFreePlan(existingPlan?: Maybe<SubscriptionFragment>) {
  return existingPlan?.plan_category === Plan_Category_Enum.Free;
}

export const ChargebeeUtils = {
  getEnabledAndSortedAnchors,
  isLastPlanInHierarchy,
  isFirstPlanInHierarchy,
  isPayAsYouGoPlan,
  getRedirectionUrl,
  isFreePlan,
};
