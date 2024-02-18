import React, { useCallback } from 'react';
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
import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import { type RequestOrInvitesActionModalProps } from './types';
import RequstsOrInvitesItemDetail from '../../components/RequstsOrInvitesItemDetail';

export const RequestOrInvitesActionModal: React.FC<
  RequestOrInvitesActionModalProps
> = (props) => {
  const {
    onClose,
    isOpen,
    item,
    onConfirm,
    isActionLoading,
    isInvite,
    isReceived,
    actionType,
  } = props;
  const connectionType = isInvite
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

  const handleConfirm = useCallback(async () => {
    onConfirm();
  }, [onConfirm]);
  return (
    <Modal
      isFullScreen={false}
      open={isOpen ?? false}
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
        <RequstsOrInvitesItemDetail
          item={item}
          showMessage={false}
          isReceived={isReceived}
          isInvite={isInvite}
        />
      </ModalBody>
      <ModalFooter isFullScreen={false} flexDirection="column" gap={16}>
        <Button
          testId="request_delete_btn"
          disabled={isActionLoading}
          loading={isActionLoading}
          intent="negative"
          size="full"
          onClick={handleConfirm}
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

export default RequestOrInvitesActionModal;
