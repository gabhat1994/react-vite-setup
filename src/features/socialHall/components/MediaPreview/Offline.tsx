import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { Icon } from '@/components/Icon';

export const Offline = () => (
  <Stack vertical align="center">
    <Icon imageIconName="low_connection_xs" size={40} />
    <TSpan
      font="body-m-bold"
      colorToken="--text-card-header-neutral-alt-default"
    >
      {t('noumena.social_hall.network.offline')}
    </TSpan>
  </Stack>
);
