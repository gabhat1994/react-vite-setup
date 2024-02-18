import { useCallback, useMemo } from 'react';
import {
  useAllUsersWithoutEventQuery,
  useGlobalSearchQuery,
} from '@/apollo/graphql';
import {
  EntityType,
  GlobalSearchUserEntityStatus,
  UserStatus,
} from '@/apollo/generated/types';
import { cleanList } from '@/utils/list';

const PAGE_SIZE = 15;

function useInviteUsersList(search: string) {
  const { data: allUserData, loading: loadingAll } =
    useAllUsersWithoutEventQuery({
      variables: {
        search,
        limit: 1,
        filter: {
          excludeUsersByStatus: [UserStatus.Unregistered],
        },
      },
    });

  const {
    data: searchedUsers,
    fetchMore: searchMoreUsers,
    loading: searchingUsers,
  } = useGlobalSearchQuery({
    variables: {
      query: search,
      limit: PAGE_SIZE,
      entityType: EntityType.HomeNoum,
    },
    fetchPolicy: 'cache-and-network',
  });

  const fetchMore = useCallback(
    (length) =>
      searchMoreUsers({
        variables: {
          query: search,
          limit: PAGE_SIZE,
          offset: length || 0,
          entityType: EntityType.HomeNoum,
        },
      }),
    [searchMoreUsers, search],
  );

  const users = useMemo(
    () =>
      cleanList(searchedUsers?.globalSearch.data).filter(
        (user) =>
          user.entityType === EntityType.HomeNoum &&
          user.user.status === GlobalSearchUserEntityStatus.NoumenaMember,
      ),
    [searchedUsers],
  );

  return {
    allCount: allUserData?.allUsers.count || 0,
    users,
    fetchMore,
    loading: loadingAll || searchingUsers,
  };
}
export default useInviteUsersList;
