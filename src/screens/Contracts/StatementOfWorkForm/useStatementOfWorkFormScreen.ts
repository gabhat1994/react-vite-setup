import { useEffect, useState } from 'react';
import { useStatementOfWork } from '@/features/contracts/hooks/statementOfWork';
import {
  statementOfWorkFormSchema,
  useStatementOfWorkForm,
} from '@/features/contracts/hooks/statementOfWorkForm';
import { StatementOfWorkFormMapper } from '@/features/contracts/utils/statementOfWorkFormMapper';
import { useError } from '@/hooks';

interface UseStatementOfWorkFormScreenOptions {
  id?: string;
  noumId?: string;
  onCreate(id: string): void;
}

export function useStatementOfWorkFormScreen({
  id,
  noumId,
  onCreate,
}: UseStatementOfWorkFormScreenOptions) {
  const { logError } = useError();

  const [isCreating, setIsCreating] = useState(false);
  const isEditMode = !!id;

  const form = useStatementOfWorkForm({
    defaultValues: StatementOfWorkFormMapper.getDefaultValues({
      noumId,
    }),
  });
  const { reset, getValues, watch } = form;

  const selectedNoumId = watch('noumId') ?? noumId;

  const {
    isLoading,
    statementOfWork,
    createStatementOfWork,
    updateStatementOfWork,
    deleteStatementOfWork,
  } = useStatementOfWork(id);

  useEffect(() => {
    if (statementOfWork) {
      reset(StatementOfWorkFormMapper.fromStatementOfWork(statementOfWork));
    }
  }, [reset, statementOfWork]);

  useEffect(() => {
    async function createAndGoToEdit() {
      const values = statementOfWorkFormSchema.cast(getValues());

      try {
        setIsCreating(true);
        const newContract = await createStatementOfWork({
          ...values,
          noumId: selectedNoumId,
        });
        onCreate(newContract._id);
      } catch (err) {
        logError(err, 'contract-create-draft');
      } finally {
        setIsCreating(false);
      }
    }

    if (!isEditMode && selectedNoumId) {
      createAndGoToEdit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues, isEditMode, selectedNoumId]);

  return {
    form,
    isLoading,
    isCreating,
    isEditMode,
    statementOfWork,
    updateDraft: updateStatementOfWork,
    deleteDraft: deleteStatementOfWork,
  };
}
