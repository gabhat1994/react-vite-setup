import { t } from 'i18next';

import {
  useSocialHallCallContext,
  useSocialHallEventContext,
} from '@/providers';
import { useError } from '@/hooks';
import { TSpan } from '@/components';
import { EventsStatus } from '@/apollo/generated/types';
import { SubscriptionType } from '@/screens/SocialHall/types';
import { useModalManager } from '@/hooks/modal/useModalManager';

import { EventModal } from '../EventModals/EventModal';
import {
  hostFinishInstantEventModalData,
  hostFinishMainEventModalData,
} from '../EventModals/EventModal/data';
import type { ModalType } from './types';
import { ControlPanelIcon } from './styles';

export const FinishEventControl = () => {
  const { logError } = useError();
  const { onLeaveCall, onSendSubscriptionMessage } = useSocialHallCallContext();
  const { isMainEvent, onCloseEvent } = useSocialHallEventContext();

  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const hostEndEventModalProps = isMainEvent
    ? hostFinishMainEventModalData
    : hostFinishInstantEventModalData;

  const endTheMainEventBtnLabel = isMainEvent
    ? t('noumena.socialhall.end_the_main_event')
    : t('noumena.socialhall.end_the_event');

  const onFinishEvent = async () => {
    try {
      closeModal();
      onSendSubscriptionMessage({
        type: SubscriptionType.UPDATE_EVENT_STATUS,
        data: EventsStatus.Cancelled,
      });
      await onCloseEvent();
      await onLeaveCall();
    } catch (err) {
      logError(err);
    }
  };

  return (
    <>
      <ControlPanelIcon
        onClick={() => openModal('finishEvent')}
        cursorAllowed
        bgColor="var(--bg-button-danger-primary-default)"
        hoverColor="var(--bg-button-danger-primary-hover)"
      >
        <TSpan colorToken="--text-button-neutral-alt-default">
          {endTheMainEventBtnLabel}
        </TSpan>
      </ControlPanelIcon>
      <EventModal
        isOpen={modalType === 'finishEvent'}
        onClose={closeModal}
        onConfirm={onFinishEvent}
        {...hostEndEventModalProps}
      />
    </>
  );
};
