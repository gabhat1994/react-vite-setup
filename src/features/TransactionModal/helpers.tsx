import { t } from 'i18next';
import { getFullName } from '@/utils/fullName';
import {
  type AccountListOutput,
  type CustomerPayeeList,
} from '@/apollo/generated/types';
import {
  ComponentStates,
  type TTransactionDestination,
  TransactionModalType,
} from './types';

export const isCustomerPayeeItem = (item: unknown): item is CustomerPayeeList =>
  (item as CustomerPayeeList)?.__typename === 'CustomerPayeeList';

export const isAccountPayeeItem = (item: unknown): item is AccountListOutput =>
  (item as AccountListOutput)?.__typename === 'AccountListOutput';

export const getCustomerName = (destination: TTransactionDestination) => {
  if (!destination) return '';
  return isAccountPayeeItem(destination) || isCustomerPayeeItem(destination)
    ? destination?.customerName || ''
    : destination?.__typename === 'AnswerOutput'
    ? getFullName(
        destination.user?.firstName,
        destination.user?.middleName,
        destination.user?.lastName,
      )
    : '';
};

export const getAccountId = (
  type: TransactionModalType,
  destination: TTransactionDestination,
) => {
  if (
    type === TransactionModalType.TRANSFER &&
    isAccountPayeeItem(destination)
  ) {
    return destination?.id || '';
  }
  if (type === TransactionModalType.PAY && isCustomerPayeeItem(destination)) {
    return destination.accountId || '';
  }
  if (type === TransactionModalType.PAY && isAccountPayeeItem(destination)) {
    return destination.id || '';
  }

  return '';
};

export const getModalTitle = (
  type: TransactionModalType,
  state: ComponentStates,
  destination: TTransactionDestination,
): string => {
  let titleByType = '';
  switch (type) {
    case TransactionModalType.TRANSFER:
      titleByType = t('noumena.money.transer');
      break;
    case TransactionModalType.PAY:
      titleByType = t('noumena.money.pay');
      break;
    case TransactionModalType.TIP:
      titleByType = t('noumena.quick_questions.tip');
      break;
    default:
      titleByType = '';
  }
  const customerName = getCustomerName(destination);
  switch (state) {
    case ComponentStates.PAYMENT_DESCRIPTION:
      return `${titleByType} ${customerName}`.trim();
    case ComponentStates.PAYMENT_REVIEW:
      return `${t('noumena.money.review')} ${titleByType}`.trim();
    case ComponentStates.PAYMENT_CONFIRM:
      return t('noumena.money.confirmTransaction');
    default:
      if (type === TransactionModalType.TIP)
        return `${titleByType} ${customerName}`.trim();
      return titleByType;
  }
};

export const getAmount = (amount?: number) => (amount ? String(amount) : '');
