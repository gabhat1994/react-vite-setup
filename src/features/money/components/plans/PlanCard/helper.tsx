import { t } from 'i18next';
import { type UserAction } from '../PlanPurchaseModal/types';

function getButtonLabel(userAction: UserAction, planName: string) {
  switch (userAction) {
    case 'try':
      return t('noumena.plan.trial.button.text', { planName });
    case 'upgrade':
      return t('noumena.plan.upgrade.button.text', { planName });
    case 'downgrade':
      return t('noumena.plan.downgrade.button.text', { planName });
    default:
      throw Error('Invalid user action');
  }
}

export { getButtonLabel };
