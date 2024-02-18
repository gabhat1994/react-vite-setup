import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentPreviewSignatureForm } from '@/features/contracts/hooks/documentPreviewSignatureForm';
import { useStatementOfWork } from '@/features/contracts/hooks/statementOfWork';
import { useStatementOfWorkPdfWithSignature } from '@/features/contracts/hooks/statementOfWorkPdf';
import { useStatementOfWorkPermissions } from '@/features/contracts/hooks/statementOfWorkPermissions';
import { useStatementOfWorkPreviewForm } from '@/features/contracts/hooks/statementOfWorkPreviewForm';
import { useStatementOfWorkSigning } from '@/features/contracts/hooks/statementOfWorkSigning';
import { useToast } from '@/hooks';
import { ContractUtils } from '@/features/contracts/utils/contract';
import { useResendDocumentNotificationMutation } from '@/apollo/graphql';
import { ContractSow, Parties } from '@/apollo/generated/types';

type PreviewStep = 'Summary' | 'ConfirmSignature';

interface UseStatementOfWorkPreviewScreenOptions {
  id?: string;
}

export function useStatementOfWorkPreviewScreen({
  id,
}: UseStatementOfWorkPreviewScreenOptions) {
  const [previewStep, setPreviewStep] = useState<PreviewStep>('Summary');

  const { t } = useTranslation();
  const { addSuccessIconToast, addErrorToast, addPrimaryIconToast } =
    useToast();
  const StatementOfWorkPermissions = useStatementOfWorkPermissions();

  const {
    statementOfWork,
    isLoading: isSummaryLoading,
    deleteStatementOfWork,
  } = useStatementOfWork(id);

  const pdfWithSignature = useStatementOfWorkPdfWithSignature({
    id,
    statementOfWork,
  });

  const signing = useStatementOfWorkSigning({ id });

  const summaryForm = useStatementOfWorkPreviewForm({
    defaultValues: {
      eSign: false,
      isAuthorized: false,
      termsAndConditions: false,
    },
  });

  const signatureForm = useDocumentPreviewSignatureForm({
    defaultValues: {
      documentContentsChecked: false,
      validSignature: false,
    },
  });

  const [resendDocumentNotification] = useResendDocumentNotificationMutation();

  const handleSummarySubmit = async () => {
    if (ContractUtils.isDraft(statementOfWork?.linkedContract)) {
      addErrorToast(
        t('noumena.statement_of_work_preview.toast.draft_contract', {
          documentName: ContractUtils.formatDocumentNameWithNumber(
            statementOfWork?.linkedContract,
          ),
        }),
      );
      return;
    }

    setPreviewStep('ConfirmSignature');
  };

  const handleSignatureSubmit = async () => {
    if (!statementOfWork) {
      return;
    }

    try {
      if (StatementOfWorkPermissions.isOwner(statementOfWork)) {
        await signing.sendForSigning();
        addSuccessIconToast(
          t('noumena.statement_of_work_preview.toast.sent_for_signing'),
        );
      } else {
        await signing.sign();
        addSuccessIconToast(
          t('noumena.statement_of_work_preview.toast.signed'),
        );
      }
      setPreviewStep('Summary');
    } catch (err) {
      if (err instanceof Error) {
        addErrorToast(err.message);
      }
    }
  };

  const handleDeclineStatementOfWork = async () => {
    try {
      await signing.reject();
      addSuccessIconToast(t('noumena.contract_preview.toast.declined'));
      setPreviewStep('Summary');
    } catch (err) {
      if (err instanceof Error) {
        addErrorToast(err.message);
      }
    }
  };

  const handleDeleteStatementOfWork = async () => {
    try {
      await deleteStatementOfWork(id);
      addSuccessIconToast(
        t('noumena.statement_of_work_preview.toast.draft_deleted'),
      );
    } catch (err) {
      if (err instanceof Error) {
        addErrorToast(err.message);
      }
    }
  };

  const handleDuplicate = async () => {
    addPrimaryIconToast('QA Note: Duplicating is not implemented yet.');
  };

  const handleResend = async () => {
    if (!id) {
      return;
    }

    try {
      await resendDocumentNotification({
        variables: {
          documentId: id,
          type: ContractSow.Sow,
          sendTo: [Parties.CounterParty],
        },
      });
      addSuccessIconToast(t('noumena.statement_of_work_preview.toast.resent'));
    } catch (err) {
      if (err instanceof Error) {
        addErrorToast(err.message);
      }
    }
  };

  return {
    summary: {
      isLoading: isSummaryLoading,
      form: summaryForm,
      onSubmit: handleSummarySubmit,
    },
    signature: {
      isLoading: pdfWithSignature.loading,
      pdfWithSignature: pdfWithSignature.pdfData ?? undefined,
      form: signatureForm,
      onSubmit: handleSignatureSubmit,
    },
    statementOfWork,
    previewStep,
    changeStep: setPreviewStep,
    deleteStatementOfWork: handleDeleteStatementOfWork,
    declineStatementOfWork: handleDeclineStatementOfWork,
    duplicateStatementOfWork: handleDuplicate,
    resendStatementOfWork: handleResend,
  };
}
