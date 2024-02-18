import {
  GetSingleContractDocument,
  type GetSingleContractQuery,
  type GetSingleContractQueryVariables,
  useCreateNewContractMutation,
  useDeleteContractMutation,
  useGetSingleContractQuery,
  useUpdateContractMutation,
} from '@/apollo/graphql';
import { ContractFormMapper } from '../utils/contractFormMapper';
import { type DraftContractFormValues } from './contractForm';

export function useContract({ id }: { id: string | undefined }) {
  const [createNewContractMutation] = useCreateNewContractMutation();
  const [updateContractMutation] = useUpdateContractMutation();
  const [deleteContractMutation] = useDeleteContractMutation();

  const { data, loading } = useGetSingleContractQuery({
    variables: {
      id: id!,
    },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  const contract = data?.getSingleContract ?? null;

  async function createContract(values: DraftContractFormValues) {
    const result = await createNewContractMutation({
      variables: {
        input: ContractFormMapper.toCreateNewContractInput(values),
      },
      update: (cache, res) => {
        const resContract = res.data?.createNewContract;
        if (!resContract) {
          return;
        }

        cache.writeQuery<
          GetSingleContractQuery,
          GetSingleContractQueryVariables
        >({
          query: GetSingleContractDocument,
          variables: {
            id: resContract._id,
          },
          data: {
            getSingleContract: resContract,
          },
        });
      },
    });

    const newContract = result.data?.createNewContract;
    if (!newContract) {
      throw new Error('Unable to create a contract. Please try again later.');
    }
    return newContract;
  }

  async function updateContract(values: DraftContractFormValues) {
    if (!id) {
      return null;
    }

    const result = await updateContractMutation({
      variables: {
        id,
        input: ContractFormMapper.toUpdateContractInput(values),
      },
    });

    const updatedContract = result.data?.updateContract;
    if (!updatedContract) {
      throw new Error('Unable to update the contract. Please try again later.');
    }

    return updatedContract;
  }

  async function deleteContract(deletedId: string | undefined = id) {
    if (!deletedId) {
      return;
    }

    const success = await deleteContractMutation({
      variables: {
        id: deletedId,
      },
    });

    if (!success) {
      throw new Error('Unable to delete the contract. Please try again later.');
    }
  }

  return {
    contract,
    isLoading: loading,
    createContract,
    updateContract,
    deleteContract,
  };
}
