import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import {
  GetSpaceByIdDocument,
  useCreateNoumLayoutSectionMutation,
} from '@/apollo/graphql';
import { type CreateNoumLayoutSectionInput } from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';
import { repositionSections } from '@/screens/Chamber/components/SectionElementRearrange/rearrangeHelper';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useAddSectionsHelper() {
  const { addToast } = useToast();
  const [addSections, { loading }] = useCreateNoumLayoutSectionMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const addSectionsHelper = useCallback(
    async (input: CreateNoumLayoutSectionInput, spaceId: string) => {
      let result;
      try {
        await addSections({
          variables: { input },
          update: (cache, { data }) => {
            if (!data || !data.createNoumLayoutSection) return;

            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              spaceId,
              cache,
            );

            if (!cloneSpaceData?.layout) return;

            cloneSpaceData.layout.sections = repositionSections(
              cloneSpaceData.layout.sections,
              data.createNoumLayoutSection.position,
            );

            cloneSpaceData.layout.sections.splice(
              data.createNoumLayoutSection.position - 1,
              0,
              data.createNoumLayoutSection,
            );
            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: cloneSpaceData,
              },
            });
            result = data.createNoumLayoutSection;
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

      return result;
    },
    [addSections, addToast, getSpaceCloneHelper],
  );

  return {
    loading,
    addSectionsHelper,
  };
}
