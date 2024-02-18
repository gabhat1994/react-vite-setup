import { type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { Tag } from '@/components/Tag';
import { SowStatus } from '@/apollo/generated/types';
import { ContractStatus } from '../../types';

type TagProps = ComponentProps<typeof Tag>;

type DocumentStatusTagProps = {
  status: ContractStatus | SowStatus;
} & Pick<TagProps, 'size' | 'contentFont'>;

export function DocumentStatusTag({
  status,
  ...tagProps
}: DocumentStatusTagProps) {
  const { t } = useTranslation();
  switch (status) {
    case ContractStatus.Draft:
    case SowStatus.Draft:
      return (
        <Tag tertiary {...tagProps} border>
          {t('noumena.contracts.status.draft')}
        </Tag>
      );
    case ContractStatus.Issued:
    case SowStatus.Issued:
      return (
        <Tag warning {...tagProps} border>
          {t('noumena.contracts.status.sent')}
        </Tag>
      );
    case ContractStatus.Signed:
    case SowStatus.Signed:
      return (
        <Tag success {...tagProps} border>
          {t('noumena.contracts.status.signed')}
        </Tag>
      );
    default: {
      return null;
    }
  }
}
