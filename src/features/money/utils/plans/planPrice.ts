import { t } from 'i18next';
import { type PlanItemBasicFragment } from '@/apollo/graphql/fragments/planSettingsForComparision.generated';
import { PlanFrequency } from '../../components/plans/PlanPurchaseModal/types';

const toFixNumber = (number: number) => Number(number.toFixed(2));

const convertYearlyPriceIntoMonthlyPrice = (price: number) => price / 12;
const convertDailyPriceIntoMonthlyPrice = (price: number) => price * 30;
const convertWeeklyPriceIntoMonthlyPrice = (price: number) => price * 4;

const convertCentsToDollars = (cents: number) =>
  Number((cents / 100).toFixed(2));

const getLowestPlanPrice = (plans: PlanItemBasicFragment[]) => {
  const monthlyPriceArray: number[] = [];
  plans.forEach((plan) => {
    monthlyPriceArray.push(getPlanPrice(plan));
  });
  return Math.min(...monthlyPriceArray);
};

const getPlanPrice = (plan: PlanItemBasicFragment) => {
  const price = plan.price || 0;
  switch (plan.period_unit) {
    case PlanFrequency.DAY:
      return toFixNumber(convertDailyPriceIntoMonthlyPrice(price));
    case PlanFrequency.WEEK:
      return toFixNumber(convertWeeklyPriceIntoMonthlyPrice(price));
    case PlanFrequency.MONTH:
      return toFixNumber(price);
    case PlanFrequency.YEAR:
      return toFixNumber(convertYearlyPriceIntoMonthlyPrice(price));
    default:
      return 0;
  }
};

const getPlanFrequencyText = (plan: PlanItemBasicFragment) => {
  switch (plan.period_unit) {
    case PlanFrequency.DAY:
      return t('noumena.daily');
    case PlanFrequency.WEEK:
      return t('noumena.weekly');
    case PlanFrequency.MONTH:
      return t('noumena.monthly');
    case PlanFrequency.YEAR:
      return t('noumena.yearly');
    default:
      return '';
  }
};
const sortFrequencies = (
  a: PlanItemBasicFragment,
  b: PlanItemBasicFragment,
) => {
  if (!a.period_unit || !b.period_unit) return 0;
  const order = [
    PlanFrequency.YEAR,
    PlanFrequency.MONTH,
    PlanFrequency.WEEK,
    PlanFrequency.DAY,
  ];
  const indexA = order.indexOf(a.period_unit as PlanFrequency);
  const indexB = order.indexOf(b.period_unit as PlanFrequency);
  return indexA - indexB;
};
// const sortedData = data.sort(customSort);

export const PlanPriceUtils = {
  convertCentsToDollars,
  convertYearlyPriceIntoMonthlyPrice,
  getLowestPlanPrice,
  getPlanPrice,
  getPlanFrequencyText,
  sortFrequencies,
};
