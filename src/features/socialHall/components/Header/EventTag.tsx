import { useMemo } from 'react';
import { useSocialHallEventContext } from '@/providers';
import { type Event } from '@/apollo/generated/types';
import { getEventTagLabel } from './helper';
import { TagSpan } from './styles';

export const EventTag = () => {
  const { eventDetails } = useSocialHallEventContext();
  const eventTag = useMemo(
    () => getEventTagLabel(eventDetails as Event),
    [eventDetails],
  );
  return eventTag ? (
    <TagSpan
      font="body-s-bold"
      colorToken="--text-tab-chips-brand-primary-selected"
    >
      {eventTag}
    </TagSpan>
  ) : null;
};
