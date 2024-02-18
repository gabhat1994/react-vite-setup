import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router';
import routes from '@/constants/routes';
import { useError, useToast } from '@/hooks';
import { useFormLocalDraft } from '@/hooks/formLocalDraft';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import { useNavigateWithOrigin } from '@/hooks/navigation';
import {
  contractFormSchema,
  type ContractFormValues,
  type DraftContractFormValues,
} from '../../hooks/contractForm';
import { type Contract, type ContractBasic, DocumentType } from '../../types';
import { DeleteDocumentConfirmationModal } from '../DeleteDocumentConfirmationModal/DeleteDocumentConfirmationModal';
import * as DocumentHeader from '../DocumentHeader/DocumentHeader';
import { ContractUtils } from '../../utils/contract';
import { useContractPermissions } from '../../hooks/contractPermissions';

type ModalType = 'delete';

type ContractFormHeaderProps = {
  contract: ContractBasic | null;
  isEditMode: boolean;
  onSaveDraft(values: DraftContractFormValues): Promise<Contract | null>;
  onSaveDraftSuccess?(contract: Contract): void;
  onDeleteDraft(): Promise<void>;
  onGoBackToList(): void;
};

export const ContractFormHeader = ({
  contract,
  isEditMode,
  onSaveDraft,
  onSaveDraftSuccess,
  onDeleteDraft,
  onGoBackToList,
}: ContractFormHeaderProps) => {
  const { navigateAndPassOrigin } = useNavigateWithOrigin();
  const { t } = useTranslation();
  const { addPrimaryIconToast, addSuccessIconToast, addErrorToast } =
    useToast();
  const { logError } = useError();
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const ContractPermissions = useContractPermissions();

  const form = useFormContext<ContractFormValues>();
  const {
    watch,
    formState: { isDirty },
  } = form;

  const { lastSavedAt, markLocalChangesAsSaved } = useFormLocalDraft({ form });

  const documentTitle = watch('title');

  const handlePreview = async () => {
    if (!contract?._id) {
      return;
    }

    if (!ContractPermissions.canSeeSummary(contract)) {
      await form.trigger();
      addErrorToast(t('noumena.contract_form.toast.not_completed'));
      return;
    }

    if (isDirty) {
      await handleSaveDraft();
    }
    navigateAndPassOrigin(
      generatePath(routes.CONTRACT_PREVIEW, { id: contract._id }),
    );
  };

  const handleSaveDraft = async () => {
    const values = contractFormSchema.cast(form.getValues());

    if (!values.noumId) {
      addPrimaryIconToast(t('noumena.contract_form.toast.no_noum_selected'));
      return;
    }

    try {
      const updatedDraft = await onSaveDraft(values);
      if (!updatedDraft) {
        return;
      }

      onSaveDraftSuccess?.(updatedDraft);
      markLocalChangesAsSaved();
      addSuccessIconToast(t('noumena.contract_form.toast.draft_saved'));
    } catch (err) {
      logError(err, 'contract-save-draft');
    }
  };

  const handleDeleteDraft = () => {
    if (isEditMode) {
      openModal('delete');
    } else {
      onGoBackToList();
    }
  };

  const confirmDraftDelete = async () => {
    try {
      await onDeleteDraft();
      addSuccessIconToast(t('noumena.contract_form.toast.draft_deleted'));
      closeModal();
      onGoBackToList();
    } catch (err) {
      closeModal();
      logError(err, 'contract-delete-draft');
    }
  };

  return (
    <>
      <StickyFormHeader
        title={
          isEditMode
            ? t('noumena.contract_form.title.edit')
            : t('noumena.contract_form.title.create')
        }
        hasUnsavedChanges={isDirty}
        updatedAt={lastSavedAt?.toISOString()}
        buttons={
          <>
            <DocumentHeader.DeleteButton
              onClick={handleDeleteDraft}
              isDraft={ContractUtils.isDraft(contract)}
            />
            <DocumentHeader.SaveButton
              isDraft={ContractUtils.isDraft(contract)}
              onClick={handleSaveDraft}
              disabled={!isEditMode || !isDirty}
            />
            <DocumentHeader.SummaryButton
              onClick={handlePreview}
              softDisabled={
                !isEditMode || !ContractPermissions.canSeeSummary(contract)
              }
            />
          </>
        }
      />
      <DeleteDocumentConfirmationModal
        isOpen={modalType === 'delete'}
        isDraft={ContractUtils.isDraft(contract)}
        documentName={documentTitle}
        documentType={DocumentType.Contract}
        onCancel={closeModal}
        onDelete={confirmDraftDelete}
      />
    </>
  );
};
