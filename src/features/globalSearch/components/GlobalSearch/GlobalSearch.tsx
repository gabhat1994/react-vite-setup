import {
  useCallback,
  useEffect,
  useState,
  type FC,
  type FormEvent,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router';
import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { useGlobalSearchLazyQuery } from '@/apollo/graphql';
import useDebounce from '@/hooks/useDebounce';
import {
  type EntityType,
  type GlobalSearchEntity,
  GlobalSearchUserEntityStatus,
} from '@/apollo/generated/types';
import ROUTES from '@/constants/routes';
import SearchList from '@/screens/Search/SearchList';
import { useRecentSearch } from '@/features/globalSearch/hooks';
import { Spinner } from '@/components/Spinner';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { DropdownItemLayout } from '@/components/Dropdown/styles';
import { TSpan } from '@/components/Typography/Typography';
import { useIsSocialHallUrl } from '@/hooks/useIsSocialHallUrl';
import { type GlobalSearchProps } from './types';
import {
  DropdownPicker,
  GLOBAL_SEARCH_DROPDOWN_MAX_WIDTH,
  OptionHeaderWrapper,
  RecentSearchHead,
  SearchField,
  SpinnerHead,
  StyledForm,
  StyledLink,
} from './styles';

const GlobalSearch: FC<GlobalSearchProps> = ({
  setResults,
  type,
  fullWidth = false,
}) => {
  const limit = setResults ? 10 : 4;
  const navigate = useNavigate();
  const [globalSearchData, setGlobalSearchData] = useState<
    GlobalSearchEntity[] | undefined
  >();
  const [getSearch, { data, loading, fetchMore: fetchMoreNoums }] =
    useGlobalSearchLazyQuery({
      onCompleted: () => {
        setGlobalSearchData(data?.globalSearch?.data ?? []);
      },
      fetchPolicy: 'cache-and-network',
    });

  const isSocialHallUri = useIsSocialHallUrl();
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [isSearchCleared, setIsSearchCleared] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_L, [width]);

  const {
    recentSearchList,
    getRecentSearchs,
    markSeachEntityAsClickedMutation,
    recentSearchLoading,
    setRecentList,
    searchQueriesList,
  } = useRecentSearch({
    isFocused,
    search,
    isMobile,
    isSearchCleared,
    setIsSearchCleared,
  });

  const [infiniteState, setInfiniteState] = useState<
    'loading' | 'hasNextPage' | 'end' | 'end-with-force'
  >('hasNextPage');
  const [initialFlag, setInitialFlag] = useState(true);
  const [infinityData, setInfinityData] = useState(data?.globalSearch?.data);
  const debouncedSearch = useDebounce<string>(search ?? '', 200);
  const shouldShowNoResults =
    globalSearchData && globalSearchData.length < 1 && !!search;
  const shouldShowRecentSearches = recentSearchList && !search;
  const onValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearch(value);
    if (!value) {
      setGlobalSearchData(undefined);
    }
  };

  const fetchMore = useCallback(async () => {
    const result = await fetchMoreNoums({
      variables: {
        limit,
        offset: infinityData?.length || 0,
        query: debouncedSearch,
        entityType: type && type !== 'All' ? (type as EntityType) : undefined,
      },
    });
    if ((result?.data?.globalSearch?.data?.length || 0) < limit) {
      setInfiniteState('end');
      return;
    }
    setInfinityData([
      ...(infinityData ?? []),
      ...(result?.data?.globalSearch?.data ?? []),
    ]);
  }, [debouncedSearch, fetchMoreNoums, infinityData, limit, type]);
  useEffect(() => {
    setInfinityData(globalSearchData);
  }, [globalSearchData]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const text = params.get('text');
    if (initialFlag) {
      if (!search && text) {
        setSearch(text ?? '');
      }
      setInitialFlag(false);
    }
    if (!initialFlag && debouncedSearch) {
      setGlobalSearchData(undefined);
      getSearch({
        variables: {
          limit,
          offset: 0,
          query: debouncedSearch,
          entityType: type && type !== 'All' ? (type as EntityType) : undefined,
          excludeEntityTypes: undefined,
          userStatuses: [GlobalSearchUserEntityStatus.NoumenaMember],
        },
      });
    }
  }, [debouncedSearch, getSearch, initialFlag, limit, search, type]);

  useEffect(() => {
    setInfiniteState(
      globalSearchData && globalSearchData?.length < limit
        ? 'end'
        : 'hasNextPage',
    );
  }, [limit, globalSearchData]);

  useEffect(() => {
    if (setResults) {
      setResults({
        data: infinityData,
        loading,
        infiniteState,
        fetchMore,
        search,
        searchQueriesList,
        recentSearchList,
        isMobile,
        recentSearchLoading,
      });
    }
  }, [
    fetchMore,
    infiniteState,
    infinityData,
    isMobile,
    loading,
    recentSearchList,
    recentSearchLoading,
    search,
    searchQueriesList,
    setResults,
  ]);

  useEffect(() => {
    if (debouncedSearch) {
      getRecentSearchs();
    }
  }, [debouncedSearch, getRecentSearchs]);

  const handleNavigation = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (setResults) return;
    if (isSocialHallUri) {
      window.open(`${ROUTES.SEARCH}?text=${search}`);
    } else {
      navigate(`${ROUTES.SEARCH}?text=${search}`);
    }
  };

  const searchRouteHandler = (value: GlobalSearchEntity) => {
    markSeachEntityAsClickedMutation({
      variables: {
        markSearchEntityAsClickedId: `${value.entityType}/${value.id}`,
      },
    });
  };

  const clearHandler = () => {
    setSearch('');
    setRecentList([]);
    setIsSearchCleared(true);
  };

  return (
    <>
      <StyledForm onSubmit={handleNavigation}>
        <SearchField
          fullWidth={fullWidth}
          onFocus={() => setIsFocused(true)}
          onBlur={() =>
            setTimeout(() => {
              setIsFocused(false);
            }, 200)
          }
          inputSize="small"
          placeholder={t('noumena.search')}
          leftIcon={
            !search && (
              <Icon
                name="search_m"
                size={24}
                color="--icon-input-neutral-default"
              />
            )
          }
          rightIcon={
            debouncedSearch && (
              <Icon
                onClick={clearHandler}
                name="clear_m"
                size={24}
                color="--icon-input-neutral-default"
              />
            )
          }
          rightIconColor="var(--icon-input-brand-primary-default)"
          value={search || ''}
          onChange={onValueChange}
          data-testid="global-search-input-new"
        />
      </StyledForm>
      <Dropdown
        isLoading={search ? loading : false}
        isShowEmptyText={shouldShowNoResults ?? false}
        noSearchOptionsText={t('noumena.global_search.no_results')}
        inputValue={search}
        minHeight={!search ? '0px' : undefined}
        padding={!search ? '0px' : undefined}
        usePopStyle
        optionsRenderer={() => (
          <>
            {shouldShowRecentSearches &&
              (recentSearchLoading ? (
                <SpinnerHead>
                  <Spinner />
                </SpinnerHead>
              ) : recentSearchList?.length > 0 ? (
                <>
                  <OptionHeaderWrapper>
                    <TSpan
                      font="body-m-bold"
                      colorToken="--text-tablecell-header-neutral-highlighted"
                    >
                      {t('noumena.global_search.recent_searches')}
                    </TSpan>
                  </OptionHeaderWrapper>
                  <SearchList
                    isDropdown
                    result={recentSearchList}
                    searchRouteHandler={searchRouteHandler}
                  />
                </>
              ) : (
                <RecentSearchHead>
                  <TSpan
                    font="body-m"
                    colorToken="--text-placeholder-neutral-default"
                  >
                    {t('noumena.global_search.no_recent_results')}
                  </TSpan>
                </RecentSearchHead>
              ))}
            {!loading &&
              !shouldShowRecentSearches &&
              globalSearchData &&
              globalSearchData.length > 0 && (
                <>
                  <SearchList
                    isDropdown
                    query={debouncedSearch}
                    result={globalSearchData}
                    searchRouteHandler={searchRouteHandler}
                  />
                  <StyledLink onClick={() => handleNavigation()} as="div">
                    <DropdownItemLayout as="div">
                      <TSpan
                        font="button-m"
                        colorToken="--text-button-brand-primary-default"
                      >
                        {t('noumena.global_search.see_all_results')}
                      </TSpan>
                    </DropdownItemLayout>
                  </StyledLink>
                </>
              )}
          </>
        )}
        isOpen={isFocused && !isMobile && (!setResults || !search)}
        options={[]}
        containerWidth={
          // TODO: Ideally, there should be an option to set container width equal to the input size, dynamically.
          isMobile ? '100%' : `${GLOBAL_SEARCH_DROPDOWN_MAX_WIDTH}px`
        }
      >
        {({
          targetProps,
          targetRef,
          toggle,
        }: DropdownTargetProps<HTMLDivElement>) => (
          <DropdownPicker ref={targetRef} {...targetProps} onClick={toggle} />
        )}
      </Dropdown>
    </>
  );
};

export default GlobalSearch;
