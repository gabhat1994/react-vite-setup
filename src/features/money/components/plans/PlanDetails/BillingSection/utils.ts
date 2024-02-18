import { AllCurrencyEnum } from '@/apollo/generated/types';
import { type Maybe } from '@/common/types';
import convertToCurrency from '@/utils/currencyToCurrency';

export const BillingUtil = {
  generatePlanName: (plan_name: Maybe<string>) => {
    if (plan_name) {
      const words = plan_name.split(' ');
      if (words.length >= 2) {
        words.splice(-2);
        return words.join(' ');
      }
      return plan_name;
    }
    return '';
  },
  formatMoney: (amout: Maybe<number>) =>
    !!amout && convertToCurrency(amout / 100, AllCurrencyEnum.Usd, 2),
};
