import { useCallback } from 'react';
import {
  type EventNotificationDetails,
  EventsStatus,
  type Maybe,
} from '@/apollo/generated/types';
import { useEventHandlers } from '@/features/events/hooks';
import { type NotificationFragment } from '@/apollo/graphql/fragments';
import { type UseEventNotificationHandlersOptions } from './types';

export function useEventNotificationHandlers({
  onNotificationRead,
  onEventDetails,
}: UseEventNotificationHandlersOptions) {
  const { onAccept, onDecline, onGoLive, onJoinEvent } = useEventHandlers({});

  const showEventDetails = useCallback(
    async (
      notification: NotificationFragment,
      eventDetails: Maybe<EventNotificationDetails> | undefined,
    ) => {
      onNotificationRead(notification);
      if (eventDetails?.id) {
        onEventDetails(eventDetails.id);
      }
    },
    [onNotificationRead, onEventDetails],
  );

  const joinEvent = useCallback(
    async (
      notification: NotificationFragment,
      eventDetails: Maybe<EventNotificationDetails> | undefined,
    ) => {
      onNotificationRead(notification);
      if (eventDetails?.id?.socialHall?._id) {
        onJoinEvent(eventDetails.id._id, eventDetails.id.socialHall._id);
      }
    },
    [onNotificationRead, onJoinEvent],
  );

  const goLiveEvent = useCallback(
    async (
      notification: NotificationFragment,
      eventDetails: Maybe<EventNotificationDetails> | undefined,
    ) => {
      if (eventDetails?.id?._id) {
        if (eventDetails.id.status !== EventsStatus.Live) {
          await onGoLive(eventDetails.id._id);
        }
      }
      onNotificationRead(notification);
    },
    [onNotificationRead, onGoLive],
  );

  const acceptEventInvitation = useCallback(
    async (
      notification: NotificationFragment,
      eventDetails: Maybe<EventNotificationDetails> | undefined,
      isAcceptAll: boolean,
    ) => {
      if (eventDetails?.id?._id) {
        await onAccept(eventDetails.id._id, null, isAcceptAll);
      }
      await onNotificationRead(notification);
    },
    [onNotificationRead, onAccept],
  );

  const rejectEventInvitation = useCallback(
    async (
      notification: NotificationFragment,
      eventDetails: Maybe<EventNotificationDetails> | undefined,
      isRejectAll: boolean,
    ) => {
      if (eventDetails?.id?._id) {
        await onDecline(eventDetails.id._id, null, isRejectAll);
      }
      await onNotificationRead(notification);
    },
    [onNotificationRead, onDecline],
  );

  return {
    showEventDetails,
    joinEvent,
    goLiveEvent,
    acceptEventInvitation,
    rejectEventInvitation,
  };
}
