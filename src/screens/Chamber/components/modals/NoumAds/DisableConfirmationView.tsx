import { TSpan } from '@/components/Typography';

import { t } from 'i18next';
import { Spacer, Stack } from '@/layout';
import { type DisableConfirmationProps } from './types';
import { AlisWrapper } from './styles';

export const DisableConfirmationView = ({
  isMobile,
  url,
}: DisableConfirmationProps) => (
  <>
    <Stack fullWidth style={{ padding: isMobile ? '0 16px' : undefined }}>
      <TSpan
        colorToken="--text-modal-neutral-default"
        font="body-l"
        textAlign="center"
      >
        {t(`noumena.chamber_edit.noum_ads.disable.confirmation.description`)}
      </TSpan>
    </Stack>

    <Spacer height={16} />

    <Stack
      fullWidth
      justify="center"
      style={{ padding: isMobile ? '0 16px' : undefined }}
    >
      <TSpan
        colorToken="--text-modal-neutral-default"
        font="body-l"
        textAlign="center"
      >
        {t(`noumena.chamber_edit.noum_ads.disable.confirmation.label.one`)}
      </TSpan>
    </Stack>

    <Spacer height={8} />

    <AlisWrapper>
      <TSpan font="body-m" colorToken="--text-modal-neutral-highlighted">
        {`http://{noumena-app-domain}/${url}`}
      </TSpan>
    </AlisWrapper>

    <Spacer height={8} />

    <Stack
      fullWidth
      justify="center"
      style={{ padding: isMobile ? '0 16px' : undefined }}
    >
      <TSpan
        colorToken="--text-modal-neutral-default"
        font="body-l"
        textAlign="center"
      >
        {t(`noumena.chamber_edit.noum_ads.disable.confirmation.label.two`)}
      </TSpan>
    </Stack>

    <Spacer height={8} />
    <AlisWrapper>
      <TSpan font="body-m" colorToken="--text-modal-neutral-highlighted">
        {'http://{noumena-app-domain}/{noum-id}'}
      </TSpan>
    </AlisWrapper>
  </>
);
