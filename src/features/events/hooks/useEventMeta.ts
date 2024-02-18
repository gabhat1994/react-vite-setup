import { UserRole, type EventsStatus } from '@/apollo/generated/types';
import { type EventFragment } from '@/apollo/graphql';
import { type EventDurationBadgeVariant } from '@/features/events/components';
import { getLocalTime } from '@/utils/date';
import { EventUtils } from '@/utils/event';
import { getEventCardButtonType } from '@/utils/eventCardTypes';
import { type Maybe } from 'graphql/jsutils/Maybe';
import { useEffect, useMemo, useState } from 'react';

interface IUseEventTimeSlotInput {
  startTimestamp: number;
  durationInSeconds: number;
  status?: Maybe<EventsStatus>;
}

interface IUseEventTimeSlotOutput {
  variant: EventDurationBadgeVariant;
  showCountDown: boolean;
  diffSeconds: number;
}

const COUNT_DOWN_START_TIME_IN_MS = 30 * 60 * 1000; // 30 minutes

export const useEventTimeSlot = ({
  startTimestamp,
  status,
}: IUseEventTimeSlotInput): IUseEventTimeSlotOutput => {
  const [currTimestamp, setCurrTimestamp] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTimestamp(Date.now());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const diffSeconds = useMemo(
    () => Math.round((startTimestamp - currTimestamp) / 1000),
    [currTimestamp, startTimestamp],
  );

  const variant = useMemo<EventDurationBadgeVariant>(() => {
    if (status && EventUtils.isEventLive(status)) {
      return 'urgent';
    }

    return 'regular';
  }, [status]);

  const showCountDown = useMemo<boolean>(
    () =>
      startTimestamp > currTimestamp &&
      startTimestamp <= currTimestamp + COUNT_DOWN_START_TIME_IN_MS,
    [currTimestamp, startTimestamp],
  );

  return { variant, showCountDown, diffSeconds };
};

type UseEvenMetaOptions = {
  chamberId: Maybe<string>;
  event: Maybe<EventFragment>;
};

export const useEventMeta = ({ chamberId, event }: UseEvenMetaOptions) => {
  const localDateTime = useMemo(
    () =>
      getLocalTime({
        dateTime: new Date(event?.eventDate),
      }),
    [event?.eventDate],
  );

  const timeSlotOutput = useEventTimeSlot({
    startTimestamp: localDateTime?.getTime() || 0,
    durationInSeconds: event?.duration ?? 0,
    status: event?.status,
  });

  const userRole: UserRole = useMemo(() => {
    if (event?.currentUser?.userRole) {
      return event?.currentUser.userRole;
    }
    if (event?.chamberId?._id === chamberId) {
      return UserRole.Host;
    }
    return UserRole.None;
  }, [chamberId, event?.chamberId?._id, event?.currentUser?.userRole]);

  const eventCardButtonType = useMemo(
    () =>
      getEventCardButtonType({
        status: event?.status,
        invitationStatus: event?.currentUser?.invitation?.status,
        userRole,
        isUserJoined: event?.socialHall?.hasUserJoined,
        eventDate: event?.eventDate,
        isInstantEvent: !!event?.isInstantEvent,
        diffSeconds: timeSlotOutput.diffSeconds,
      }),
    [
      event?.currentUser?.invitation?.status,
      event?.eventDate,
      event?.socialHall?.hasUserJoined,
      event?.status,
      timeSlotOutput.diffSeconds,
      userRole,
      event?.isInstantEvent,
    ],
  );
  return { userRole, eventCardButtonType, timeSlotOutput };
};
