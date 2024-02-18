import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import {
  GetSpaceByIdDocument,
  useAddNoumLayoutToolMutation,
} from '@/apollo/graphql';
import {
  type AddNoumLayoutToolInput,
  type ElementOutput,
} from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';
import {
  getColumn,
  getSection,
} from '@/screens/Chamber/components/SectionElementRearrange/rearrangeHelper';
import { ElementUtils } from '@/utils/element';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useAddNoumLayoutToolHelper() {
  const { addToast } = useToast();
  const [addNoumLayoutTool, { loading }] = useAddNoumLayoutToolMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();
  const addNoumLayoutToolHelper = useCallback(
    async (
      spaceId: string,
      input: AddNoumLayoutToolInput,
      baseElementId?: string,
      newPosition?: number,
    ): Promise<ElementOutput | undefined> => {
      let newElement;
      try {
        await addNoumLayoutTool({
          variables: { input },
          update: (cache, { data }) => {
            if (!data || !data.addNoumLayoutTool) return;

            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              spaceId,
              cache,
            );
            if (!cloneSpaceData?.layout) return;
            const {
              section: updatedSection,
              sectionIndex: updatedSectionIndex,
            } = getSection(
              input.columnId,
              cloneSpaceData?.layout?.sections || [],
            );
            const { column: updatedColumn, columnIndex } = getColumn(
              input.columnId,
              updatedSection?.columns || [],
            );
            if (!updatedSection || !updatedColumn) return;
            if (baseElementId) {
              const elementIndex = updatedColumn.tools.findIndex(
                (element) => element._id === baseElementId,
              );
              const baseElement = updatedColumn.tools[elementIndex];
              const baseElementPosition = ElementUtils.getPosition(
                baseElement,
                true,
              );
              if (
                baseElementPosition &&
                newPosition &&
                baseElementPosition < newPosition
              )
                updatedColumn.tools.splice(elementIndex + 1, 0, {
                  ...data.addNoumLayoutTool,
                  position: newPosition,
                });
              else {
                updatedColumn.tools.splice(elementIndex, 0, {
                  ...data.addNoumLayoutTool,
                  position: newPosition,
                });
              }
            } else updatedColumn.tools.push(data.addNoumLayoutTool);
            updatedSection.columns[columnIndex] = updatedColumn;
            cloneSpaceData.layout.sections[updatedSectionIndex] =
              updatedSection;

            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: cloneSpaceData,
              },
            });

            newElement = data.addNoumLayoutTool;
          },
        });
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        addToast('error', 'none', message, false);
        Sentry.captureException(new Error(message), {
          tags: {
            section: 'addElementMutation',
          },
        });
      }

      return newElement;
    },
    [addNoumLayoutTool, addToast, getSpaceCloneHelper],
  );

  return {
    loading,
    addNoumLayoutToolHelper,
  };
}

export default useAddNoumLayoutToolHelper;
