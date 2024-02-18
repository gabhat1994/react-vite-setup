import { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { formatTime } from '@/utils/date';

import { EventsStatus } from '@/apollo/generated/types';
import { useSocialHallEventContext } from '@/providers/SocialHallEventProvider';
import { useCountDown } from './useCountdown';
import { useTimer } from './useTimer';

export const useHeaderTimer = () => {
  const { remainTimeForEvent, eventDetails } = useSocialHallEventContext();

  const { t } = useTranslation();
  const { startCountdown, remainTime } = useCountDown();
  const { startTimer, elapsedTime } = useTimer();

  useEffect(() => {
    if (
      [
        EventsStatus.PreLive,
        EventsStatus.PreEvent,
        EventsStatus.PostEventEnded,
      ].includes(eventDetails?.status!)
    ) {
      startCountdown(remainTimeForEvent);
    } else {
      startTimer(remainTimeForEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainTimeForEvent]);

  const formattedTime = useMemo(() => {
    if (
      eventDetails?.status === EventsStatus.PreLive ||
      eventDetails?.status === EventsStatus.PreEvent
    ) {
      return `${t('noumena.social_hall.to_the_main_event', {
        remainTime: formatTime(remainTime),
      })}`;
    }

    if (eventDetails?.status === EventsStatus.PostEventEnded) {
      return `${t('noumena.social_hall.to_the_end_event', {
        remainTime: formatTime(remainTime),
      })}`;
    }
    return formatTime(elapsedTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsedTime, remainTime, eventDetails?.status]);

  return {
    formattedTime,
    remainTime,
  };
};

export default useHeaderTimer;
