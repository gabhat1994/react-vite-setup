import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ExtendedModal/Modal';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { useError, useToast } from '@/hooks';
import S from './styles';
import { useFileManagerElementContext } from '../../elements/FileManagerElement/providers/FileManagerElementProvider';

type FileManagerDeleteModalProps = {
  isOpenModal: boolean;
  fileId: string;
  onClose: () => void;
  onConfirm: () => void;
};
export const FileManagerDeleteModal: React.FC<FileManagerDeleteModalProps> = ({
  isOpenModal,
  fileId,
  onClose,
  onConfirm,
}) => {
  const { deleteFile } = useFileManagerElementContext();
  const { logError } = useError();
  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useTranslation();
  const { addToast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFile(fileId);
      addToast('primary', 'icon', t('noumena.file_manager.toast.file_deleted'));
      onConfirm();
    } catch (error) {
      logError(error, 'deleteNoumFile', true);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      isFullScreen={false}
      open={isOpenModal}
      testId="question_modal"
      onClose={onClose}
      disableBackdropClick
    >
      <Stack
        gap={16}
        padding={14}
        vertical
        maxWidth={327}
        align="center"
        justify="center"
      >
        <TSpan
          font="heading-s-bold"
          colorToken="--text-modal-header-neutral-default"
        >
          {t('noumena.file_manager.delete_modal.title')}
        </TSpan>
        <TSpan
          data-testid="confirm_text"
          font="body-l"
          textAlign="center"
          colorToken="--text-modal-neutral-default"
        >
          {t('noumena.file_manager.delete_modal.description')}
        </TSpan>

        <S.ActionsButtonsContainer>
          <Button
            primary
            size="full"
            testId="confirm_btn"
            intent="negative"
            grow
            loading={isDeleting}
            onClick={handleDelete}
          >
            {t('noumena.file_manager.delete_modal.confirm_button')}
          </Button>
          <Button tertiary onClick={onClose} size="full" testId="cancel_btn">
            {t('noumena.file_manager.delete_modal.cancel_button')}
          </Button>
        </S.ActionsButtonsContainer>
      </Stack>
    </Modal>
  );
};
