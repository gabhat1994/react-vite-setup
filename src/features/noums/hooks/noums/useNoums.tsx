import { useCallback, useMemo } from 'react';
import {
  NoumLinkSorting,
  SortOperator,
  SpaceStatusEnum,
  type SpaceTypeEnum,
} from '@/apollo/generated/types';
import {
  useGetConnectedSpacesQuery,
  useGetFollowingSpacesQuery,
  useGetOwnProjectChambersQuery,
  useGetNoumLinksQuery,
  useGetConnectedNoumsQuery,
} from '@/apollo/graphql';
import { type DropdownValueType } from '@/components/Dropdown/types';
import { NoumScopeEnum } from '@/screens/Chambers/types';
import {
  sortValues,
  linkSortValues,
  LinkedFilterOptions,
} from '@/screens/Chamber/components/modals/ChambersFilter/constants';
import { memberCategory, PAGE_SIZE } from '@/screens/Chambers/constants';
import { type Maybe } from '@/common/types';
import { cleanList } from '@/utils/list';
import { useLaunchDarkly } from '@/hooks';

export function useNoums(
  scope: string,
  userId: string,
  sortInfo: DropdownValueType<string>,
  selectedCateId: string = '-1',
  selectedLinkSort: DropdownValueType<string> = LinkedFilterOptions()[0],
  selectedNoumType: Maybe<SpaceTypeEnum> = undefined,
) {
  const {
    flags: { elementPermission },
  } = useLaunchDarkly();
  const sortValue = useMemo(
    () => sortValues.filter((item) => item.key === sortInfo.key)[0],
    [sortInfo.key],
  );

  const linkSortValue = useMemo(() => {
    const value = linkSortValues.filter(
      (item) => item.key === selectedLinkSort.key,
    )[0];
    const searchWhere =
      value?.column === 'Newest'
        ? NoumLinkSorting.Newest
        : NoumLinkSorting.Oldest;
    return searchWhere;
  }, [selectedLinkSort.key]);

  const {
    data: ownedProjectData,
    loading: loadingOwned,
    error: errorOwned,
    fetchMore: fetchMoreOwned,
  } = useGetOwnProjectChambersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: PAGE_SIZE,
      offset: 0,
      filter: {
        categoryIn: selectedCateId !== '-1' ? [selectedCateId] : undefined,
        categoryNotIn: [memberCategory],
        statusNotIn: [SpaceStatusEnum.Archived],
      },
      sort: {
        column: sortValue?.column || 'createdAt',
        operator: sortValue?.operator || SortOperator.Asc,
      },
    },
    skip: scope !== NoumScopeEnum.Owned,
  });

  const {
    data: archivedProjectData,
    loading: loadingArchived,
    error: errorArchived,
    fetchMore: fetchMoreArchived,
  } = useGetOwnProjectChambersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: PAGE_SIZE,
      offset: 0,
      filter: {
        categoryIn: selectedCateId !== '-1' ? [selectedCateId] : undefined,
        categoryNotIn: [memberCategory],
        status: SpaceStatusEnum.Archived,
      },
      sort: {
        column: sortValue?.column || 'lastUpdatedAt',
        operator: sortValue?.operator || SortOperator.Asc,
      },
    },
    skip: scope !== NoumScopeEnum.Archived,
  });

  const {
    data: followingProjectData,
    loading: loadingFollowing,
    error: errorFollowing,
    fetchMore: fetchMoreFollowing,
  } = useGetFollowingSpacesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      userId,
      limit: PAGE_SIZE,
      offset: 0,
      sort: {
        column: sortValue?.column || 'lastUpdatedAt',
        operator: sortValue?.operator || SortOperator.Asc,
      },
      filter: {
        categoryIn: selectedCateId !== '-1' ? [selectedCateId] : undefined,
        type: selectedNoumType,
        statusNotIn: [SpaceStatusEnum.Draft],
      },
    },
    skip: scope !== NoumScopeEnum.Following,
  });

  const {
    data: connectedProjectData,
    loading: loadingConnected,
    error: errorConnected,
    fetchMore: fetchMoreConnectedSpaces,
    refetch: refetchConnectedSpaces,
  } = useGetConnectedSpacesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      uid: userId,
      limit: PAGE_SIZE,
      offset: 0,
      sort: {
        column: sortValue?.column || 'approvedAt',
        operator: sortValue?.operator || SortOperator.Asc,
      },
      filter: {
        categoryIn: selectedCateId !== '-1' ? [selectedCateId] : undefined,
        type: selectedNoumType,
        statusNotIn: [SpaceStatusEnum.Draft],
      },
    },
    skip: elementPermission || scope !== NoumScopeEnum.Connected,
  });

  const {
    data: connectedNoumsData,
    loading: loadingConnectedNoums,
    error: errorConnectedNoums,
    fetchMore: fetchMoreConnectedNoums,
    refetch: refetchConnectedNoums,
  } = useGetConnectedNoumsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: PAGE_SIZE,
      offset: 0,
      sort: {
        column: sortValue?.column || 'approvedAt',
        operator: sortValue?.operator || SortOperator.Asc,
      },
      filter: {
        categoryIn: selectedCateId !== '-1' ? [selectedCateId] : undefined,
        type: selectedNoumType,
        statusNotIn: [SpaceStatusEnum.Draft],
      },
    },
    skip: !elementPermission || scope !== NoumScopeEnum.Connected,
  });

  const fetchMoreConnected = elementPermission
    ? fetchMoreConnectedNoums
    : fetchMoreConnectedSpaces;

  const {
    data: linkedNoumsData,
    loading: linkedNoumsLoading,
    error: errorLinkedNoums,
    fetchMore: fetchMoreLinkedNoums,
    refetch: refetchLinkedNoums,
  } = useGetNoumLinksQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: PAGE_SIZE,
      offset: 0,
      sorting: linkSortValue,
    },
    skip: scope !== NoumScopeEnum.Linked,
  });

  const linkedNoums = useMemo(
    () => cleanList(linkedNoumsData?.getNoumLinks?.data ?? []),
    [linkedNoumsData?.getNoumLinks?.data],
  );

  const currentNoums = useMemo(() => {
    switch (scope) {
      case NoumScopeEnum.Connected:
        return elementPermission
          ? {
              data: cleanList(connectedNoumsData?.connectedNoums.data),
              count: connectedNoumsData?.connectedNoums?.count ?? 0,
            }
          : {
              data: cleanList(connectedProjectData?.getConnectedSpaces?.data),
              count: connectedProjectData?.getConnectedSpaces?.count ?? 0,
            };
      case NoumScopeEnum.Following:
        return {
          data: cleanList(
            followingProjectData?.getFollowingSpaces?.data?.filter(
              (space) => space?.isFollowing,
            ),
          ),
          count: followingProjectData?.getFollowingSpaces?.count ?? 0,
        };
      case NoumScopeEnum.Owned:
        return {
          data: cleanList(ownedProjectData?.getOwnProjectChambers?.data),
          count: ownedProjectData?.getOwnProjectChambers?.count ?? 0,
        };
      case NoumScopeEnum.Archived:
        return {
          data: cleanList(archivedProjectData?.getOwnProjectChambers?.data),
          count: archivedProjectData?.getOwnProjectChambers?.count ?? 0,
        };
      default:
        return {
          data: [],
          count: 0,
        };
    }
  }, [
    scope,
    elementPermission,
    connectedNoumsData?.connectedNoums.data,
    connectedNoumsData?.connectedNoums?.count,
    connectedProjectData?.getConnectedSpaces?.data,
    connectedProjectData?.getConnectedSpaces?.count,
    followingProjectData?.getFollowingSpaces?.data,
    followingProjectData?.getFollowingSpaces?.count,
    ownedProjectData?.getOwnProjectChambers?.data,
    ownedProjectData?.getOwnProjectChambers?.count,
    archivedProjectData?.getOwnProjectChambers?.data,
    archivedProjectData?.getOwnProjectChambers?.count,
  ]);

  const loading =
    loadingOwned ||
    loadingConnected ||
    loadingConnectedNoums ||
    loadingArchived ||
    loadingFollowing ||
    linkedNoumsLoading;

  const error =
    errorConnected ||
    errorConnectedNoums ||
    errorFollowing ||
    errorArchived ||
    errorOwned ||
    errorLinkedNoums;

  const currentLoading = useMemo(() => {
    switch (scope) {
      case NoumScopeEnum.Connected:
        return elementPermission ? loadingConnectedNoums : loadingConnected;
      case NoumScopeEnum.Following:
        return loadingFollowing;
      case NoumScopeEnum.Owned:
        return loadingOwned;
      case NoumScopeEnum.Archived:
        return loadingArchived;
      case NoumScopeEnum.Linked:
        return linkedNoumsLoading;
      default:
        return false;
    }
  }, [
    scope,
    elementPermission,
    loadingConnectedNoums,
    loadingConnected,
    loadingFollowing,
    loadingOwned,
    loadingArchived,
    linkedNoumsLoading,
  ]);

  const infiniteState: 'loading' | 'hasNextPage' | 'end' | 'end-with-force' =
    useMemo(() => {
      if (scope === NoumScopeEnum.Linked) {
        if (
          (linkedNoumsData?.getNoumLinks?.data ?? []).length >=
          (linkedNoumsData?.getNoumLinks?.count ?? 0)
        ) {
          return 'end';
        }
        return 'hasNextPage';
      }
      if (currentNoums.data.length >= currentNoums.count) {
        return 'end';
      }
      return 'hasNextPage';
    }, [
      currentNoums.count,
      currentNoums.data.length,
      linkedNoumsData?.getNoumLinks?.count,
      linkedNoumsData?.getNoumLinks?.data,
      scope,
    ]);

  const fetchMore = useCallback(async () => {
    if (!userId || !scope || !currentNoums) return;
    switch (scope) {
      case NoumScopeEnum.Archived:
        await fetchMoreArchived({
          variables: {
            limit: PAGE_SIZE,
            offset: currentNoums.data.length || 0,
          },
        });
        break;
      case NoumScopeEnum.Owned:
        await fetchMoreOwned({
          variables: {
            limit: PAGE_SIZE,
            offset: currentNoums.data.length || 0,
          },
        });
        break;
      case NoumScopeEnum.Connected:
        await fetchMoreConnected({
          variables: {
            limit: PAGE_SIZE,
            offset: currentNoums.data.length || 0,
          },
        });
        break;
      case NoumScopeEnum.Following:
        await fetchMoreFollowing({
          variables: {
            limit: PAGE_SIZE,
            offset: currentNoums.data.length || 0,
          },
        });
        break;
      case NoumScopeEnum.Linked:
        await fetchMoreLinkedNoums({
          variables: {
            limit: PAGE_SIZE,
            offset: currentNoums.data.length || 0,
          },
        });
        break;
    }
  }, [
    userId,
    scope,
    currentNoums,
    fetchMoreArchived,
    fetchMoreOwned,
    fetchMoreConnected,
    fetchMoreFollowing,
    fetchMoreLinkedNoums,
  ]);

  const refetchNoumLinks = useCallback(async () => {
    if (!userId || !scope || !currentNoums) return;
    switch (scope) {
      case NoumScopeEnum.Linked:
        refetchLinkedNoums();
    }
  }, [userId, currentNoums, scope, refetchLinkedNoums]);

  return {
    noums: currentNoums.data,
    linkedNoums,
    fetchMore,
    loading,
    infiniteState,
    error,
    onRefetchConnectedSpaces: elementPermission
      ? refetchConnectedNoums
      : refetchConnectedSpaces,
    refetchLinkedNoums: refetchNoumLinks,
    currentLoading,
  };
}
export default useNoums;
