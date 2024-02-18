import { t } from 'i18next';
import { useCallback, useMemo, useRef } from 'react';

import {
  EventAttendees,
  EventDescription,
  EventDurationBadge,
  EventItemButtons,
  EventItemBody,
  EventTitle,
} from '@/features/events/components';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useToast } from '@/hooks';
import { EventUtils } from '@/utils/event';
import { getFullName } from '@/utils/fullName';
import { useAuth } from '@/features/auth/contexts';
import { useGetEventByIdQuery } from '@/apollo/graphql';
import { useEventMeta, useEvents } from '@/features/events/hooks';
import { InvitationStatus, UserRole } from '@/apollo/generated/types';

import {
  type WithRecurringEventProps,
  withRecurringEvent,
} from '../../hooks/withRecurringEvent';
import { type EventDetailModalProps } from './types';
import { EventAttendeesModal } from '../EventAttendeesModal';

export const EventDetailModal = withRecurringEvent(
  ({
    eventId,
    isOpen,
    onClose,
    onEditEvent,
    onEventAccepted,
    onEventDeclined,
  }: EventDetailModalProps & Partial<WithRecurringEventProps>) => {
    const { addToast } = useToast();

    const attendeesRef =
      useRef<React.ElementRef<typeof EventAttendeesModal>>(null);

    const onViewAttendees = useCallback(
      (id: string, isHost: boolean) => {
        attendeesRef.current?.open(id, isHost);
      },
      [attendeesRef],
    );

    const { masterId } = useAuth();
    const {
      onGoLive,
      onAccept,
      onAttend,
      onAttending,
      onDecline,
      onNotAttending,
      onJoinEvent,
    } = useEvents({ preventGetEvents: true, chamberId: masterId || '' });

    const { data, refetch } = useGetEventByIdQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        id: eventId,
      },
    });

    const event = data?.getEventById;

    const attendeeUrls: string[] = useMemo(
      () => EventUtils.getEventAttendeesAvatars(event),
      [event],
    );

    const { userRole } = useEventMeta({
      chamberId: masterId,
      event,
    });

    const hostFullName = useMemo(
      () =>
        getFullName(
          event?.userId?.firstName,
          event?.userId?.middleName,
          event?.userId?.lastName,
        ),
      [event],
    );

    const handleJoinEvent = useCallback(() => {
      onJoinEvent(event?._id ?? '', event?.socialHall?._id ?? '');
    }, [event?._id, event?.socialHall?._id, onJoinEvent]);

    const handleGoLiveEvent = useCallback(async () => {
      if (event?._id) {
        await onGoLive(event._id);
        handleJoinEvent();
      }
    }, [event, handleJoinEvent, onGoLive]);

    const handleAccept = useCallback(async () => {
      if (event) {
        await onEventAccepted?.(event, onAccept);
        if (event?._id) {
          refetch();
        }
      }
    }, [event, onEventAccepted, onAccept, refetch]);

    const handleDecline = useCallback(async () => {
      if (event) {
        await onEventDeclined?.(event, onDecline);
        if (event?._id) {
          refetch();
        }
      }
    }, [event, onEventDeclined, onDecline, refetch]);

    const handleAttend = useCallback(async () => {
      if (event) {
        await onEventAccepted?.(event, onAttend);
        if (event?._id) {
          refetch();
        }
      }
    }, [event, onEventAccepted, onAttend, refetch]);

    const handleNotAttending = useCallback(async () => {
      if (event) {
        await onEventDeclined?.(event, onNotAttending);
        if (event?._id) {
          refetch();
        }
      }
    }, [event, onEventDeclined, onNotAttending, refetch]);

    const handleAttending = useCallback(async () => {
      if (event) {
        await onEventAccepted?.(event, onAttending);
        if (event?._id) {
          refetch();
        }
      }
    }, [event, onEventAccepted, onAttending, refetch]);

    const onCopyLink = useCallback(
      (socialHallId) => {
        const socialHallLink = `${window?.location?.origin}/social-hall/${socialHallId}`;
        navigator.clipboard.writeText(`${socialHallLink}` ?? '');
        addToast('primary', 'none', `${t('noumena.event.link.copied')}`);
      },
      [addToast],
    );

    if (!event) return null;

    return (
      <Modal
        testId="event-detail-modal"
        open={isOpen}
        onClose={() => onClose?.()}
        enableCloseButton
        size={ModalSize.L}
        disableBackdropClick
      >
        <ModalHeader bottomPadding={0}>
          {event.eventDate && (
            <EventDurationBadge
              eventDate={event.eventDate}
              durationInSeconds={event.duration || 0}
              status={event.status!}
            />
          )}
        </ModalHeader>
        <ModalBody>
          <EventItemBody
            style={{ order: 'unset', paddingTop: 0 }}
            mobileFlex={1}
            align="center"
          >
            <EventTitle colorToken="--text-modal-header-neutral-default">
              {event.title}
            </EventTitle>
            <EventDescription
              description={event.description}
              isClipped={false}
            />
          </EventItemBody>
        </ModalBody>
        <ModalFooter flexDirection="column">
          <EventAttendees
            avatarUrls={attendeeUrls}
            fullName={hostFullName}
            isHost={[UserRole.Host, UserRole.Cohost].includes(userRole)}
            isInvited={
              event.currentUser?.invitation?.status === InvitationStatus.Pending
            }
            onViewAttendees={() =>
              onViewAttendees(
                event._id!,
                [UserRole.Host, UserRole.Cohost].includes(userRole),
              )
            }
            totalAttendees={event?.totalAttendees || 0}
          />
          <EventItemButtons
            event={event}
            onGoLive={handleGoLiveEvent}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onAttending={handleAttending}
            onNotAttending={handleNotAttending}
            onJoinEvent={handleJoinEvent}
            onAttend={handleAttend}
            onEditEvent={() => onEditEvent?.(event)}
            onCopyLink={() => onCopyLink(event?.socialHall?._id)}
          />
        </ModalFooter>
        <EventAttendeesModal ref={attendeesRef} />
      </Modal>
    );
  },
);
