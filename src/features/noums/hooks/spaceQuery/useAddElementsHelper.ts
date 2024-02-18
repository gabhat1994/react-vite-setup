import * as Sentry from '@sentry/react';
import {
  GetSpaceByIdDocument,
  type GetSpaceByIdQuery,
  useAddElementsMutation,
  type GetSpaceByIdQueryVariables,
} from '@/apollo/graphql';
import {
  NoumLayoutStatusFilter,
  type CreateElementInput,
} from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';
import { useCallback } from 'react';

export function useAddElementsHelper() {
  const { addToast } = useToast();

  const [addElements, { loading }] = useAddElementsMutation();

  const addElementsHelper = useCallback(
    async (
      spaceId: string,
      input: CreateElementInput | CreateElementInput[],
    ) => {
      try {
        return await addElements({
          variables: { spaceId, input, isCalledFromNoumEditor2: true },
          update: (cache, { data }) => {
            if (!data || !data.addElements) return;

            const variables: GetSpaceByIdQueryVariables = {
              noumId: spaceId,
              status: NoumLayoutStatusFilter.Unpublished,
              editorV2Enabled: false,
            };

            const cacheResult = cache.readQuery<GetSpaceByIdQuery>({
              query: GetSpaceByIdDocument,
              variables,
            });

            if (!cacheResult) return;

            const { getSpaceById: spaceData } = cacheResult;

            if (!spaceData) return;

            const cloneSpaceData = { ...spaceData }; // spaceData is the read only object

            if (cloneSpaceData.elements) {
              cloneSpaceData.elements = [
                ...(cloneSpaceData.elements ?? []),
                ...(data.addElements ?? []),
              ];
            } else {
              cloneSpaceData.elements = data.addElements;
            }

            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: cloneSpaceData,
              },
            });
          },
        });
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        addToast('error', 'none', message);
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'addElementMutation',
          },
        });
      }

      return undefined;
    },
    [addElements, addToast],
  );
  return {
    loading,
    addElementsHelper,
  };
}

export default useAddElementsHelper;
