import { type Maybe } from '@/apollo/generated/types';
import {
  type EventFragment,
  type NotificationFragment,
} from '@/apollo/graphql';
import {
  defaultStyles,
  resetHelpStyles,
  setCSSStyles,
} from '@/features/help/utils';
import { EventListModal } from '@/features/events/components';
import { CreateEditEvent } from '@/features/events/createEditEvent';
import { EventDetailModal } from '@/features/events/components/EventDetailModal';
import { TokenNotification } from '@/components/TokenNotification';
import { useAuth } from '@/features/auth/contexts';
import { type ModalManagerResult } from '@/hooks/modal/useModalManager';
import NotificationsSidebar from '@/screens/Notifications';
import { useCallback, useEffect, useState } from 'react';
import { type ModalType } from './types';
import { useEventRedirectionHandler } from './useEventRedirectionHandler';

interface ActivityModalsProps
  extends ModalManagerResult<ModalType, EventFragment> {}

export function ActivityModals({
  modalType,
  contextData,
  openModal,
  closeModal,
}: ActivityModalsProps) {
  const { masterId } = useAuth();

  const [tokenNotification, setTokenNotification] =
    useState<NotificationFragment | null>(null);

  const handleEditEvent = useCallback(
    (event: Maybe<EventFragment>) => {
      if (event) {
        closeModal();
        openModal('event-edit', event);
      }
    },
    [closeModal, openModal],
  );

  const handleOpenEventDetail = useCallback(
    (event?: Maybe<EventFragment>) => {
      if (event) {
        openModal('event-details', event);
      }
    },
    [openModal],
  );

  const handleCloseTokenNotification = useCallback(async () => {
    if (tokenNotification) {
      setTokenNotification(null);
    }
  }, [tokenNotification]);

  useEventRedirectionHandler({ openModal });

  // TODO: Extract somewhere? Remove?
  const help = document.querySelector<HTMLIFrameElement>('#launcher-frame');
  useEffect(() => {
    if (help) {
      setCSSStyles(help, { ...defaultStyles, display: 'none' });
    }
    return () => resetHelpStyles();
  }, [help]);

  return (
    <>
      <NotificationsSidebar
        open={modalType === 'notifications'}
        onClose={closeModal}
        onClickEvent={handleOpenEventDetail}
        handleTokenNotification={setTokenNotification}
      />

      <EventListModal
        isOpen={modalType === 'calendar'}
        onClose={closeModal}
        onEditEvent={handleEditEvent}
      />

      {modalType === 'event-details' && (
        <EventDetailModal
          eventId={contextData?._id ?? ''}
          isOpen={modalType === 'event-details'}
          onClose={closeModal}
          onEditEvent={handleEditEvent}
        />
      )}
      {modalType === 'event-edit' && (
        <CreateEditEvent
          isOpen
          onClose={closeModal}
          event={contextData}
          chamberId={masterId}
          isProjectNoum={false}
        />
      )}
      {tokenNotification && (
        <TokenNotification
          isOpen={!!tokenNotification}
          tokens={tokenNotification.data?.count ?? 0}
          reason={tokenNotification.data?.message ?? ''}
          handleClose={handleCloseTokenNotification}
        />
      )}
    </>
  );
}
