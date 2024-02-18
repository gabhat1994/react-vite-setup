import { t } from 'i18next';
import { useMemo } from 'react';

import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { type EventRecurringConfirmationModalProps } from './types';

export const EventRecurringConfirmationModal = ({
  type,
  loading,
  onClose,
  onAllEventClicked,
  onSingleEventClicked,
}: EventRecurringConfirmationModalProps) => {
  const [
    message,
    description,
    singleConfirmationBtn,
    allConfirmationBtn,
    noButton,
  ] = useMemo(() => {
    let m;
    let d;
    let s;
    let a;
    let n = '';

    if (type === 'cancel-recurring-event') {
      m = t('noumena.event.cancel_recurring_event_modal.title');
      d = t('noumena.event.cancel_recurring_event_modal.description');
      s = t('noumena.event.cancel_single_recurring_event_modal.cancel_button');
      a = t('noumena.event.cancel_all_recurring_event_modal.cancel_button');
      n = t('noumena.event.cancel_recurring_event_modal.cancel_button');
    } else if (type === 'accept-recurring-event') {
      m = t('noumena.event.accept_recurring_event_modal.title');
      d = t('noumena.event.accept_recurring_event_modal.description');
      s = t('noumena.event.accept_single_recurring_event_modal.accept_button');
      a = t('noumena.event.accept_all_recurring_event_modal.accept_button');
      n = t('noumena.cancel');
    }

    return [m, d, s, a, n];
  }, [type]);

  return (
    <Modal
      open
      size={ModalSize.S}
      testId="event-confirmation-modal"
      disableBackdropClick
    >
      <ModalHeader data-testid="event-confirmation-modal-message">
        {message}
      </ModalHeader>
      <ModalBody>
        <TSpan
          font="body-l"
          textAlign="center"
          data-testid="event-confirmation-modal-description"
          colorToken="--text-modal-neutral-default"
        >
          {description}
        </TSpan>
      </ModalBody>

      <ModalFooter gap={16} flexDirection="column">
        <Button
          secondary
          size="full"
          loading={Boolean(loading)}
          onClick={onSingleEventClicked}
          data-testid="confirm-button"
        >
          {singleConfirmationBtn}
        </Button>
        <Button
          secondary
          size="full"
          loading={Boolean(loading)}
          onClick={onAllEventClicked}
          data-testid="confirm-button"
        >
          {allConfirmationBtn}
        </Button>
        <Button
          tertiary
          intent="negative"
          size="full"
          disabled={Boolean(loading)}
          onClick={onClose}
          data-testid="cancel-button"
        >
          {noButton}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
