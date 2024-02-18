import { t } from 'i18next';
import { PaymentStatusEnum } from '@/apollo/generated/types';
import { type TagTypeAndStatus } from '../types';

export function getTagTypeAndTransactionStatus(
  status: string,
): TagTypeAndStatus {
  switch (status) {
    case PaymentStatusEnum.Cancelled:
      return {
        tagType: 'tertiary',
        status: t('noumena.transaction.status.cancelled'),
      };
    case PaymentStatusEnum.Rejected:
      return {
        tagType: 'danger',
        status: t('noumena.transaction.status.failed'),
      };
    case PaymentStatusEnum.Processed:
      return {
        tagType: 'success',
        status: t('noumena.transaction.status.processed'),
      };
    default:
      return {
        tagType: 'secondary',
        status: t('noumena.transaction.status.inProgress'),
      };
  }
}
