import {
  SpaceTypeEnum,
  type ProjectChamberCategory,
} from '@/apollo/generated/types';
import { useGetProjectChamberCategoriesLazyQuery } from '@/apollo/graphql';
import { type DropdownValueType } from '@/components/Dropdown/types';
import Icon from '@/components/Icon/Icon';
import { Infinite } from '@/components/Infinite';
import SkeletonLoaderProvider from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import routes from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly, useToggle } from '@/hooks';
import ListLayout from '@/layout/ListLayout';
import { NoumsContext, NoumsProvider, useNoumsContext } from '@/providers';
import { ChambersList } from '@/screens/Chamber/components/ChambersList/ChambersList';
import ChambersFilter from '@/screens/Chamber/components/modals/ChambersFilter/Modal';
import LinkNoum from '@/screens/Chamber/components/modals/LinkNoum/LinkNoumModal';
import ProjectCreate from '@/screens/Chamber/components/modals/ProjectCreate';
import MyPlans from '@/screens/Money/Payments/MyPlans';
import { chambersForSkeletonLoader } from '@/utils/skeletonLoaderHelpers';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { SearchResult } from './SearchResult';
import ChamberBottomSheet, {
  type ChamberBottomSheetItem,
} from '../Chamber/components/modals/ChamberBottomSheet';
import {
  LinkedFilterOptions,
  updatedSortOptions,
} from '../Chamber/components/modals/ChambersFilter/constants';
import { type ICategoryOption } from '../Chamber/components/modals/ChambersFilter/types';
import { ManageMembersModal } from '../Chamber/components/modals/ManageMembersModal';
import ChambersHead from './ChambersHead';
import ChambersMobileActions from './ChambersMobileActions';
import ChambersRightSideBar from './ChambersRightSideBar';
import InvitesAndRequests from './InvitesAndRequests';
import LinkedNoums from './LinkedNoums';
import { noumTypeFilter } from './constants';
import { getEmptyDescription, getEmptyHeading } from './helper';
import {
  AppStyled,
  ChamberContainerHead,
  Container,
  MyPlansWrapper,
  SubFilterWrapper,
} from './styles';
import { NoumScopeEnum } from './types';

