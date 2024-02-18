import { useCallback } from 'react';

import {
  withRecurringEvent,
  type WithRecurringEventProps,
} from '@/features/events/hooks/withRecurringEvent';
import { type EventFragment } from '@/apollo/graphql';
import { InvitationStatus } from '@/apollo/generated/types';
import { EventItemButtons } from '@/features/events/components';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { useEventMeta, useEvents } from '@/features/events/hooks';
import { CreateEditEvent } from '@/features/events/createEditEvent';

import { EventInvitationNote } from './EventInvitationNote';

interface Props {
  event: EventFragment;
  masterId: string;
  refetch: () => void;
}

type ModalType = 'edit-event';

const EventDetailActions = withRecurringEvent(
  ({
    event,
    onEventAccepted,
    onEventDeclined,
    masterId,
    refetch,
  }: Props & Partial<WithRecurringEventProps>) => {
    const isInvited =
      event.currentUser?.invitation?.status === InvitationStatus.Pending;
    const {
      onGoLive,
      onAccept,
      onAttend,
      onAttending,
      onDecline,
      onNotAttending,
      onJoinEvent,
      refetchEvents,
    } = useEvents({ preventGetEvents: false, chamberId: masterId || '' });

    const { userRole } = useEventMeta({ chamberId: masterId, event });

    const handleJoinEvent = useCallback(() => {
      onJoinEvent(event?._id ?? '', event?.socialHall?._id ?? '');
    }, [event?._id, event?.socialHall?._id, onJoinEvent]);

    const handleAccept = useCallback(async () => {
      if (event) {
        await onEventAccepted?.(event, onAccept);
        refetch();
      }
    }, [event, onAccept, refetch, onEventAccepted]);

    const handleDecline = useCallback(async () => {
      if (event) {
        await onEventDeclined?.(event, onDecline);
        refetch();
      }
    }, [event, onDecline, refetch, onEventDeclined]);

    const handleAttend = useCallback(async () => {
      if (event) {
        await onEventAccepted?.(event, onAttend);
        refetch();
      }
    }, [event, onAttend, refetch, onEventAccepted]);

    const handleNotAttending = useCallback(async () => {
      if (event) {
        await onEventDeclined?.(event, onNotAttending);
        refetch();
      }
    }, [event, onNotAttending, refetch, onEventDeclined]);

    const handleAttending = useCallback(async () => {
      if (event) {
        await onEventAccepted?.(event, onAttending);
        refetch();
      }
    }, [event, onAttending, refetch, onEventAccepted]);

    const handleGoLiveEvent = useCallback(async () => {
      if (event) {
        await onGoLive(event?._id!);
        handleJoinEvent();
      }
    }, [event, handleJoinEvent, onGoLive]);

    const { openModal, closeModal, modalType } = useModalManager<ModalType>();

    return (
      <>
        {isInvited && <EventInvitationNote event={event} />}
        <EventItemButtons
          event={event}
          role={userRole}
          onGoLive={handleGoLiveEvent}
          onAccept={handleAccept}
          onDecline={handleDecline}
          onAttending={handleAttending}
          onNotAttending={handleNotAttending}
          onJoinEvent={handleJoinEvent}
          onAttend={handleAttend}
          onEditEvent={() => openModal('edit-event')}
          isEventDetail
        />
        {modalType === 'edit-event' && (
          <CreateEditEvent
            isOpen
            onClose={closeModal}
            event={event}
            eventSuccessCallback={refetchEvents}
            chamberId={event.chamberId?._id ?? ''}
            isProjectNoum={false}
          />
        )}
      </>
    );
  },
);

export default EventDetailActions;
