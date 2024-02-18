import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import { Spinner } from '@/components/Spinner';
import { SpinnerContainer } from './styles';

export const Reconnecting = () => (
  <Stack vertical align="center">
    <SpinnerContainer>
      <Spinner color="var(--text-card-header-neutral-alt-default)" />
    </SpinnerContainer>
    <Spacer height={24} />
    <TSpan
      font="body-m-bold"
      colorToken="--text-card-header-neutral-alt-default"
    >
      {t('noumena.social_hall.network.reconnecting')}
    </TSpan>
  </Stack>
);
