import { t } from 'i18next';

import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components';
import { EventURLCopyButton } from '@/features/socialHall/components';

export const PersonalEventId = () => (
  <>
    <Stack vertical fullWidth padding="24px 0">
      <Stack fullWidth justify="space-between" align="center">
        <TSpan
          font="body-xl-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t('noumena.event.personal_event_id_heading')}
        </TSpan>
      </Stack>
      <Spacer height={8} />
      <EventURLCopyButton />
      <Spacer height={8} />
      <TSpan colorToken="--text-tablecell-body-neutral-default" font="footnote">
        {t('noumena.event.personal_event_id_note')}
      </TSpan>
    </Stack>
  </>
);
