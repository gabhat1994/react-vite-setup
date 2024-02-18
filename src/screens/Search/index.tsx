import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { t } from 'i18next';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { TSpan } from '@/components/Typography';
import { Spinner } from '@/components/Spinner';
import { Infinite } from '@/components/Infinite';
import { type GlobalSearchEntity } from '@/apollo/generated/types';
import {
  OptionHeaderWrapper,
  RecentSearchHead,
} from '@/features/globalSearch/components/GlobalSearch';
import { useRecentSearch } from '@/features/globalSearch/hooks';
import SearchList from './SearchList';
import {
  TabsContainer,
  SearchHead,
  DataContent,
  ContentSpan,
  SpinnerHead,
  SpanItem,
} from './styles';
import { type ResultType } from './types';
import { searchHeadList } from './constants';
import SearchLayout from './Layout';

const Search = () => {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState<string>('All');
  const [result, setResult] = useState<ResultType>();

  const { markSeachEntityAsClickedMutation } = useRecentSearch({});

  const onTabChange = useCallback((value: string) => {
    setSelectedTab(value);
  }, []);

  useEffect(() => {
    if (!result?.search) {
      setResult((pre) => ({
        ...pre,
        data: undefined,
        search: undefined,
      }));
    }
  }, [result?.search]);

  const isRecentSearch = useMemo(
    () =>
      result?.isMobile &&
      !result?.search &&
      result?.recentSearchList &&
      result?.recentSearchList?.length > 0,
    [result?.isMobile, result?.recentSearchList, result?.search],
  );

  const isSearchLoader = useMemo(
    () =>
      result?.loading ||
      (result?.infiniteState === 'hasNextPage' &&
        result?.data &&
        !result?.search),
    [result?.data, result?.infiniteState, result?.loading, result?.search],
  );

  const isSearchData = useMemo(
    () =>
      !result?.loading &&
      ((!result?.search && !result?.data) ||
        (result?.data && result.data.length === 0)),
    [result?.data, result?.loading, result?.search],
  );

  const isRecentSearchResult = useMemo(
    () =>
      !result?.data &&
      !result?.loading &&
      result?.isMobile &&
      result?.recentSearchList &&
      result?.recentSearchList.length === 0,
    [result?.data, result?.isMobile, result?.loading, result?.recentSearchList],
  );

  const isRecentSearchLoader = useMemo(
    () => !result?.search && result?.isMobile && result?.recentSearchLoading,
    [result?.isMobile, result?.recentSearchLoading, result?.search],
  );

  const rightContent = () => (
    <>
      <ContentSpan
        header
        font="heading-xs-bold"
        colorToken="--text-body-header-neutral-default"
      >
        {t('noumena.search.search_recent')}
      </ContentSpan>
      {result?.recentSearchLoading ? (
        <SpinnerHead recentSearch={result?.recentSearchLoading}>
          <Spinner />
        </SpinnerHead>
      ) : (
        result?.searchQueriesList &&
        result?.searchQueriesList?.length > 0 &&
        result?.searchQueriesList.map((history) => (
          <SpanItem
            key={history}
            color="--text-tablecell-header-neutral-highlighted"
          >
            {history}
          </SpanItem>
        ))
      )}
    </>
  );

  const searchRouteHandler = (value: GlobalSearchEntity) => {
    markSeachEntityAsClickedMutation({
      variables: {
        markSearchEntityAsClickedId: `${value.entityType}/${value.id}`,
      },
    });
  };

  return (
    <SearchLayout
      setResult={setResult}
      selectedTab={selectedTab}
      rightContent={rightContent()}
      onGoBack={() => navigate(-1)}
    >
      <SearchHead>
        <TSpan
          font="heading-s-bold"
          colorToken="--text-body-header-neutral-default"
        >
          {t('noumena.search.search_results')}
        </TSpan>
      </SearchHead>
      {isRecentSearchLoader ? (
        <SpinnerHead>
          <Spinner />
        </SpinnerHead>
      ) : isRecentSearch ? (
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
            result={result?.recentSearchList}
            searchRouteHandler={searchRouteHandler}
          />
        </>
      ) : isRecentSearchResult ? (
        <RecentSearchHead>
          <TSpan font="body-m" colorToken="--text-placeholder-neutral-default">
            {t('noumena.global_search.no_recent_results')}
          </TSpan>
        </RecentSearchHead>
      ) : (
        <>
          <TabsContainer>
            <BasicChipsTabsForm
              onChange={onTabChange}
              inputList={searchHeadList()}
              selectedId={selectedTab}
              mode="isBackground"
              isWithoutImage
              fontSize="--font-link-medium-size"
            />
          </TabsContainer>
          <DataContent>
            {result?.data && result.data.length > 0 ? (
              <Infinite
                onFetchMore={result?.fetchMore}
                scrollbarWidth={0}
                paddingBottom="25px"
              >
                <SearchList
                  result={result.data}
                  query={result?.search}
                  searchRouteHandler={searchRouteHandler}
                />
              </Infinite>
            ) : (
              isSearchData && (
                <ContentSpan
                  font="body-l"
                  colorToken="--text-placeholder-neutral-default"
                >
                  {t('noumena.global_search.no_results')}
                </ContentSpan>
              )
            )}
            {isSearchLoader && (
              <SpinnerHead>
                <Spinner />
              </SpinnerHead>
            )}
          </DataContent>
        </>
      )}
    </SearchLayout>
  );
};

export default Search;
