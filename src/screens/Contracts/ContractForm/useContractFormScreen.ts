import { useEffect, useState } from 'react';
import { useContract } from '@/features/contracts/hooks/contract';
import {
  contractFormSchema,
  type DraftContractFormValues,
  useContractForm,
} from '@/features/contracts/hooks/contractForm';
import { useLinkedStatementsOfWork } from '@/features/contracts/hooks/linkedStatementsOfWork';
import { ContractFormMapper } from '@/features/contracts/utils/contractFormMapper';
import { useError } from '@/hooks';

interface UseContractFormScreenOptions {
  id?: string;
  noumId?: string;
  onCreate(id: string): void;
}

export function useContractFormScreen({
  id,
  noumId,
  onCreate,
}: UseContractFormScreenOptions) {
  const { logError } = useError();

  const [isCreating, setIsCreating] = useState(false);
  const [isSynchronizingSows, setIsSynchronizingSows] = useState(false);

  const form = useContractForm({
    defaultValues: ContractFormMapper.getDefaultValues({
      noumId,
    }),
  });
  const { reset, getValues, watch } = form;

  const {
    isLoading,
    contract,
    createContract,
    updateContract,
    deleteContract,
  } = useContract({
    id,
  });

  const selectedNoumId = watch('noumId') ?? noumId;
  const isEditMode = !!id;

  const { linkedSows, unlinkedSows, synchronizeLinkedSows } =
    useLinkedStatementsOfWork({ contractId: id, noumId: selectedNoumId });

  const { loading: isLoadingLinkedSows, data: linkedSowsData } = linkedSows;
  const { loading: isLoadingUnlinkedSows } = unlinkedSows;

  const saveDraft = async (values: DraftContractFormValues) => {
    try {
      const updatedContract = await updateContract(values);
      if (updatedContract) {
        setIsSynchronizingSows(true);
        await synchronizeLinkedSows(values);
      }
      return updatedContract;
    } catch (err) {
      return null;
    } finally {
      setIsSynchronizingSows(false);
    }
  };

  useEffect(() => {
    if (contract) {
      reset({
        ...getValues(),
        ...ContractFormMapper.fromContract(contract),
      });
    }
  }, [contract, getValues, reset]);

  useEffect(() => {
    if (
      !isLoadingLinkedSows &&
      !isLoadingUnlinkedSows &&
      !isSynchronizingSows
    ) {
      reset(
        {
          ...getValues(),
          ...ContractFormMapper.fromLinkedSows(linkedSowsData),
        },
        {
          keepDirty: true,
        },
      );
    }
  }, [
    getValues,
    isLoadingLinkedSows,
    isLoadingUnlinkedSows,
    isSynchronizingSows,
    linkedSowsData,
    reset,
  ]);

  useEffect(() => {
    async function createAndGoToEdit() {
      const values = contractFormSchema.cast(getValues());

      try {
        setIsCreating(true);
        const newContract = await createContract({
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
    contract,
    sowLinking: {
      linkedSows,
      unlinkedSows,
    },
    saveDraft,
    deleteDraft: deleteContract,
  };
}
