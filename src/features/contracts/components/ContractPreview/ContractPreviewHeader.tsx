import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import routes from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { useError } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { UserUtil } from '@/utils/user';
import { useContractPermissions } from '../../hooks/contractPermissions';
import { useContractPreviewFormContext } from '../../hooks/contractPreviewForm';
import { type Contract, DocumentType } from '../../types';
import { ContractUtils } from '../../utils/contract';
import { DeclineDocumentConfirmationModal } from '../DeclineDocumentConfirmationModal/DeclineDocumentConfirmationModal';
import { DeleteDocumentConfirmationModal } from '../DeleteDocumentConfirmationModal/DeleteDocumentConfirmationModal';
import * as DocumentHeader from '../DocumentHeader/DocumentHeader';
import { useDownloadContractPdfLazy } from '../../hooks/contractPdf';
import { ResendDocumentConfirmationModal } from '../ResendDocumentConfirmationModal/ResendDocumentConfirmationModal';

type ModalType = 'delete' | 'decline' | 'resend';

type ContractPreviewHeaderProps = {
  contract: Contract | null;
  onConfirmDelete(): Promise<void>;
  onConfirmDecline(): Promise<void>;
  onConfirmResend(): Promise<void>;
  onDuplicate(): Promise<void>;
  onGoBackToList(): void;
};

export const ContractPreviewHeader = ({
  contract,
  onConfirmDelete,
  onConfirmDecline,
  onConfirmResend,
  onDuplicate,
  onGoBackToList,
}: ContractPreviewHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logError } = useError();
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const downloadPdf = useDownloadContractPdfLazy();

  const ContractPermissions = useContractPermissions();

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
    if (!contract?._id) {
      return;
    }

    navigate(generatePath(routes.CONTRACT_EDIT, { id: contract._id }), {
      replace: true,
    });
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
      logError(err, 'contract-draft');
    }
  };

  const confirmDecline = async () => {
    try {
      await onConfirmDecline();
    } catch (err) {
      logError(err, 'contract-decline');
    } finally {
      closeModal();
    }
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

  const handleDownloadPdf = () => {
    if (!contract?._id) {
      return;
    }

    downloadPdf(contract._id, ContractUtils.formatPdfFileName(contract));
  };

  return (
    <>
      <StickyFormHeader
        showBackButton={!UserUtil.isUnauthenticated(user)}
        title={t('noumena.contract_preview.title')}
        buttons={
          ContractPermissions.isOwner(contract) ? (
            <>
              {ContractPermissions.canResend(contract) && (
                <DocumentHeader.ResendButton onClick={handleResend} />
              )}
              {ContractPermissions.canEdit(contract) && (
                <DocumentHeader.EditButton onClick={handleEdit} />
              )}
              {ContractPermissions.canDuplicate(contract) && (
                <DocumentHeader.DuplicateButton onClick={handleDuplicate} />
              )}
              {ContractPermissions.canDelete(contract) && (
                <DocumentHeader.DeleteButton
                  onClick={handleDeleteDraft}
                  isDraft={ContractUtils.isDraft(contract)}
                />
              )}
              {ContractPermissions.canDownloadPdf(contract) &&
                !ContractUtils.isDraft(contract) && (
                  <DocumentHeader.DownloadPdfButton
                    onClick={handleDownloadPdf}
                  />
                )}
              {ContractPermissions.canSaveDraft(contract) && (
                <DocumentHeader.KeepAsDraftButton onClick={handleKeepAsDraft} />
              )}
              {ContractPermissions.canSign(contract) && (
                <DocumentHeader.SendButton
                  softDisabled={!(isValid && isDirty)}
                />
              )}
            </>
          ) : (
            <>
              {ContractPermissions.canDownloadPdf(contract) &&
                !ContractUtils.isDraft(contract) && (
                  <DocumentHeader.DownloadPdfButton
                    onClick={handleDownloadPdf}
                  />
                )}
              {ContractPermissions.canDecline(contract) && (
                <DocumentHeader.DeclineButton onClick={handleDecline} />
              )}
              {ContractPermissions.canSign(contract) && (
                <DocumentHeader.SendButton
                  softDisabled={!(isValid && isDirty)}
                />
              )}
            </>
          )
        }
      />
      <DeleteDocumentConfirmationModal
        isOpen={modalType === 'delete'}
        isDraft={ContractUtils.isDraft(contract)}
        documentName={contract?.title ?? ''}
        documentType={DocumentType.Contract}
        onCancel={closeModal}
        onDelete={confirmDelete}
      />
      <DeclineDocumentConfirmationModal
        isOpen={modalType === 'decline'}
        documentName={contract?.title ?? ''}
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
