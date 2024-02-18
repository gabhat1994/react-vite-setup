import React, { useCallback } from 'react';
import { t } from 'i18next';
import { Modal } from '@/components/ExtendedModal/Modal';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { type QuestionModalProps } from './types';
import { StyledTSpan, ActionButtonContainer } from './styles';

export const QuestionModal: React.FC<QuestionModalProps> = ({
  questionId,
  isOpenModal,
  isClosedModal,
  loading,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
  }, [onConfirm]);
  return (
    <Modal
      isFullScreen={false}
      open={isOpenModal ?? false}
      testId="question_modal"
      onClose={onClose}
      disableBackdropClick
    >
      <Stack gap={16} vertical maxWidth={327} align="center" justify="center">
        <StyledTSpan
          font="heading-s-bold"
          colorToken="--text-modal-header-neutral-default"
        >
          {isClosedModal
            ? t('noumena.quick_questions.modal.close_title')
            : t('noumena.quick_questions.modal.delete_title')}
        </StyledTSpan>
        <StyledTSpan
          data-testid="confirm_text"
          font="body-l"
          colorToken="--text-modal-neutral-default"
        >
          {isClosedModal
            ? t('noumena.quick_questions.modal.close_description')
            : t('noumena.quick_questions.modal.delete_description')}
        </StyledTSpan>
        <ActionButtonContainer>
          <Button
            primary
            size="full"
            testId="confirm_btn"
            disabled={!questionId || loading}
            intent={!isClosedModal ? 'negative' : undefined}
            onClick={handleConfirm}
            loading={loading}
          >
            {isClosedModal
              ? t('noumena.quick_questions.modal.close_confirm')
              : t('noumena.quick_questions.modal.delete_confirm')}
          </Button>
          <Button tertiary onClick={onClose} size="full" testId="cancel_btn">
            {isClosedModal
              ? t('noumena.quick_questions.modal.close_cancel')
              : t('noumena.quick_questions.modal.delete_cancel')}
          </Button>
        </ActionButtonContainer>
      </Stack>
    </Modal>
  );
};
