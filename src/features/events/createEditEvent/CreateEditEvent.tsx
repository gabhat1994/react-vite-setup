import { useState } from 'react';

import {
  Modal,
  ModalSize,
  ModalFooter,
  ModalBody,
} from '@/components/ExtendedModal';
import { Stack } from '@/layout';
import { useBreakpoints } from '@/hooks';

import { useCreateEditEventContext } from '../contexts';
import { CustomModalHeader } from './CustomModalHeader';
import { EventInviteHosts } from './components/EventInviteHosts';
import { EventModalHeader } from './components/EventModalHeader';
import { EventModalButtons } from './components/EventModalButtons';
import { EventInviteMembers } from './components/EventInviteMembers';
import { EventDateTimeFields } from './components/EventDateTimeFields';
import { PrivacySettingsField } from './components/PrivacySettingsField';
import { EventBasicInfoFields } from './components/EventBasicInfoFields';
import { EventConfirmationModal } from '../components/EventConfirmationModal';

export const CreateEditEvent = () => {
  const {
    event,
    isOpen,
    onClose,
    modalType,
    eventDate,
    onCancelModal,
    onRemoveMember,
    closeConfirmationModal,
  } = useCreateEditEventContext();

  const [openEventDeleteModal, setOpenEventDeleteModal] = useState(false);

  const { isMobile } = useBreakpoints();

  if (!isOpen) return null;

  const CustomCloseButton = () =>
    isMobile ? (
      <Stack padding="0 16px" justify="end">
        <CustomModalHeader
          isEditing={!!event?._id}
          setOpenEventDeleteModal={setOpenEventDeleteModal}
        />
      </Stack>
    ) : null;

  return (
    <Modal
      testId="create-edit-event-modal"
      open={isOpen}
      onClose={onCancelModal}
      size={ModalSize.XL}
      disableBackdropClick
      customCloseButton={<CustomCloseButton />}
    >
      <EventModalHeader
        isEditing={Boolean(event)}
        onCancelModal={onCancelModal}
      />
      <ModalBody maxHeight="calc(100vh - 170px)">
        <EventBasicInfoFields />
        {!!eventDate && <EventDateTimeFields />}
        <PrivacySettingsField />
        <EventInviteHosts />
        <EventInviteMembers onCancelInvitation={onRemoveMember} />
      </ModalBody>
      <ModalFooter gap={16}>
        <EventModalButtons
          btnSize="large"
          isNoumEditor={true}
          onCancel={onCancelModal}
          openModal={openEventDeleteModal}
          setOpenModal={setOpenEventDeleteModal}
        />
      </ModalFooter>
      {modalType === 'confirmation' && (
        <EventConfirmationModal
          type="discard"
          onClose={closeConfirmationModal}
          onConfirm={onClose}
        />
      )}
    </Modal>
  );
};
