import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import * as S from './styles';
import { type DiscardExperienceModalProps } from './types';

const DiscardExperienceModal = ({
  isOpen,
  experienceId,
  onClose,
  handleCloseExperienceModal,
  handleDeleteOption,
}: DiscardExperienceModalProps) => {
  const { t } = useTranslation();

  const handleUpdateOptions = () => {
    handleDeleteOption(experienceId);
    handleCloseExperienceModal();
    onClose();
  };

  return (
    <Modal
      testId="reference-delete-modal"
      open={isOpen}
      onClose={onClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      <ModalHeader>
        {t(`noumena.chamber_edit.discard_experience.heading`)}
      </ModalHeader>
      <S.ModalDescription
        style={{
          textAlign: 'center',
        }}
        font="body-l"
        colorToken="--text-modal-neutral-default"
      >
        {t(`noumena.chamber_edit.discard_experience.subheading`)}
      </S.ModalDescription>
      <ModalFooter flexDirection="column" gap={16}>
        <Button
          size="full"
          intent="negative"
          testId="delete-reference-btn"
          onClick={handleUpdateOptions}
        >
          {t(`noumena.chamber_edit.discard_experience.discard`)}
        </Button>
        <Button
          size="full"
          tertiary
          testId="delete-reference-no-btn"
          onClick={onClose}
        >
          {t(`noumena.chamber_edit.discard_experience.discard_cancel`)}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DiscardExperienceModal;
