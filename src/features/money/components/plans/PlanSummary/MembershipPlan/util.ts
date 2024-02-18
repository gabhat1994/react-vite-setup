import { Plan_Category_Enum } from '@/apollo/generated/types';
import { type Maybe } from '@/common/types';
import { differenceInCalendarDays } from 'date-fns';
import {
  MAX_VALUE_ABOUT_TO_EXPIRE_IN_DAYS,
  MIN_VALUE_ABOUT_TO_EXPIRE_IN_DAYS,
  EXPIRED,
} from './constant';

const countDaysToExpire = (date: string): number => {
  const now = new Date();
  const diff = differenceInCalendarDays(new Date(date), now);
  return diff;
};

export const PlanUtil = {
  countDaysToExpire,
  generatePlanName: (plan_name: Maybe<string>) => {
    if (plan_name) {
      const words = plan_name.split(' ');
      if (words.length === 2) {
        words.splice(-1);
        return words.join(' ');
      }
      if (words.length > 2) {
        words.splice(-2);
        return words.join(' ');
      }
      return plan_name;
    }
    return '';
  },
  showBillingFrequency: (plancategory: Maybe<Plan_Category_Enum>) =>
    !!plancategory && [Plan_Category_Enum.Membership].includes(plancategory),
  showTryPremiumBanner: (plancategory: Maybe<Plan_Category_Enum>) =>
    !!plancategory &&
    [
      Plan_Category_Enum.Free,
      Plan_Category_Enum.Payasgo,
      Plan_Category_Enum.Internal,
    ].includes(plancategory),
  hasTrialExpired: (status: Maybe<string>, date: string | null | undefined) =>
    !!status &&
    !!date &&
    status === 'INTRIAL' &&
    countDaysToExpire(date) <= EXPIRED,
  hasPlanExpired: (status: Maybe<string>, date: string | null | undefined) =>
    !!status &&
    !!date &&
    status !== 'INTRIAL' &&
    countDaysToExpire(date) <= EXPIRED,
  isTrialAboutToExpire: (
    status: Maybe<string>,
    date: string | null | undefined,
  ) =>
    !!status &&
    !!date &&
    status === 'INTRIAL' &&
    countDaysToExpire(date) <= MAX_VALUE_ABOUT_TO_EXPIRE_IN_DAYS &&
    countDaysToExpire(date) >= MIN_VALUE_ABOUT_TO_EXPIRE_IN_DAYS,
  isPlanAboutToExpire: (
    status: Maybe<string>,
    date: string | null | undefined,
  ) =>
    !!status &&
    !!date &&
    status !== 'INTRIAL' &&
    countDaysToExpire(date) <= MAX_VALUE_ABOUT_TO_EXPIRE_IN_DAYS &&
    countDaysToExpire(date) >= MIN_VALUE_ABOUT_TO_EXPIRE_IN_DAYS,
};
