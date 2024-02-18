import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ChamberActionModal } from '../ChamberActionModal/ActionModal/ChamberActionModal';

export interface DeleteCommentModalProps {
  isOpen: boolean;
  cancelCallback: () => void;
  confirmCallback: () => void;
  type?: string;
}

export const DeleteCommentModal = memo(
  ({
    isOpen,
    cancelCallback,
    confirmCallback,
    type,
  }: DeleteCommentModalProps) => {
    const { t } = useTranslation();

    return (
      <ChamberActionModal
        positiveBtnLabel={
          type === 'reply'
            ? t(`noumena.reply_delete_confirm_btn`)
            : t(`noumena.comment_delete_confirm_btn`)
        }
        negativeBtnLabel={t(`noumena.comment_delete_cancel_btn`)}
        positiveBtnType="primary"
        positiveBtnIntent="negative"
        title={
          type === 'reply'
            ? t(`noumena.container.reply_delete_title`)
            : t(`noumena.container.comment_delete_title`)
        }
        description={t(`noumena.container.comment_delete.description`)}
        isOpen={isOpen}
        cancelCallback={cancelCallback}
        confirmCallback={confirmCallback}
      />
    );
  },
);
