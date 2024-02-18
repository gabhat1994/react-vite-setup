import { useCallback } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { useToast } from '@/hooks/toast';
import {
  GetOwnProjectChambersDocument,
  type GetOwnProjectChambersQuery,
} from '@/apollo/graphql/queries/getOwnProjectChambers.generated';
import { useCreateProjectChamberMutation } from '@/apollo/graphql';
import { type ProjectChamberInput } from '@/apollo/generated/types';
import { PAGE_SIZE } from '@/screens/Chambers/constants';

type CreateProjectChamberResponse = {
  id: string | undefined;
};

export function useCreateProjectChamberHelper() {
  const { addToast } = useToast();

  const handleError = useCallback(
    (networkError: String | Error | null) => {
      addToast(
        'error',
        'none',
        `${t('noumena.toast_error.text')}: ${networkError}`,
      );
    },
    [addToast],
  );

  const handleSuccess = useCallback(() => {
    addToast(
      'success',
      'icon',
      `${t('noumena.chamber_create.success_message')}`,
    );
  }, [addToast]);

  const [createProject, { loading }] = useCreateProjectChamberMutation();

  const createProjectChamberHelper = useCallback(
    async (input: ProjectChamberInput) => {
      const project: CreateProjectChamberResponse = { id: undefined };

      await createProject({
        variables: { input },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          handleError(err?.message ?? networkError);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'createProjectChamberMutation',
            },
          });
        },
        onCompleted: ({ createProjectChamber: newProject }) => {
          handleSuccess();
          project.id = newProject?._id || undefined;
        },
        update: (cache, { data }) => {
          if (!data || !data.createProjectChamber) return;
          const readResult = cache.readQuery({
            query: GetOwnProjectChambersDocument,
            variables: {
              offset: 0,
              limit: PAGE_SIZE,
              filter: {
                categoryNotIn: ['6267afe198962732993afaf5'],
              },
            },
          }) as GetOwnProjectChambersQuery;
          if (!readResult?.getOwnProjectChambers?.data) return;
          const cloneChambers = [...readResult.getOwnProjectChambers.data];
          const mergedArray = [data.createProjectChamber, ...cloneChambers];
          cache.writeQuery({
            query: GetOwnProjectChambersDocument,
            variables: {
              offset: 0,
              limit: PAGE_SIZE,
              filter: {
                categoryNotIn: ['6267afe198962732993afaf5'],
              },
            },
            data: {
              getOwnProjectChambers: { data: mergedArray },
            },
          });
        },
      });

      return project;
    },
    [handleError, handleSuccess, createProject],
  );

  return { loading, createProjectChamberHelper };
}

export default useCreateProjectChamberHelper;
