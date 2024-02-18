import React from 'react';
import { t } from 'i18next';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalSize,
} from '@/components/ExtendedModal';
import { Spacer } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import {
  ConnectionRequestStatus,
  ConnectionRequestTypeEnum,
} from '@/apollo/generated/types';
import { type MembersModalProps } from './types';
import { MemberRequestInformation } from './MemberRequestInformation';

export const MembersModal: React.FC<MembersModalProps> = (props) => {
  const {
    onClose,
    isOpen = false,
    user,
    onConfirm,
    isActionLoading,
    connectionStatus,
    actionType,
    dateText,
    date,
  } = props;
  const connectionType =
    connectionStatus === ConnectionRequestStatus.Invited
      ? t(`noumena.noums.requests_or_invites.type.invitation`)
      : t(`noumena.noums.requests_or_invites.type.request`);

  const actionLabel =
    actionType === ConnectionRequestTypeEnum.Approved
      ? t(`noumena.Accept`)
      : actionType === ConnectionRequestTypeEnum.Declined
      ? t(`noumena.decline`)
      : actionType === ConnectionRequestTypeEnum.Cancelled
      ? t(`noumena.cancel`)
      : '';

  return (
    <Modal
      isFullScreen={false}
      open={isOpen}
      testId="delete_request"
      onClose={onClose}
      size={ModalSize.S}
    >
      <ModalHeader isFullScreen={false}>
        {`${actionLabel} ${connectionType}`}
      </ModalHeader>
      <ModalBody isFullScreen={false}>
        <TSpan
          data-testid="delete_confirm_text"
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
        >
          {t(`noumena.noums.requests_or_invites.modal.action.description`, {
            action: actionLabel.toLocaleLowerCase(),
            type: connectionType.toLocaleLowerCase(),
          })}
        </TSpan>
        <Spacer height={16} />
        <MemberRequestInformation
          user={user}
          gap={12}
          date={date}
          dateText={dateText}
        />
      </ModalBody>
      <ModalFooter isFullScreen={false} flexDirection="column" gap={16}>
        <Button
          testId="request_delete_btn"
          disabled={isActionLoading}
          loading={isActionLoading}
          intent="negative"
          size="full"
          onClick={onConfirm}
        >
          {t('noumena.noums.requests_or_invites.modal.button.yes', {
            action: actionLabel,
            type: connectionType,
          })}
        </Button>
        <Button
          tertiary
          disabled={isActionLoading}
          onClick={onClose}
          size="full"
          testId="request_delete_cancel_btn"
        >
          {t('noumena.modal.no_keep_it')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MembersModal;
