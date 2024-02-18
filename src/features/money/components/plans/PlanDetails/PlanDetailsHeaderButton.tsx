import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { type ButtonProps } from '@/components/Button/types';

type UpgradeProps = Pick<ButtonProps, 'onClick'>;
export function UpgradeButton({ onClick }: UpgradeProps) {
  const { t } = useTranslation();

  return (
    <Button size="small" primary onClick={onClick}>
      {t('noumena.plan_details.upgrade')}
    </Button>
  );
}
