import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import {
  GetSpaceByIdDocument,
  useSetNoumLayoutToolMetaValueMutation,
} from '@/apollo/graphql';
import { type SetNoumLayoutToolMetaValueInput } from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';
import { type Maybe } from '@/common/types';
import { getToolElement } from '@/screens/Chamber/components/SectionElementRearrange/rearrangeHelper';
import { useUpdateCacheSpaceHelper } from './useUpdateCacheSpaceHelper';

export function useSetNoumLayoutToolMetaValueHelper() {
  const { addToast } = useToast();
  const [setNoumLayoutToolMetaValue, { loading }] =
    useSetNoumLayoutToolMetaValueMutation();
  const { getSpaceCloneHelper } = useUpdateCacheSpaceHelper();

  const setNoumLayoutToolMetaValueHelper = useCallback(
    async (input: SetNoumLayoutToolMetaValueInput, spaceId?: Maybe<string>) => {
      let result;
      try {
        await setNoumLayoutToolMetaValue({
          variables: { input },
          update: (cache, { data }) => {
            if (!data || !data.setNoumLayoutToolMetaValue._id || !spaceId)
              return;
            const { cloneSpaceData, variables } = getSpaceCloneHelper(
              spaceId,
              cache,
            );
            if (!cloneSpaceData?.layout) return;

            const { sectionIndex, columnIndex, elementIndex, element } =
              getToolElement(
                data.setNoumLayoutToolMetaValue._id,
                cloneSpaceData.layout.sections,
              );
            cloneSpaceData.layout.sections[sectionIndex].columns[
              columnIndex
            ].tools[elementIndex] = {
              ...element,
              ...data.setNoumLayoutToolMetaValue,
            };

            cache.writeQuery({
              query: GetSpaceByIdDocument,
              variables,
              data: {
                getSpaceById: cloneSpaceData,
              },
            });
            result = data.setNoumLayoutToolMetaValue;
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
            section: 'updateNoumLayoutSectionMutation',
          },
        });
      }

      return result;
    },
    [addToast, getSpaceCloneHelper, setNoumLayoutToolMetaValue],
  );
  return {
    loading,
    setNoumLayoutToolMetaValueHelper,
  };
}
