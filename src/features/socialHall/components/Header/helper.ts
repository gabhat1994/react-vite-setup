import { t } from 'i18next';
import { type Event, EventsStatus } from '@/apollo/generated/types';

export const getEventTagLabel = ({ isInstantEvent, status }: Event): string => {
  let tag = '';
  if (isInstantEvent) {
    return tag;
  }

  if ([EventsStatus.PreEvent, EventsStatus.PreLive].includes(status!)) {
    tag = t('noumena.social_hall.main_event');
  }
  if (status === EventsStatus.Live) {
    tag = t('noumena.social_hall.main_event');
  }
  if (status === EventsStatus.PostEvent) {
    tag = t('noumena.social_hall.post_event');
  }

  return tag;
};
