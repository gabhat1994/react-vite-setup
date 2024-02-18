import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';

export const CopyEventLinkButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    tertiary
    size="small"
    onClick={onClick}
    tooltipText={t('noumena.social_hall.copy_link')}
    tooltipPosition="top-center"
  >
    <Icon name="link_m" size={20} color="--icon-button-neutral-default" />
  </Button>
);
