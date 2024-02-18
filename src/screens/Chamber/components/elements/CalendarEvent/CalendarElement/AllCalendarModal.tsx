import {
  PermissibleElementType,
  SpaceTypeEnum,
} from '@/apollo/generated/types';
import { type EventFragment } from '@/apollo/graphql';
import {
  EventItem,
  EventFilter,
  EventAttendeesModal,
} from '@/features/events/components';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Infinite, getBottomStatusFromQuery } from '@/components/Infinite';
import { Spinner } from '@/components/Spinner';
import { useEvents } from '@/features/events/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { Stack } from '@/layout';
import { NetworkStatus } from '@apollo/client';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  withRecurringEvent,
  type WithRecurringEventProps,
} from '@/features/events/hooks/withRecurringEvent';
import { CreateEditEvent } from '@/features/events/createEditEvent';
import { EventListEmptyScreen } from '@/features/events/eventListModal/EventListEmptyScreen';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { type AllEventsProps } from './types';

type ModalType = 'edit-event';

type ModalContext = {
  event?: EventFragment;
  callback?: () => void;
};

export const AllCalendarModal = withRecurringEvent(
  ({
    isOpen,
    onClose,
    chamberId,
    isOwner,
    spaceId,
    onEventAccepted,
    onEventDeclined,
    spaceType,
  }: AllEventsProps & Partial<WithRecurringEventProps>) => {
    const { t } = useTranslation();
    const { hasElementPermission } = useNoumAuthorization();

    const hasViewCalendarElementPermission = hasElementPermission(
      PermissibleElementType.Calendar,
      'view-event-element',
      isOwner,
    );

    const {
      events,
      eventsCount,
      activeFilter,
      onChangeFilter,
      onGoLive,
      onJoinEvent,
      networkStatus,
      fetchMoreEvents,
      onAccept,
      onAttend,
      onDecline,
      onAttending,
      onNotAttending,
      onCopyLink,
      refetchEvents,
    } = useEvents({
      chamberId: spaceId,
      limit: 10,
      shouldGetActiveEvents: hasViewCalendarElementPermission,
      preventGetEvents: !isOpen,
    });

    const attendeesRef =
      useRef<React.ElementRef<typeof EventAttendeesModal>>(null);

    const onViewAttendees = useCallback((eventId: string, isHost: boolean) => {
      attendeesRef.current?.open(eventId, isHost);
    }, []);

    const { openModal, closeModal, contextData, modalType } = useModalManager<
      ModalType,
      ModalContext
    >();

    const handleJoinEvent = useCallback(
      async (event: EventFragment) => {
        onJoinEvent(event._id ?? '', event.socialHall?._id ?? '');
      },
      [onJoinEvent],
    );

    const onGoLiveEvent = useCallback(
      async (event: EventFragment) => {
        await onGoLive(event._id!);
        onJoinEvent(event._id ?? '', event.socialHall?._id ?? '');
      },
      [onGoLive, onJoinEvent],
    );

    const closeModalHanlder = () => {
      onClose();
    };
    const canFetchMore = eventsCount > events.length;

    return (
      <Modal
        onClose={closeModalHanlder}
        enableCloseButton
        open={isOpen}
        size={ModalSize.XL}
        disableBackdropClick
      >
        <ModalHeader>{t('noumena.events.title')}</ModalHeader>
        <ModalBody style={{ gap: '15px', height: '628px' }}>
          {hasViewCalendarElementPermission && (
            <EventFilter
              visible={true}
              activeFilter={activeFilter}
              onChange={onChangeFilter}
              type="calendar"
            />
          )}
          <Infinite
            onFetchMore={() => {
              if (canFetchMore) {
                fetchMoreEvents();
              }
            }}
            status={
              events.length !== 0 && canFetchMore
                ? getBottomStatusFromQuery({
                    networkStatus,
                    totalCount: eventsCount,
                    currentCount: events.length,
                  })
                : 'end'
            }
            grow
            width="100%"
            disableFetchMoreWhileLoading={true}
            isSpinnerRelative
            style={{ overflow: 'unset', scrollbarWidth: 'none' }}
          >
            <Stack gap={15} vertical align="center" grow>
              {events.length === 0 ? (
                <>
                  {networkStatus === NetworkStatus.ready ? (
                    <EventListEmptyScreen activeFilter={activeFilter} />
                  ) : (
                    <Spinner />
                  )}
                </>
              ) : (
                events.map((event) => (
                  <EventItem
                    key={event._id}
                    event={event}
                    chamberId={chamberId}
                    type="calendar"
                    onGoLive={() => onGoLiveEvent(event)}
                    onAccept={() => onEventAccepted?.(event, onAccept)!}
                    onDecline={() => onEventDeclined?.(event, onDecline)!}
                    onAttending={() => onEventAccepted?.(event, onAttending)!}
                    onNotAttending={() =>
                      onEventDeclined?.(event, onNotAttending)!
                    }
                    onJoinEvent={() => handleJoinEvent(event)}
                    onAttend={() => onEventAccepted?.(event, onAttend)!}
                    onEditEvent={() =>
                      openModal('edit-event', {
                        event,
                        callback: refetchEvents,
                      })
                    }
                    onViewAttendees={onViewAttendees}
                    onCopyLink={() =>
                      onCopyLink?.(event?.socialHall?._id ?? '')
                    }
                  />
                ))
              )}
            </Stack>
          </Infinite>
        </ModalBody>
        {modalType === 'edit-event' && (
          <CreateEditEvent
            chamberId={spaceId}
            isOpen
            onClose={closeModal}
            event={contextData?.event}
            eventSuccessCallback={contextData?.callback}
            isProjectNoum={spaceType === SpaceTypeEnum.Project}
          />
        )}
        <EventAttendeesModal
          ref={attendeesRef}
          onRefetchEvents={refetchEvents}
        />
      </Modal>
    );
  },
);
