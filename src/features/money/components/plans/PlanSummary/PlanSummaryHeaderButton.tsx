import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { type ButtonProps } from '@/components/Button/types';
import { Icon } from '@/components/Icon';

type PlanHistoryProps = Pick<ButtonProps, 'onClick'>;
export function ShowHistoryButton({ onClick }: PlanHistoryProps) {
  const { t } = useTranslation();

  return (
    <Button
      size="small"
      tertiary
      onClick={onClick}
      leftIcon={<Icon name="history_s" size={24} />}
    >
      {t('noumena.plan_summary.plan_history')}
    </Button>
  );
}

type AllTransactionProps = Pick<ButtonProps, 'onClick'>;
export function AllTransactionButton({ onClick }: AllTransactionProps) {
  const { t } = useTranslation();

  return (
    <Button
      size="small"
      tertiary
      onClick={onClick}
      leftIcon={<Icon name="transaction_s" size={24} />}
    >
      {t('noumena.plan_summary.all_transactions')}
    </Button>
  );
}
