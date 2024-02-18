import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import {
  useMarkSearchEntityAsClickedMutation,
  useRecentSearchesLazyQuery,
} from '@/apollo/graphql';
import { type GlobalSearchEntity } from '@/apollo/generated/types';

type RecentSearchArg = {
  isFocused?: boolean;
  search?: string;
  isMobile?: boolean;
  isSearchCleared?: boolean;
  setIsSearchCleared?: Dispatch<SetStateAction<boolean>>;
};

export const useRecentSearch = ({
  isFocused,
  search,
  isMobile,
  isSearchCleared,
  setIsSearchCleared,
}: RecentSearchArg) => {
  const [recentList, setRecentList] = useState<GlobalSearchEntity[]>([]);
  const [
    getRecentSearchs,
    { data: recentSearch, loading: recentSearchLoading },
  ] = useRecentSearchesLazyQuery({
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      setRecentList(recentSearch?.recentSearches.clickedEntities.data ?? []);
    },
    fetchPolicy: 'cache-and-network',
  });

  const [markSeachEntityAsClickedMutation] =
    useMarkSearchEntityAsClickedMutation();

  useEffect(() => {
    if (!isFocused && !isMobile) {
      setRecentList([]);
      setIsSearchCleared?.(false);
    } else if ((!search && !isSearchCleared) || isMobile) {
      getRecentSearchs();
    }
  }, [
    isSearchCleared,
    getRecentSearchs,
    isFocused,
    isMobile,
    search,
    setIsSearchCleared,
  ]);

  return {
    recentSearchList: recentList,
    searchQueriesList: recentSearch?.recentSearches.searchedQueries,
    recentSearchLoading,
    getRecentSearchs,
    markSeachEntityAsClickedMutation,
    setRecentList,
  };
};
