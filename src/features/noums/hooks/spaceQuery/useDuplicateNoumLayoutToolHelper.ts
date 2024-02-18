import { useCallback } from 'react';
import {
  GetSpaceByIdDocument,
  useDuplicateNoumLayoutToolMutation,
} from '@/apollo/graphql';
import { type SectionToolProps } from '@/screens/Chamber/components/SectionElementRearrange/types';
import { type ElementOutput } from '@/apollo/generated/types';
import {
  getColumn,
  getColumnId,
  getSection,
  repositionTools,
} from '@/screens/Chamber/components/SectionElementRearrange/rearrangeHelper';
import { useError } from '@/hooks';
import { type NoumLayoutToolMetaValues } from '@/screens/Chamber/components/ElementWrapper/types';
import { ElementUtils } from '@/utils/element';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';
import { SectionToolType } from '../../noumEditor/shared/constants';

export function useDuplicateNoumLayoutToolHelper(
  setNoumSidePanelId?: (toolId: string | undefined) => void,
  setNoumSectionToolType?: (value: SectionToolProps) => void,
  setActiveEditingTool?: (value: ElementOutput) => void,
  setToolMetaValue?: (metaValue: NoumLayoutToolMetaValues) => void,
) {
  const [duplicateTool, { loading }] = useDuplicateNoumLayoutToolMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();
  const { logError } = useError();

  const duplicateNoumLayoutTool = useCallback(
    async (toolId: string, spaceId: string) => {
      let newId;
      try {
        await duplicateTool({
          variables: { toolId },
          onCompleted: (res) => {
            newId = res?.duplicateNoumLayoutTool?._id || undefined;
            setNoumSidePanelId?.(newId);
            setNoumSectionToolType?.(SectionToolType.TOOL_TYPE);
            setActiveEditingTool?.(res.duplicateNoumLayoutTool);
            setToolMetaValue?.(res.duplicateNoumLayoutTool.unSaved?.meta);
          },
          update: (cache, { data }) => {
            if (!data || !data.duplicateNoumLayoutTool) return;
            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              spaceId,
              cache,
            );
            if (!cloneSpaceData?.layout) return;

            const columnId = getColumnId(
              toolId,
              cloneSpaceData?.layout?.sections || [],
            );
            if (!columnId) return;

            const {
              section: updatedSection,
              sectionIndex: updatedSectionIndex,
            } = getSection(columnId, cloneSpaceData?.layout?.sections || []);
            const { column: updatedColumn, columnIndex } = getColumn(
              columnId,
              updatedSection?.columns || [],
            );

            if (
              !updatedSection ||
              !updatedColumn ||
              !data.duplicateNoumLayoutTool.position ||
              !data.duplicateNoumLayoutTool._id
            )
              return;

            updatedColumn.tools = repositionTools(
              updatedColumn.tools,
              ElementUtils.getPosition(data.duplicateNoumLayoutTool),
              data.duplicateNoumLayoutTool._id,
            );

            updatedColumn.tools.splice(
              data.duplicateNoumLayoutTool.position - 1,
              0,
              data.duplicateNoumLayoutTool,
            );

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
          },
        });
      } catch (error) {
        logError(error, 'duplicateToolMutation');
      }

      return newId;
    },
    [
      duplicateTool,
      getSpaceCloneHelper,
      logError,
      setActiveEditingTool,
      setNoumSectionToolType,
      setNoumSidePanelId,
      setToolMetaValue,
    ],
  );

  return {
    loading,
    duplicateNoumLayoutTool,
  };
}

export default useDuplicateNoumLayoutToolHelper;