const Chambers = () => {
  const { t } = useTranslation();
  const { search, pathname } = useLocation();

  const {
    noums,
    linkedNoums,
    currentLoading,
    infiniteState,
    setSelectedSort,
    selectedSort,
    selectedNoumType,
    setSelectedNoumType,
    selectedCateId,
    setSelectedCateId,
    selectedTab,
    setSelectedTab,
    selectedLinkSort,
    setSelectedLinkSort,
    fetchMore,
  } = useNoumsContext();

  const { flags } = useLaunchDarkly();
  const [isCreateOpen, toggleCreateOpen] = useToggle(false);
  const [isLinkNoumOpen, toggleLinkNoumOpen] = useToggle(false);
  const [isBottomSheetOpen, toggleBottomSheetModal] = useToggle(false);
  const [isOpenFilter, toggleFilter] = useToggle(false);
  const [isManageMembersOpen, toggleManageMembers] = useToggle(false);

  const [categoryOptions, setCategoryOptions] = useState<ICategoryOption[]>([
    {
      key: '-1',
      value: '-1',
      type: 'value',
      name: 'All types',
      label: t(`noumena.chambers.all_types`),
      labelColor: 'all',
    },
  ]);
  const { user, isActive: access } = useAuth();
  const { setSelectedCategoryID } = useContext(NoumsContext);

  const navigate = useNavigate();

  const navigateToContractManager = useCallback(() => {
    navigate(routes.CONTRACT_MANAGER);
  }, [navigate]);

  const navigateToContactManager = useCallback(() => {
    navigate(routes.CONTACT_MANAGER);
  }, [navigate]);

  const navigateToInvoiceManager = useCallback(() => {
    navigate(routes.INVOICE_MANAGER);
  }, [navigate]);

  const navigateToCampaignManager = useCallback(() => {
    navigate(routes.CAMPAIGNS);
  }, [navigate]);

  const dropDownOption = useMemo(() => {
    const options: ChamberBottomSheetItem[] = [
      {
        key: 'Linked Noums',
        label: t('noumena.link_noums.link_noums', {
          linkNo: '',
        }),
        icon: 'link_m',
        onClick: () => {
          toggleLinkNoumOpen();
          toggleBottomSheetModal();
        },
        iconColor: '--icon-tablecell-neutral-highlighted',
      },
    ];

    if (flags.contractTool) {
      options.push({
        key: 'Contract Manager',
        label: t('noumena.contract_manager.contract_manager'),
        icon: 'link_m', // TODO: Change to correct icon for Contract Tool
        onClick: () => {
          toggleBottomSheetModal();
          navigateToContractManager();
        },
        iconColor: '--icon-tablecell-neutral-highlighted',
      });
    }

    if (flags.campaigns) {
      options.push({
        key: 'Campaigns',
        label: 'Campaigns',
        icon: 'link_m', // TODO: Change to correct icon for Contract Tool
        onClick: () => {
          toggleBottomSheetModal();
          navigateToCampaignManager();
        },
        iconColor: '--icon-tablecell-neutral-highlighted',
      });
    }

    return options;
  }, [
    t,
    flags.contractTool,
    flags.campaigns,
    toggleLinkNoumOpen,
    toggleBottomSheetModal,
    navigateToContractManager,
    navigateToCampaignManager,
  ]);

  const [getCategoryList] = useGetProjectChamberCategoriesLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (response) => {
      const categories = response.getProjectChamberCategories;
      if (categories) {
        setCategoryOptions(
          [
            {
              key: '-1',
              value: '-1',
              type: 'value',
              name: 'All types',
              label: t(`noumena.chambers.all_types`),
              labelColor: 'all',
            } as ICategoryOption,
          ].concat(
            categories
              .filter(
                (category: ProjectChamberCategory) =>
                  !category.name.toLowerCase().match('#member') &&
                  category.name !== 'Linked', // TODO Delete this condition after production release on Sep. 8
              )
              .map((categoryItem: ProjectChamberCategory) => ({
                key: categoryItem._id,
                value: categoryItem._id,
                type: 'value',
                name: categoryItem.name,
                label: t(`noumena.chambers.${categoryItem.name}`),
                labelColor: categoryItem.name.toLowerCase(),
                icon:
                  categoryItem.name === 'Linked' ? (
                    <Icon
                      style={{ marginRight: 4 }}
                      name="link_m"
                      size={16}
                      color="--icon-badge-neutral-default"
                    />
                  ) : null,
              })),
          ),
        );
      }
    },
  });

  useEffect(() => {
    if (user?._id) getCategoryList();
  }, [getCategoryList, user]);

  const onCreateSuccess = useCallback(
    (id: string) => {
      navigate(`/noum/${id}/edit`, { state: { prevPath: pathname } });
    },
    [navigate, pathname],
  );

  // functionality when chambers head tab changed
  const onTabChange = useCallback(
    (value: NoumScopeEnum) => {
      const searchParams = new URLSearchParams(search);
      searchParams.set('tab', value);
      if (
        value === NoumScopeEnum.Connected ||
        value === NoumScopeEnum.Following
      )
        searchParams.set('type', 'All');
      else searchParams.delete('type');
      navigate(`/noums?${searchParams.toString()}`);
      setSelectedTab(value);
      setSelectedNoumType(undefined);
    },
    [navigate, search, setSelectedNoumType, setSelectedTab],
  );

  const onSelectOptionData = useCallback(
    (value: DropdownValueType<string>) => {
      setSelectedSort(value);
      // setInfiniteState('hasNextPage');
    },
    [setSelectedSort],
  );

  const onSelectLinkOption = useCallback(
    (value: DropdownValueType<string>) => {
      setSelectedLinkSort(value);
    },
    [setSelectedLinkSort],
  );

  const onSelectCategoryID = useCallback(
    (id: string) => {
      setSelectedCateId(id);
    },
    [setSelectedCateId],
  );

  const onSelectNoumType = useCallback(
    (noumType: string) => {
      const searchParams = new URLSearchParams(search);
      onSelectCategoryID('-1');
      setSelectedCategoryID('-1');
      if (noumType === 'All') {
        setSelectedNoumType(undefined);
      } else {
        setSelectedNoumType(noumType as SpaceTypeEnum);
      }

      if (
        selectedTab === NoumScopeEnum.Connected ||
        selectedTab === NoumScopeEnum.Following
      )
        searchParams.set('type', noumType);
      else searchParams.delete('type');
      navigate(`${pathname}?${searchParams.toString()}`);
    },
    [
      search,
      onSelectCategoryID,
      setSelectedCategoryID,
      selectedTab,
      navigate,
      pathname,
      setSelectedNoumType,
    ],
  );

  const shouldShowSubfilter = useMemo(
    () =>
      [NoumScopeEnum.Connected, NoumScopeEnum.Following].includes(
        selectedTab as NoumScopeEnum,
      ),
    [selectedTab],
  );

  const shouldShowCategoryFilter = useMemo(() => {
    const subFilterCondition =
      shouldShowSubfilter && selectedNoumType === SpaceTypeEnum.Project;
    const mainTabCondition = [
      NoumScopeEnum.Archived,
      NoumScopeEnum.Owned,
    ].includes(selectedTab as NoumScopeEnum);
    return subFilterCondition || mainTabCondition;
  }, [shouldShowSubfilter, selectedNoumType, selectedTab]);

  const isFiltered =
    selectedSort?.key !== updatedSortOptions[0]?.key ||
    selectedCateId !== '-1' ||
    selectedLinkSort?.key !== LinkedFilterOptions()[0]?.key;

  return (
    <SkeletonLoaderProvider isLoading={currentLoading && !noums?.length}>
      <ListLayout
        type="Chambers"
        rightContent={
          <ChambersRightSideBar
            onToggleCreate={toggleCreateOpen}
            onToggleLinkNoum={toggleLinkNoumOpen}
            onToggleManageMembers={toggleManageMembers}
            onContractManagerClick={navigateToContractManager}
            onInvoiceManagerClick={navigateToInvoiceManager}
            onContactManagerClick={navigateToContactManager}
            onCampaginManagerClick={navigateToCampaignManager}
          />
        }
      >
        <Container gap={24} isAppUiV2={flags.newAppNavigation}>
          <AppStyled
            style={{ gap: 16, display: 'flex', flexDirection: 'column' }}
          >
            <ChamberContainerHead>
              <ChambersHead
                selectedId={selectedTab}
                onChange={onTabChange}
                onSelectOption={onSelectOptionData}
                categoryOptions={categoryOptions}
                onSelectCategory={onSelectCategoryID}
                onSelectLinkOption={onSelectLinkOption}
                noumType={selectedNoumType}
              />
              <InvitesAndRequests />
              {/* TODO: Remove MyPlans from here and place into new Side bar which is for tablet and mobile when dev is complete, See designs under NOUM-4693 */}
              {flags.paymentSubscriptions && access && (
                <MyPlansWrapper>
                  <MyPlans />
                </MyPlansWrapper>
              )}
            </ChamberContainerHead>
            {shouldShowSubfilter && (
              <SubFilterWrapper>
                <BasicChipsTabsForm
                  onChange={onSelectNoumType}
                  inputList={noumTypeFilter}
                  selectedId={selectedNoumType || 'All'}
                  mode="isBackground"
                  isWithoutImage
                  fontSize="--font-link-medium-size"
                  tabWidth="auto"
                />
              </SubFilterWrapper>
            )}
            <SearchResult
              isNoum={
                selectedTab === NoumScopeEnum.Linked
                  ? linkedNoums.length > 0
                  : (noums?.length || 0) > 0
              }
              isFilterApplied={!!selectedNoumType}
              tab={selectedTab}
              noResultText={getEmptyHeading(selectedTab)}
              noResultSubText={getEmptyDescription(selectedTab)}
            >
              <Infinite
                onFetchMore={fetchMore}
                status={infiniteState}
                scrollbarWidth={0}
                paddingBottom="75px"
              >
                {selectedTab === NoumScopeEnum.Linked ? (
                  <LinkedNoums data={linkedNoums} />
                ) : (
                  <ChambersList
                    chambers={
                      noums?.length ? noums : chambersForSkeletonLoader(9)
                    }
                  />
                )}
              </Infinite>
            </SearchResult>
            <ChambersMobileActions
              onToggleFilter={toggleFilter}
              openBottomSheet={toggleBottomSheetModal}
              onToggleCreate={toggleCreateOpen}
              isFiltered={isFiltered}
            />
          </AppStyled>
        </Container>
        {access && (
          <>
            {isCreateOpen && (
              <ProjectCreate
                isOpen={isCreateOpen}
                handleClose={toggleCreateOpen}
                handleSuccess={onCreateSuccess}
              />
            )}
            {isLinkNoumOpen && (
              <LinkNoum
                isOpen={isLinkNoumOpen}
                handleClose={toggleLinkNoumOpen}
              />
            )}
            <ChamberBottomSheet
              dropDownOptions={dropDownOption}
              isOpen={isBottomSheetOpen}
              handleClose={toggleBottomSheetModal}
            />
          </>
        )}
        {isOpenFilter && (
          <ChambersFilter
            onClose={toggleFilter}
            onSelectOption={onSelectOptionData}
            selectedSortOption={selectedSort}
            categoryOptions={categoryOptions}
            onSelectCategory={onSelectCategoryID}
            selectedCategoryID={selectedCateId}
            selectedId={selectedTab}
            onSelectLinkOption={onSelectLinkOption}
            selectedLinkSort={selectedLinkSort}
            shouldShowFilter={shouldShowCategoryFilter}
          />
        )}
        {isManageMembersOpen && (
          <ManageMembersModal
            isOpen={isManageMembersOpen}
            handleClose={() => toggleManageMembers()}
          />
        )}
      </ListLayout>
    </SkeletonLoaderProvider>
  );
};

const ChambersWrap = () => (
  <NoumsProvider>
    <Chambers />
  </NoumsProvider>
);
export default ChambersWrap;
