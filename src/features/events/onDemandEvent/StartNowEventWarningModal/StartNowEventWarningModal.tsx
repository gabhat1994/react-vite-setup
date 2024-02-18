import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import {
  withRecurringEvent,
  type WithRecurringEventProps,
} from '@/features/events/hooks/withRecurringEvent';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button/Button';
import { useEvents, useEventTimeSlot } from '@/features/events/hooks';
import { Spacer } from '@/layout';
import Timer from '@/components/Timer/Timer';
import { getLocalTime } from '@/utils/date';
import { type EventFragment } from '@/apollo/graphql';

import { EventItemContainer } from './styles';
import { EventItem } from '../../components';

export const StartNowEventWarningModal: React.FC<
  {
    isOpen: boolean;
    onClose: () => void;
    onContinueClick: () => void;
    event: EventFragment;
    spaceId: string;
  } & Partial<WithRecurringEventProps>
> = withRecurringEvent(
  ({
    isOpen,
    onClose,
    event,
    spaceId,
    onContinueClick,
    onEventAccepted,
    onEventDeclined,
  }) => {
    const {
      onGoLive,
      onAccept,
      onDecline,
      onAttending,
      onNotAttending,
      onAttend,
    } = useEvents({
      chamberId: spaceId,
      limit: 10,
      preventGetEvents: true,
    });

    const { t } = useTranslation();

    const localDateTime = getLocalTime({
      dateTime: new Date(event?.eventDate),
    });

    const { diffSeconds } = useEventTimeSlot({
      startTimestamp: localDateTime?.getTime() || 0,
      durationInSeconds: event?.duration || 0,
      status: event?.status,
    });

    return (
      <Modal
        onClose={onClose}
        enableCloseButton
        open={isOpen}
        size={ModalSize.M}
        disableBackdropClick
      >
        <ModalHeader topPadding={0}>
          {t('noumena.event.modal.start_now')}
        </ModalHeader>
        <ModalBody>
          <TSpan
            font="body-l"
            textAlign="center"
            colorToken="--text-modal-neutral-default"
          >
            {diffSeconds < 0 ? (
              t('noumena.event.modal.another_event_scheduled_now')
            ) : (
              <Trans
                i18nKey="noumena.event.modal.another_event_scheduled_in"
                components={{
                  timer: <Timer initialSeconds={diffSeconds} unit="minute" />,
                }}
              />
            )}
          </TSpan>

          <Spacer height={16} />
          {event && spaceId && (
            <EventItemContainer>
              <EventItem
                event={event}
                chamberId={spaceId || ''}
                type="calendar"
                showEndTime={true}
                onGoLive={() => onGoLive(event._id || '')}
                onAccept={() => onEventAccepted?.(event, onAccept)!}
                onDecline={() => onEventDeclined?.(event, onDecline)!}
                onAttending={() => onEventAccepted?.(event, onAttending)!}
                onNotAttending={() => onEventDeclined?.(event, onNotAttending)!}
                onEditEvent={() => {}}
                onJoinEvent={() => {}}
                onAttend={() => onEventAccepted?.(event, onAttend)!}
                onClickSeeMore={() => {}}
                onViewAttendees={() => {}}
                hideActionButtons
                notClickable
              />
            </EventItemContainer>
          )}
          <Spacer height={16} />
          <TSpan
            font="body-l"
            textAlign="center"
            colorToken="--text-modal-neutral-default"
          >
            {t('noumena.event.modal.start_now.reminder')}
          </TSpan>
        </ModalBody>
        <ModalFooter gap={16} flexDirection="row" marginTop={24}>
          <Button
            tertiary
            intent="negative"
            size="full"
            onClick={onClose}
            data-testid="cancel-button"
          >
            {t('noumena.event.modal.cancel')}
          </Button>
          <Button
            onClick={onContinueClick}
            primary
            size="full"
            data-testid="confirm-button"
          >
            {t('noumena.event.modal.continue')}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
