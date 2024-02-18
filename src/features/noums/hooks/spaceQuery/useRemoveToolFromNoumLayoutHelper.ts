import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import {
  GetSpaceByIdDocument,
  useRemoveToolFromNoumLayoutMutation,
} from '@/apollo/graphql';
import { useToast } from '@/hooks/toast';
import { remove as _remove } from 'lodash';
import {
  getColumn,
  getColumnId,
  getSection,
} from '@/screens/Chamber/components/SectionElementRearrange/rearrangeHelper';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useRemoveToolFromNoumLayoutHelper() {
  const { addToast } = useToast();
  const [removeToolFromNoumLayout, { loading }] =
    useRemoveToolFromNoumLayoutMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const removeToolFromNoumLayoutHelper = useCallback(
    async (toolId: string, spaceId: string) => {
      try {
        await removeToolFromNoumLayout({
          variables: { id: toolId },
          update: (cache, { data }) => {
            if (!data || !data.removeToolFromNoumLayout) return;
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
            if (!updatedSection || !updatedColumn) return;

            updatedColumn.tools = _remove(
              updatedColumn.tools,
              (el) => el?._id !== toolId,
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

        addToast('success', 'none', t(`noumena.container.tool_delete.success`));
        return true;
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }

        Sentry.captureException(new Error(message), {
          tags: {
            section: 'removeToolFromNoumLayoutMutation',
          },
        });
      }

      return false;
    },
    [addToast, getSpaceCloneHelper, removeToolFromNoumLayout],
  );

  return {
    loading,
    removeToolFromNoumLayoutHelper,
  };
}

export default useRemoveToolFromNoumLayoutHelper;
