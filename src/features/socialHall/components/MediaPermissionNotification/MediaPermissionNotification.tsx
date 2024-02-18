import { useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { notificationModal } from './data';

type MediaPermissionNotificationProps = {
  showAudioModal: boolean | null;
  showVideoModal: boolean | null;
  onTogglePopup: (type: 'audio' | 'video') => void;
};

export const MediaPermissionNotification = ({
  showAudioModal,
  showVideoModal,
  onTogglePopup,
}: MediaPermissionNotificationProps) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const showAudioPopup = useMemo(
    () => showAudioModal !== null && showAudioModal,
    [showAudioModal],
  );
  const showVideoPopup = useMemo(
    () => showVideoModal !== null && showVideoModal,
    [showVideoModal],
  );

  useEffect(() => {
    const show = showAudioPopup || showVideoPopup;
    setShowNotificationModal(show);
  }, [showAudioPopup, showVideoPopup]);

  const { heading, body } = useMemo(() => {
    if (showAudioPopup && showVideoPopup) {
      return notificationModal.cameraMicNotFound;
    }
    if (showAudioPopup) {
      return notificationModal.micNotFound;
    }
    if (showVideoPopup) {
      return notificationModal.cameraNotFound;
    }
    return { heading: '', body: '' };
  }, [showAudioPopup, showVideoPopup]);

  const onClose = () => {
    setShowNotificationModal(false);
    if (showAudioModal) {
      onTogglePopup('audio');
    }
    if (showVideoModal) {
      onTogglePopup('video');
    }
  };

  return (
    <Modal
      isFullScreen={false}
      testId="testElementDelete"
      open={showNotificationModal}
      onClose={onClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      <ModalHeader>{heading}</ModalHeader>
      <ModalBody align="center">
        <TSpan
          data-testid="bodyElementDelete"
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
        >
          {body}
        </TSpan>
      </ModalBody>
      <ModalFooter flexDirection="column" marginTop={12} gap={16}>
        <Button
          data-testid="cancelElementDelete"
          tertiary
          size="full"
          onClick={() => onClose()}
        >
          {t(`noumena.social_hall.hardware_testing_modal_close`)}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
