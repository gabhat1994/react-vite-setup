import { t } from 'i18next';

import { Spacer, Stack } from '@/layout';
import { EventFieldLabel, EventFieldRow } from '@/features/events/styles';

import { EventDurationPicker } from './EventDurationPicker';

export const EventDurationField = () => (
  <EventFieldRow data-testid="event-duration-wrapper">
    <Stack vertical align="start" justify="center">
      <EventFieldLabel
        font="body-l"
        colorToken="--text-tablecell-header-neutral-highlighted"
      >
        {t('noumena.event.modal.duration')}
      </EventFieldLabel>
    </Stack>
    <Spacer isFlex />
    <EventDurationPicker />
  </EventFieldRow>
);
