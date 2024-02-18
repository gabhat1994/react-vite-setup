import { useCallback, useState } from 'react';
import { type EventFragment } from '@/apollo/graphql';

import type { TCancelModal } from '../types/cancelModal';
import { EventRecurringConfirmationModal } from '../components/EventConfirmationModal';

export type WithRecurringEventProps = {
  onEventAccepted: (
    evnt: EventFragment,
    callback: (eventId: string, isAcceptAll: boolean) => Promise<void>,
  ) => Promise<void>;
  onEventDeclined: (
    evnt: EventFragment,
    callback: (eventId: string, isAcceptAll: boolean) => Promise<void>,
  ) => Promise<void>;
};

export function withRecurringEvent<P>(Component: React.ComponentType<P>) {
  const WrappedComponent = (props: P) => {
    const [selectedEvent, setSelectedEvent] = useState<EventFragment>();

    const [openRecurringConfirmationModal, setOpenRecurringConfirmationModal] =
      useState<{
        type?: TCancelModal;
        show: boolean;
        callback?: (eventId: string, isAcceptAll: boolean) => Promise<void>;
      }>();

    const onSingleEventClicked = useCallback(
      (isAcceptAll: boolean) => {
        if (openRecurringConfirmationModal?.callback) {
          openRecurringConfirmationModal.callback(
            selectedEvent?._id!,
            isAcceptAll,
          );
        }
        setOpenRecurringConfirmationModal({ show: false });
      },
      [openRecurringConfirmationModal, selectedEvent?._id],
    );

    const onShowAcceptConfirmationPopup = useCallback(
      async (
        evnt: EventFragment,
        callback: (eventId: string, isAcceptAll: boolean) => Promise<void>,
      ) => {
        if (evnt.recurring) {
          setOpenRecurringConfirmationModal({
            show: true,
            callback,
            type: 'accept-recurring-event',
          });
          setSelectedEvent(evnt);
        } else {
          await callback(evnt._id!, false);
        }
      },
      [],
    );

    const onShowDeclineConfirmationPopup = useCallback(
      async (
        evnt: EventFragment,
        callback: (eventId: string, isAcceptAll: boolean) => Promise<void>,
      ) => {
        if (evnt.recurring) {
          setOpenRecurringConfirmationModal({
            show: true,
            callback,
            type: 'cancel-recurring-event',
          });
          setSelectedEvent(evnt);
        } else {
          await callback(evnt._id!, false);
        }
      },
      [],
    );

    const onAllEventClicked = useCallback(
      (isAcceptAll: boolean) => {
        if (openRecurringConfirmationModal?.callback) {
          openRecurringConfirmationModal.callback(
            selectedEvent?._id!,
            isAcceptAll,
          );
        }
        setOpenRecurringConfirmationModal({ show: false });
      },
      [openRecurringConfirmationModal, selectedEvent?._id],
    );

    return (
      <>
        <Component
          {...(props as P)}
          onEventAccepted={onShowAcceptConfirmationPopup}
          onEventDeclined={onShowDeclineConfirmationPopup}
        />
        {openRecurringConfirmationModal?.show && (
          <EventRecurringConfirmationModal
            type={openRecurringConfirmationModal.type!}
            onClose={() => setOpenRecurringConfirmationModal({ show: false })}
            onAllEventClicked={() => onAllEventClicked(true)}
            onSingleEventClicked={() => onSingleEventClicked(false)}
          />
        )}
      </>
    );
  };
  return WrappedComponent;
}
