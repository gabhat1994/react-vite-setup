import {
  GetSpaceByIdDocument,
  GetSpaceForViewDocument,
  type GetSpaceByIdQuery,
  type GetSpaceByIdQueryVariables,
  type GetSpaceForViewQuery,
} from '@/apollo/graphql';
import { cloneDeep } from 'lodash';
import {
  NoumLayoutStatus,
  NoumLayoutStatusFilter,
} from '@/apollo/generated/types';
import { type ApolloCache, type DataProxy } from '@apollo/client';
import { useCallback } from 'react';
import { useAuth } from '@/features/auth/contexts';

export function useUpdateCacheSpaceHelper() {
  const { masterId } = useAuth();
  const getSpaceCloneHelper = useCallback(
    (
      spaceId: string,
      cache: ApolloCache<DataProxy>,
      layoutStatus = NoumLayoutStatusFilter.Unpublished,
    ) => {
      const variables: GetSpaceByIdQueryVariables = {
        noumId: spaceId,
        editorV2Enabled: true,
        status: layoutStatus,
        userHomeNoumId: masterId === spaceId ? '' : masterId,
      };

      const cacheResult =
        layoutStatus === NoumLayoutStatusFilter.Unpublished
          ? cache.readQuery<GetSpaceByIdQuery>({
              query: GetSpaceByIdDocument,
              variables,
            })
          : cache.readQuery<GetSpaceForViewQuery>({
              query: GetSpaceForViewDocument,
              variables,
            });

      if (!cacheResult) return {};

      const { getSpaceById: spaceData } = cacheResult;

      if (!spaceData) return {};

      const cloneSpaceData = cloneDeep(spaceData);
      if (
        cloneSpaceData?.layout &&
        layoutStatus === NoumLayoutStatusFilter.Unpublished
      ) {
        cloneSpaceData.layout.status = NoumLayoutStatus.Unsaved;
        cloneSpaceData.layout.hasUndoAction = true;
      }
      return { cloneSpaceData, variables };
    },
    [masterId],
  );

  return {
    getSpaceCloneHelper,
  };
}
