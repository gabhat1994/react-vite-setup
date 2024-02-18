import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContractSow, Parties } from '@/apollo/generated/types';
import {
  useGetLinkedSoWsQuery,
  useResendDocumentNotificationMutation,
} from '@/apollo/graphql';
import { useContract } from '@/features/contracts/hooks/contract';
import { useContractPdfWithSignature } from '@/features/contracts/hooks/contractPdf';
import { useContractPermissions } from '@/features/contracts/hooks/contractPermissions';
import { useContractPreviewForm } from '@/features/contracts/hooks/contractPreviewForm';
import { useContractPreviewValidation } from '@/features/contracts/hooks/contractPreviewValidation';
import { useContractSigning } from '@/features/contracts/hooks/contractSigning';
import { useDocumentPreviewSignatureForm } from '@/features/contracts/hooks/documentPreviewSignatureForm';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { useToast } from '@/hooks/toast';
import { cleanList } from '@/utils/list';
import { UserUtil } from '@/utils/user';

type PreviewStep = 'Summary' | 'ConfirmSignature';

type ModalType = 'secretNoumAlert';

interface UseContractPreviewScreenOptions {
  id?: string;
}

export function useContractPreviewScreen({
  id,
}: UseContractPreviewScreenOptions) {
  const [previewStep, setPreviewStep] = useState<PreviewStep>('Summary');

  const { t } = useTranslation();
  const { addSuccessIconToast, addErrorToast, addPrimaryIconToast } =
    useToast();
  const ContractPermissions = useContractPermissions();
  const ContractPreviewValidation = useContractPreviewValidation();

  const { modalType, openModal, closeModal, contextData } = useModalManager<
    ModalType,
    { isUnauthenticated: boolean }
  >();

  const {
    contract,
    isLoading: isSummaryLoading,
    deleteContract,
  } = useContract({ id });

  const linkedSowsQuery = useGetLinkedSoWsQuery({
    variables: {
      contractId: id!,
    },
    skip: !id,
  });

  const linkedSows = useMemo(
    () => cleanList(linkedSowsQuery.data?.getLinkedSOWs.data),
    [linkedSowsQuery.data?.getLinkedSOWs],
  );

  const pdfWithSignature = useContractPdfWithSignature({
    id,
    contract,
  });

  const signing = useContractSigning({ id });

  const summaryForm = useContractPreviewForm({
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
    if (!contract?.buyer || !contract.seller || !contract?.linkedNoum._id) {
      return;
    }

    if (!ContractPreviewValidation.isOwnerAParty(contract)) {
      addErrorToast(
        'To share the contract, you need to be one of the contracting parties.',
      );
      return;
    }

    if (
      !(await ContractPreviewValidation.canReceiveDocument(
        contract,
        contract.buyer,
      ))
    ) {
      openModal('secretNoumAlert', {
        isUnauthenticated: UserUtil.isUnauthenticated(contract.buyer.userId),
      });
      return;
    }

    if (
      !(await ContractPreviewValidation.canReceiveDocument(
        contract,
        contract.seller,
      ))
    ) {
      openModal('secretNoumAlert', {
        isUnauthenticated: UserUtil.isUnauthenticated(contract.seller.userId),
      });
      return;
    }

    setPreviewStep('ConfirmSignature');
  };

  const handleSignatureSubmit = async () => {
    if (!contract) {
      return;
    }

    try {
      if (ContractPermissions.isOwner(contract)) {
        await signing.sendForSigning();
        addSuccessIconToast(
          t('noumena.contract_preview.toast.sent_for_signing'),
        );
      } else {
        await signing.sign();
        addSuccessIconToast(t('noumena.contract_preview.toast.signed'));
      }
      setPreviewStep('Summary');
    } catch (err) {
      if (err instanceof Error) {
        addErrorToast(err.message);
      }
    }
  };

  const handleDeclineContract = async () => {
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

  const handleDeleteContract = async () => {
    try {
      await deleteContract(id);
      addSuccessIconToast(t('noumena.contract_preview.toast.draft_deleted'));
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
          type: ContractSow.Contract,
          sendTo: [Parties.CounterParty],
        },
      });
      addSuccessIconToast(t('noumena.contract_preview.toast.resent'));
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
    linkedSows: {
      data: linkedSows,
      loading: linkedSowsQuery.loading,
    },
    contract,
    previewStep,
    changeStep: setPreviewStep,
    deleteContract: handleDeleteContract,
    declineContract: handleDeclineContract,
    duplicateContract: handleDuplicate,
    resendContract: handleResend,
    modalType,
    openModal,
    closeModal,
    contextData,
  };
}
