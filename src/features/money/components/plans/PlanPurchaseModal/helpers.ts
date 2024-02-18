import { t } from 'i18next';
import { ModalSize } from '@/components/ExtendedModal';
import { type BreakPoints, type ModalType } from './types';

function getModalTitle(modalContent: ModalType, planName?: string) {
  switch (modalContent) {
    case 'plan-information':
    case 'plan-comparison':
      return t('noumena.money.subscription.subscription.purchaseplan.heading');
    case 'plan-customization':
      return t('noumena.plans.customize.plan.modal.heading');
    case 'plan-downgrade':
      return t('noumena.plans.downgrade.plan.modal.heading', { planName });
    case 'plan-upgrade':
      return t('noumena.plans.upgrade.plan.modal.heading', { planName });
    case 'noum-selection':
      return t('noumena.plans.noum.selection.modal.heading');
      return 'Update plan';
    default:
      throw Error('Invalid modal content');
  }
}

function getModalSize(modalContent: ModalType, allowSwipeMode: boolean) {
  switch (modalContent) {
    case 'plan-information':
      return allowSwipeMode ? ModalSize.XXL : ModalSize.XXL;
    case 'plan-comparison':
      return ModalSize.XXXL;
    case 'plan-customization':
      return ModalSize.XL;
    case 'noum-selection':
      return ModalSize.L;
    case 'plan-downgrade':
    case 'plan-upgrade':
      return ModalSize.M;
    default:
      throw Error('Invalid modal content');
  }
}

function isModalFullScreen(modalContent: ModalType, devices: BreakPoints) {
  switch (modalContent) {
    case 'plan-information':
    case 'plan-customization':
      return devices.isSmallerThanLaptop;
    case 'plan-comparison':
      return true;
    default:
      return devices.isMobile;
  }
}

export { getModalTitle, getModalSize, isModalFullScreen };
