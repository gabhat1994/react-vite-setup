import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import routes from '@/constants/routes';
import { useError, useToast } from '@/hooks';
import { useFormLocalDraft } from '@/hooks/formLocalDraft';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { useNavigateWithOrigin } from '@/hooks/navigation';
import {
  type DraftStatementOfWorkFormValues,
  statementOfWorkFormSchema,
  type StatementOfWorkFormValues,
} from '../../hooks/statementOfWorkForm';
import { useStatementOfWorkPermissions } from '../../hooks/statementOfWorkPermissions';
import {
  DocumentType,
  type StatementOfWork,
  type StatementOfWorkBasic,
} from '../../types';
import { StatementOfWorkUtils } from '../../utils/statementOfWork';
import { DeleteDocumentConfirmationModal } from '../DeleteDocumentConfirmationModal/DeleteDocumentConfirmationModal';
import * as DocumentHeader from '../DocumentHeader/DocumentHeader';

type ModalType = 'delete';

type StatementOfWorkFormHeaderProps = {
  statementOfWork: StatementOfWorkBasic | null;
  isEditMode: boolean;
  onSaveDraft(
    values: DraftStatementOfWorkFormValues,
  ): Promise<StatementOfWork | null>;
  onSaveDraftSuccess?(statementOfWork: StatementOfWork): void;
  onDeleteDraft(): Promise<void>;
  onGoBackToList(): void;
};

export const StatementOfWorkFormHeader = ({
  statementOfWork,
  isEditMode,
  onSaveDraft,
  onSaveDraftSuccess,
  onDeleteDraft,
  onGoBackToList,
}: StatementOfWorkFormHeaderProps) => {
  const { navigateAndPassOrigin } = useNavigateWithOrigin();
  const { t } = useTranslation();
  const { addErrorToast, addPrimaryIconToast, addSuccessIconToast } =
    useToast();
  const { logError } = useError();
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const form = useFormContext<StatementOfWorkFormValues>();
  const {
    watch,
    formState: { isDirty },
  } = form;

  const { lastSavedAt, markLocalChangesAsSaved } = useFormLocalDraft({ form });
  const StatementOfWorkPermissions = useStatementOfWorkPermissions();

  const documentTitle = watch('title');

  const handlePreview = async () => {
    if (!statementOfWork?._id) {
      return;
    }

    if (!StatementOfWorkPermissions.canSeeSummary(statementOfWork)) {
      await form.trigger();
      addErrorToast(t('noumena.statement_of_work_form.toast.not_completed'));
      return;
    }

    if (isDirty) {
      await handleSaveDraft();
    }

    navigateAndPassOrigin(
      generatePath(routes.STATEMENT_OF_WORK_PREVIEW, {
        id: statementOfWork._id,
      }),
    );
  };

  const handleSaveDraft = async () => {
    const values = statementOfWorkFormSchema.cast(form.getValues());

    if (!values.noumId) {
      addPrimaryIconToast(
        t('noumena.statement_of_work_form.toast.no_noum_selected'),
      );
      return;
    }

    try {
      const updatedDraft = await onSaveDraft(values);
      if (!updatedDraft) {
        return;
      }

      onSaveDraftSuccess?.(updatedDraft);
      markLocalChangesAsSaved();
      addSuccessIconToast(
        t('noumena.statement_of_work_form.toast.draft_saved'),
      );
    } catch (err) {
      logError(err, 'sow-save-draft');
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
      addSuccessIconToast(
        t('noumena.statement_of_work_form.toast.draft_deleted'),
      );
      closeModal();
      onGoBackToList();
    } catch (err) {
      closeModal();
      logError(err, 'sow-delete-draft');
    }
  };

  return (
    <>
      <StickyFormHeader
        title={
          isEditMode
            ? t('noumena.statement_of_work_form.title.edit')
            : t('noumena.statement_of_work_form.title.create')
        }
        hasUnsavedChanges={isDirty}
        updatedAt={lastSavedAt?.toISOString()}
        buttons={
          <>
            <DocumentHeader.DeleteButton
              onClick={handleDeleteDraft}
              isDraft={StatementOfWorkUtils.isDraft(statementOfWork)}
            />
            <DocumentHeader.SaveButton
              isDraft={StatementOfWorkUtils.isDraft(statementOfWork)}
              onClick={handleSaveDraft}
              disabled={!isEditMode || !isDirty}
            />
            <DocumentHeader.SummaryButton
              onClick={handlePreview}
              softDisabled={
                !isEditMode ||
                !StatementOfWorkPermissions.canSeeSummary(statementOfWork)
              }
            />
          </>
        }
      />
      <DeleteDocumentConfirmationModal
        isOpen={modalType === 'delete'}
        isDraft={StatementOfWorkUtils.isDraft(statementOfWork)}
        documentName={documentTitle}
        documentType={DocumentType.Sow}
        onCancel={closeModal}
        onDelete={confirmDraftDelete}
      />
    </>
  );
};
