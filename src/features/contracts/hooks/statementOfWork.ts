import {
  GetSingleSowDocument,
  type GetSingleSowQuery,
  type GetSingleSowQueryVariables,
  useCreateNewSowMutation,
  useDeleteSowMutation,
  useGetSingleSowQuery,
  useUpdateSowMutation,
} from '@/apollo/graphql';
import { StatementOfWorkFormMapper } from '../utils/statementOfWorkFormMapper';
import {
  type DraftStatementOfWorkFormValues,
  type StatementOfWorkFormValues,
} from './statementOfWorkForm';

export function useStatementOfWork(id?: string) {
  const [createNewSowMutation] = useCreateNewSowMutation();
  const [updateSowMutation] = useUpdateSowMutation();
  const [deleteSowMutation] = useDeleteSowMutation();

  const { data, loading } = useGetSingleSowQuery({
    variables: {
      id: id!,
    },
    fetchPolicy: 'cache-and-network',
    skip: !id,
  });

  const statementOfWork = data?.getSingleSOW ?? null;

  async function createStatementOfWork(values: DraftStatementOfWorkFormValues) {
    const result = await createNewSowMutation({
      variables: {
        input: StatementOfWorkFormMapper.toCreateNewSowInput(values),
      },
      update: (cache, res) => {
        const resSow = res.data?.createNewSOW;
        if (!resSow) {
          return;
        }

        cache.writeQuery<GetSingleSowQuery, GetSingleSowQueryVariables>({
          query: GetSingleSowDocument,
          variables: {
            id: resSow._id,
          },
          data: {
            getSingleSOW: resSow,
          },
        });
      },
    });

    const newStatementOfWork = result.data?.createNewSOW;
    if (!newStatementOfWork) {
      throw new Error(
        'Unable to create a statement of work. Please try again later.',
      );
    }
    return newStatementOfWork;
  }

  async function updateStatementOfWork(values: StatementOfWorkFormValues) {
    if (!id) {
      return null;
    }

    const result = await updateSowMutation({
      variables: {
        id,
        input: StatementOfWorkFormMapper.toUpdateSowInput(values),
      },
    });

    const updatedStatementOfWork = result.data?.updateSOW;
    if (!updatedStatementOfWork) {
      throw new Error(
        'Unable to update the statement of work. Please try again later.',
      );
    }

    return updatedStatementOfWork;
  }

  async function deleteStatementOfWork(deletedId: string | undefined = id) {
    if (!deletedId) {
      return;
    }

    const success = await deleteSowMutation({
      variables: {
        id: deletedId,
      },
    });

    if (!success) {
      throw new Error('Unable to delete the SOW. Please try again later.');
    }
  }

  return {
    statementOfWork,
    isLoading: loading,
    createStatementOfWork,
    updateStatementOfWork,
    deleteStatementOfWork,
  };
}
