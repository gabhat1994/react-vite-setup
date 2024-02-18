import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout';

import * as S from './styles';
import { type DeleteReferenceModalProps } from './types';

const DeleteChamberBroadcastModal = ({
  isOpen,
  onClose,
  handleDiscardReference,
}: DeleteReferenceModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      testId="reference-delete-modal"
      open={isOpen}
      onClose={onClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      <ModalHeader>
        {t(`noumena.chamber_edit.delete_reference.heading`)}
      </ModalHeader>
      <S.ModalDescription
        style={{
          textAlign: 'center',
        }}
        font="body-l"
        colorToken="--text-modal-neutral-default"
      >
        {t(`noumena.chamber_edit.delete_reference.subheading`)}
      </S.ModalDescription>
      <ModalFooter flexDirection="column">
        <Button
          size="full"
          intent="negative"
          secondary
          testId="delete-reference-btn"
          onClick={handleDiscardReference}
        >
          {t(`noumena.chamber_edit.delete_reference.discard`)}
        </Button>
        <Spacer height={16} />
        <Button
          size="full"
          tertiary
          testId="delete-reference-no-btn"
          onClick={onClose}
        >
          {t(`noumena.cancel`)}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteChamberBroadcastModal;
