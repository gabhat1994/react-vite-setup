import { useSocialHallEventContext } from '@/providers';
import { EventsStatus } from '@/apollo/generated/types';
import { useHeaderTimer } from '@/features/socialHall/hooks';
import { CounterClockSpan } from './styles';

export const HeaderTimer = () => {
  const { formattedTime } = useHeaderTimer();
  const { isPostEvent, isEndedEvent, eventDetails } =
    useSocialHallEventContext();

  return !isPostEvent && !isEndedEvent ? (
    <CounterClockSpan
      font="systemInfo-m"
      isCountDown={
        eventDetails?.status === EventsStatus.PreLive ||
        eventDetails?.status === EventsStatus.PostEventEnded
      }
      data-testid="counter_clock"
    >
      {formattedTime}
    </CounterClockSpan>
  ) : null;
};
