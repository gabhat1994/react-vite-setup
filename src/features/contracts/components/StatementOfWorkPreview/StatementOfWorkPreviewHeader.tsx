import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import routes from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { useError } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { UserUtil } from '@/utils/user';
import { useContractPreviewFormContext } from '../../hooks/contractPreviewForm';
import { useStatementOfWorkPermissions } from '../../hooks/statementOfWorkPermissions';
import { DocumentType, type StatementOfWork } from '../../types';
import { StatementOfWorkUtils } from '../../utils/statementOfWork';
import { DeclineDocumentConfirmationModal } from '../DeclineDocumentConfirmationModal/DeclineDocumentConfirmationModal';
import { DeleteDocumentConfirmationModal } from '../DeleteDocumentConfirmationModal/DeleteDocumentConfirmationModal';
import * as DocumentHeader from '../DocumentHeader/DocumentHeader';
import { useDownloadStatementOfWorkPdfLazy } from '../../hooks/statementOfWorkPdf';
import { ContractUtils } from '../../utils/contract';
import { ResendDocumentConfirmationModal } from '../ResendDocumentConfirmationModal/ResendDocumentConfirmationModal';

type ModalType = 'delete' | 'decline' | 'resend';

type StatementOfWorkPreviewHeaderProps = {
  statementOfWork: StatementOfWork | null;
  onConfirmDelete(): Promise<void>;
  onConfirmDecline(): Promise<void>;
  onConfirmResend(): Promise<void>;
  onDuplicate(): Promise<void>;
  onGoBackToList(): void;
};

export const StatementOfWorkPreviewHeader = ({
  statementOfWork,
  onConfirmDelete,
  onConfirmDecline,
  onConfirmResend,
  onDuplicate,
  onGoBackToList,
}: StatementOfWorkPreviewHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logError } = useError();
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const downloadPdf = useDownloadStatementOfWorkPdfLazy();

  const StatementOfWorkPermissions = useStatementOfWorkPermissions();

  const {
    formState: { isValid, isDirty },
  } = useContractPreviewFormContext();

  const handleKeepAsDraft = () => {
    onGoBackToList();
  };

  const handleDeleteDraft = () => {
    openModal('delete');
  };

  const handleDuplicate = async () => {
    await onDuplicate();
  };

  const handleEdit = () => {
    if (!statementOfWork?._id) {
      return;
    }

    navigate(
      generatePath(routes.STATEMENT_OF_WORK_EDIT, { id: statementOfWork._id }),
      {
        replace: true,
      },
    );
  };

  const handleDecline = () => {
    openModal('decline');
  };

  const handleResend = () => {
    openModal('resend');
  };

  const confirmDelete = async () => {
    try {
      await onConfirmDelete();
      closeModal();
      onGoBackToList();
    } catch (err) {
      closeModal();
      logError(err, 'sow-delete-draft');
    }
  };

  const confirmDecline = async () => {
    try {
      await onConfirmDecline();
    } catch (err) {
      logError(err, 'sow-decline');
    } finally {
      closeModal();
    }
  };

  const handleDownloadPdf = () => {
    if (!statementOfWork?._id) {
      return;
    }

    downloadPdf(
      statementOfWork._id,
      StatementOfWorkUtils.formatPdfFileName(statementOfWork),
    );
  };

  const confirmResend = async () => {
    try {
      await onConfirmResend();
    } catch (err) {
      logError(err, 'contract-resend');
    } finally {
      closeModal();
    }
  };

  const isSigningBlocked =
    !(isValid && isDirty) ||
    ContractUtils.isDraft(statementOfWork?.linkedContract);

  return (
    <>
      <StickyFormHeader
        showBackButton={!UserUtil.isUnauthenticated(user)}
        title={t('noumena.statement_of_work_preview.title')}
        buttons={
          StatementOfWorkPermissions.isOwner(statementOfWork) ? (
            <>
              {StatementOfWorkPermissions.canResend(statementOfWork) && (
                <DocumentHeader.ResendButton onClick={handleResend} />
              )}
              {StatementOfWorkPermissions.canEdit(statementOfWork) && (
                <DocumentHeader.EditButton onClick={handleEdit} />
              )}
              {StatementOfWorkPermissions.canDuplicate(statementOfWork) && (
                <DocumentHeader.DuplicateButton onClick={handleDuplicate} />
              )}
              {StatementOfWorkPermissions.canDelete(statementOfWork) && (
                <DocumentHeader.DeleteButton
                  onClick={handleDeleteDraft}
                  isDraft={StatementOfWorkUtils.isDraft(statementOfWork)}
                />
              )}
              {StatementOfWorkPermissions.canDownloadPdf(statementOfWork) &&
                !StatementOfWorkUtils.isDraft(statementOfWork) && (
                  <DocumentHeader.DownloadPdfButton
                    onClick={handleDownloadPdf}
                  />
                )}
              {StatementOfWorkPermissions.canSaveDraft(statementOfWork) && (
                <DocumentHeader.KeepAsDraftButton onClick={handleKeepAsDraft} />
              )}
              {StatementOfWorkPermissions.canSign(statementOfWork) && (
                <DocumentHeader.SendButton softDisabled={isSigningBlocked} />
              )}
            </>
          ) : (
            <>
              {StatementOfWorkPermissions.canDownloadPdf(statementOfWork) &&
                !StatementOfWorkUtils.isDraft(statementOfWork) && (
                  <DocumentHeader.DownloadPdfButton
                    onClick={handleDownloadPdf}
                  />
                )}
              {StatementOfWorkPermissions.canDecline(statementOfWork) && (
                <DocumentHeader.DeclineButton onClick={handleDecline} />
              )}
              {StatementOfWorkPermissions.canSign(statementOfWork) && (
                <DocumentHeader.SendButton softDisabled={isSigningBlocked} />
              )}
            </>
          )
        }
      />

      <DeleteDocumentConfirmationModal
        isOpen={modalType === 'delete'}
        isDraft={StatementOfWorkUtils.isDraft(statementOfWork)}
        documentName={statementOfWork?.title ?? ''}
        documentType={DocumentType.Sow}
        onCancel={closeModal}
        onDelete={confirmDelete}
      />
      <DeclineDocumentConfirmationModal
        isOpen={modalType === 'decline'}
        documentName={statementOfWork?.title ?? ''}
        onCancel={closeModal}
        onDelete={confirmDecline}
      />
      <ResendDocumentConfirmationModal
        isOpen={modalType === 'resend'}
        onCancel={closeModal}
        onConfirm={confirmResend}
      />
    </>
  );
};
