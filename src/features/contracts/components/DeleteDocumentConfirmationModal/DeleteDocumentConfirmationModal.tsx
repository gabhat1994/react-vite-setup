import { Trans, useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import S from './styles';
import { DocumentType } from '../../types';

interface DeleteDocumentConfirmationModalProps {
  isOpen: boolean;
  isDraft: boolean;
  documentType: DocumentType;
  documentName: string;
  onDelete(): void;
  onCancel(): void;
}

export function DeleteDocumentConfirmationModal({
  isOpen,
  isDraft,
  documentType,
  documentName,
  onDelete,
  onCancel,
}: DeleteDocumentConfirmationModalProps) {
  const { t } = useTranslation();

  const translationContext =
    documentType === DocumentType.Contract ? 'contract' : 'sow';

  return (
    <Modal
      testId="contracts-document-delete-modal"
      open={isOpen}
      onClose={onCancel}
      size={ModalSize.S}
      disableBackdropClick
    >
      <ModalHeader>
        {isDraft
          ? t('noumena.contracts.delete_document.title.draft')
          : t('noumena.contracts.delete_document.title', {
              context: translationContext,
            })}
      </ModalHeader>
      <ModalBody>
        <TSpan
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
        >
          <Trans
            i18nKey={
              isDraft
                ? 'noumena.contracts.delete_document.description.draft'
                : 'noumena.contracts.delete_document.description'
            }
            components={[<S.Title />]}
            values={{ documentName }}
            context={isDraft ? undefined : translationContext}
          />
        </TSpan>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16}>
        <Button
          size="full"
          intent="negative"
          primary
          testId="delete-reference-btn"
          onClick={onDelete}
        >
          {isDraft
            ? t('noumena.contracts.delete_document.confirm.draft')
            : t('noumena.contracts.delete_document.confirm', {
                context: translationContext,
              })}
        </Button>
        <Button
          size="full"
          tertiary
          testId="delete-reference-no-btn"
          onClick={onCancel}
        >
          {t(`noumena.cancel`)}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
