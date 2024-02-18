import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import {
  GetSpaceByIdDocument,
  useRemoveSectionFromNoumLayoutMutation,
} from '@/apollo/graphql';
import { useToast } from '@/hooks/toast';
import { remove as _remove } from 'lodash';
import { type NoumLayoutSection } from '@/apollo/generated/types';
import { repositionSections } from '@/screens/Chamber/components/SectionElementRearrange/rearrangeHelper';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useRemoveSectionHelper() {
  const { addToast } = useToast();
  const [removeSection, { loading }] = useRemoveSectionFromNoumLayoutMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const removeSectionHelper = useCallback(
    async (section: NoumLayoutSection, spaceId: string) => {
      try {
        await removeSection({
          variables: { ID: section._id },
          update: (cache, { data }) => {
            if (!data || !data.removeSectionFromNoumLayout) return;

            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              spaceId,
              cache,
            );
            if (!cloneSpaceData?.layout) return;

            cloneSpaceData.layout.sections = _remove(
              cloneSpaceData?.layout.sections,
              (el) => el?._id !== section._id,
            );

            cloneSpaceData.layout.sections = repositionSections(
              cloneSpaceData.layout.sections,
              section.position,
              false,
            );

            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: cloneSpaceData,
              },
            });
          },
        });

        addToast(
          'success',
          'none',
          t(`noumena.container.section_delete.success`),
        );
        return true;
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        addToast('error', 'none', message);
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'removeSectionMutation',
          },
        });
        return false;
      }
    },
    [addToast, getSpaceCloneHelper, removeSection],
  );

  return {
    loading,
    removeSectionHelper,
  };
}

export default useRemoveSectionHelper;
