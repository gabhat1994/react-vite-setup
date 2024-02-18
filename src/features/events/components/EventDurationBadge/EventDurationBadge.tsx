import { forwardRef, type Ref, useMemo } from 'react';
import { add, isToday } from 'date-fns';
import { Icon } from '@/components/Icon';
import { getLocalTime, getLocalTimeFormatted } from '@/utils/date';
import { useEventTimeSlot } from '@/features/events/hooks';
import { EventDurationBadgeContent } from './EventDurationBadgeContent';
import {
  colorMap,
  EventDurationBadgeLiveWrapper,
  EventDurationBadgeRegularWrapper,
} from './styles';
import type { EventDurationBadgeProps } from './types';

export const EventDurationBadge = forwardRef(
  (
    {
      height,
      eventDate,
      status,
      showEndTime,
      durationInSeconds,
      notClickable,
      children,
    }: EventDurationBadgeProps,
    ref: Ref<HTMLSpanElement>,
  ) => {
    const localDateTime = useMemo(
      () =>
        getLocalTime({
          dateTime: new Date(eventDate),
        }),
      [eventDate],
    );

    const timeSlotOutput = useEventTimeSlot({
      startTimestamp: localDateTime?.getTime() || 0,
      durationInSeconds,
      status,
    });

    const content = useMemo(() => {
      const startDateTime = getLocalTimeFormatted({
        dateTime: new Date(eventDate),
        returnFormat: 'dd/MM/yyyy, hh:mm a',
      });
      const startTime = getLocalTimeFormatted({
        dateTime: eventDate,
        returnFormat: 'hh:mm a',
      });
      const endTime = getLocalTimeFormatted({
        dateTime: add(new Date(eventDate), { seconds: durationInSeconds }),
        returnFormat: 'hh:mm a',
      });
      return (
        <EventDurationBadgeContent
          startDateTime={startDateTime}
          startTime={startTime}
          endTime={endTime}
          showEndTime={showEndTime}
          isToday={localDateTime ? isToday(localDateTime) : false}
          {...timeSlotOutput}
        />
      );
    }, [
      durationInSeconds,
      eventDate,
      localDateTime,
      timeSlotOutput,
      showEndTime,
    ]);

    if (timeSlotOutput.variant === 'regular')
      return (
        <EventDurationBadgeRegularWrapper
          notClickable={notClickable}
          data-testid="event-duration-badge-testid"
          ref={ref}
          height={height}
          variant={timeSlotOutput.variant}
        >
          {children && children}
          {content}
        </EventDurationBadgeRegularWrapper>
      );
    return (
      <EventDurationBadgeLiveWrapper
        notClickable={notClickable}
        data-testid="event-duration-badge-testid"
        ref={ref}
        height={height}
        variant={timeSlotOutput.variant}
      >
        {children && children}
        <Icon
          name="wave_left_m"
          color={colorMap[timeSlotOutput.variant]}
          size={16}
        />
        {content}
        <Icon
          name="wave_right_m"
          color={colorMap[timeSlotOutput.variant]}
          size={16}
        />
      </EventDurationBadgeLiveWrapper>
    );
  },
);

export default EventDurationBadge;
