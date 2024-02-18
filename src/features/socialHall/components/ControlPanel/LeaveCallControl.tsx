import { t } from 'i18next';

import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import { Icon } from '@/components';
import { useError } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';

import { EventModal } from '../EventModals/EventModal';
import { attendeeLeaveEventModalData } from '../EventModals/EventModal/data';
import type { ModalType } from './types';
import { ControlPanelIcon } from './styles';

export const LeaveCallControl = () => {
  const { logError } = useError();
  const { onExitSocialHallCall } = useSocialHallCallContext();
  const { eventDetails, isEventHost } = useSocialHallEventContext();
  const { isPersonalSocialHall, setShowBuzzRoom } = useSocialHallContext();
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const onLeaveQuietly = () => {
    try {
      if (!eventDetails?._id && !isPersonalSocialHall) {
        return;
      }
      if (!isEventHost) {
        openModal('leaveEvent');
      } else {
        setShowBuzzRoom(false);
        closeModal();
      }
    } catch (err) {
      logError(err, '', false);
    }
  };

  const handleLeaveEvent = async () => {
    await onExitSocialHallCall();
    closeModal();
  };

  return (
    <>
      <ControlPanelIcon
        onClick={onLeaveQuietly}
        cursorAllowed
        bgColor="var(--bg-button-danger-primary-default)"
        hoverColor="var(--bg-button-danger-primary-hover)"
        data-title={t('noumena.social_hall.Control_panel.leave')}
      >
        <Icon
          size={24}
          name={
            eventDetails?._id || isPersonalSocialHall ? 'logout_m' : 'spinner_m'
          }
          color="--icon-button-neutral-alt-default"
        />
      </ControlPanelIcon>
      <EventModal
        onClose={closeModal}
        onConfirm={handleLeaveEvent}
        {...attendeeLeaveEventModalData}
        isOpen={modalType === 'leaveEvent'}
      />
    </>
  );
};
