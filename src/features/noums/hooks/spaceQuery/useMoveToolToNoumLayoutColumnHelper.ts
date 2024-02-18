import { useCallback } from 'react';
import { type MoveToolToNoumLayoutColumnInput } from '@/apollo/generated/types';
import {
  GetSpaceByIdDocument,
  useMoveToolToNoumLayoutColumnMutation,
} from '@/apollo/graphql';
import {
  getSrcDestSections,
  repositionTools,
} from '@/screens/Chamber/components/SectionElementRearrange/rearrangeHelper';
import { type DraggableLocation } from 'react-beautiful-dnd';
import { ElementUtils } from '@/utils/element';
import { useError } from '@/hooks';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useMoveToolToNoumLayoutColumnHelper() {
  const [moveToolToNoumLayoutColumn, { loading }] =
    useMoveToolToNoumLayoutColumnMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();
  const { logError } = useError();

  const moveToolToNoumLayoutColumnHelper = useCallback(
    async (
      input: MoveToolToNoumLayoutColumnInput,
      spaceId: string,
      source: DraggableLocation,
      dest: DraggableLocation,
    ) => {
      let result;
      try {
        await moveToolToNoumLayoutColumn({
          variables: { input },
          update: (cache, { data }) => {
            if (!data || !data.moveToolToNoumLayoutColumn) return;

            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              spaceId,
              cache,
            );
            if (!cloneSpaceData?.layout) return;

            const {
              destColumn,
              destSection,
              sourceColumn,
              destColumnIndex,
              destSectionIndex,
            } = getSrcDestSections(
              cloneSpaceData?.layout.sections,
              source.droppableId,
              dest.droppableId,
            );

            if (!destColumn || !destSection || !sourceColumn) return;

            if (source.droppableId === dest.droppableId) {
              destColumn?.tools.sort(ElementUtils.sortPublished);
              const tempPosition = destColumn.tools[source.index].position;
              destColumn.tools[source.index].position =
                destColumn.tools[dest.index].position;
              destColumn.tools[dest.index].position = tempPosition;
            } else {
              const elementIndex = sourceColumn.tools.findIndex(
                (element) => element._id === input.toolId,
              );
              const [tool] = sourceColumn.tools.splice(elementIndex, 1);
              destColumn?.tools.splice(dest.index, 0, {
                ...tool,
                position: input.position,
              });
              destColumn.tools = repositionTools(
                destColumn.tools,
                input.position,
                tool._id!,
              );
            }
            destColumn?.tools.sort(ElementUtils.sortPublished);
            destSection.columns[destColumnIndex] = destColumn;
            cloneSpaceData.layout.sections[destSectionIndex] = destSection;
            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: cloneSpaceData,
              },
            });
            result = data.moveToolToNoumLayoutColumn;
          },
        });
      } catch (error) {
        logError(error, 'moveToolToNoumLayoutColumnMutation');
      }
      return result;
    },
    [getSpaceCloneHelper, logError, moveToolToNoumLayoutColumn],
  );

  return {
    loading,
    moveToolToNoumLayoutColumnHelper,
  };
}

export default useMoveToolToNoumLayoutColumnHelper;
