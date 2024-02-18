import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import {
  GetSpaceByIdDocument,
  useDuplicateNoumLayoutSectionMutation,
} from '@/apollo/graphql';
import { type SectionToolProps } from '@/screens/Chamber/components/SectionElementRearrange/types';
import { useToast } from '@/hooks/toast';
import { repositionSections } from '@/screens/Chamber/components/SectionElementRearrange/rearrangeHelper';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';
import { SectionToolType } from '../../noumEditor/shared/constants';

export function useDuplicateNoumLayoutSectionHelper(
  setNoumSidePanelId?: (sectionId: string) => void,
  setNoumSectionToolType?: (value: SectionToolProps) => void,
) {
  const { addToast } = useToast();
  const [duplicateSections, { loading }] =
    useDuplicateNoumLayoutSectionMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const duplicateNoumLayoutSection = useCallback(
    async (sectionId: string, spaceId: string) => {
      let newId;
      try {
        await duplicateSections({
          variables: { sectionId },
          onCompleted: (res) => {
            newId = res.duplicateNoumLayoutSection._id;
            setNoumSidePanelId?.(newId);
            setNoumSectionToolType?.(SectionToolType.SECTION_TYPE);
          },
          update: (cache, { data }) => {
            if (!data || !data.duplicateNoumLayoutSection) return;

            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              spaceId,
              cache,
            );
            if (!cloneSpaceData?.layout) return;

            cloneSpaceData.layout.sections = repositionSections(
              cloneSpaceData.layout.sections,
              data.duplicateNoumLayoutSection.position,
            );

            cloneSpaceData.layout.sections.splice(
              data.duplicateNoumLayoutSection.position - 1,
              0,
              data.duplicateNoumLayoutSection,
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
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        addToast('error', 'none', message);
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'duplicateSectionMutation',
          },
        });
      }

      return newId;
    },
    [
      addToast,
      duplicateSections,
      getSpaceCloneHelper,
      setNoumSectionToolType,
      setNoumSidePanelId,
    ],
  );

  return {
    loading,
    duplicateNoumLayoutSection,
  };
}
