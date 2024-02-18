import { useCallback } from 'react';
import {
  GetSpaceByIdDocument,
  useRearrangeSectionInNoumLayoutMutation,
} from '@/apollo/graphql';
import { remove as _remove } from 'lodash';
import { type RearrangeSectionInNoumLayoutInput } from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';
import { ElementUtils } from '@/utils/element';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useSectionPositionHelper() {
  const { addToast } = useToast();
  const [updateSectionPosition, { loading }] =
    useRearrangeSectionInNoumLayoutMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const updateSectionPositionHelper = useCallback(
    async (
      input: RearrangeSectionInNoumLayoutInput,
      spaceId: string,
      sourceElementIndex: number,
      destElementIndex: number,
    ) => {
      let result;
      try {
        await updateSectionPosition({
          variables: { input },
          update: (cache, { data }) => {
            if (!data || !data.rearrangeSectionInNoumLayout) return;

            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              spaceId,
              cache,
            );
            if (!cloneSpaceData?.layout) return;

            cloneSpaceData.layout.sections = _remove(
              cloneSpaceData?.layout.sections,
              (el) => el.visible,
            );
            cloneSpaceData?.layout?.sections.sort(
              ElementUtils.sortSectionUnPublished,
            );
            const sectionSourcePosition =
              cloneSpaceData.layout.sections[sourceElementIndex].position;
            cloneSpaceData.layout.sections[sourceElementIndex].position =
              cloneSpaceData.layout.sections[destElementIndex].position;
            cloneSpaceData.layout.sections[destElementIndex].position =
              sectionSourcePosition;

            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: cloneSpaceData,
              },
            });
            result = data.rearrangeSectionInNoumLayout;
          },
        });
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        addToast('error', 'none', message);
      }

      return result;
    },
    [addToast, getSpaceCloneHelper, updateSectionPosition],
  );

  return {
    loading,
    updateSectionPositionHelper,
  };
}

export default useSectionPositionHelper;
