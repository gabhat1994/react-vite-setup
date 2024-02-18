import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PersonalDetails from '@/screens/CoreSettings/PersonalDetails';
import { Modal, ModalHeader, ModalSize } from '@/components/ExtendedModal';
import { type PersonalDetailsModalProps } from './types';

export const PersonalDetailsModal = memo((props: PersonalDetailsModalProps) => {
  const { t } = useTranslation();

  const handleClose = useCallback(() => {
    props.handleClose(true);
  }, [props]);

  const handleSuccess = () => {
    props.handleSuccess(props.spaceId);
  };

  return (
    <Modal
      open={props.isOpen}
      testId="testPersonalDetailsModal"
      onClose={handleClose}
      enableCloseButton
      size={ModalSize.XL}
      disableBackdropClick
    >
      <ModalHeader>{t(`noumena.homenoum.edit_personal_details`)}</ModalHeader>
      <PersonalDetails spaceId={props?.spaceId} handleSuccess={handleSuccess} />
    </Modal>
  );
});
