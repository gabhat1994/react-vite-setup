import {
  type FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Button } from '@/components/Button';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import {
  LinkedFilterOptions,
  updatedSortOptions,
} from '@/screens/Chamber/components/modals/ChambersFilter/constants';
import { Radiobox } from '@/components/Radiobox';
import { type ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import { NoumsContext } from '@/providers';
import { typeOfChamberBox } from '@/components/ChamberBox/consts';
import { SpaceTypeEnum } from '@/apollo/generated/types';
import { chamberHeadList, linkTab } from './constants';
import { type IChambersHead, NoumScopeEnum } from './types';
import {
  ChamberActionButtons,
  ChambersDropDown,
  ChambersHeadWrapper,
  TagLabel,
} from './styles';

const ChambersHead: FC<IChambersHead> = ({
  selectedId,
  categoryOptions,
  onChange,
  onSelectOption,
  onSelectCategory,
  onSelectLinkOption,
  noumType,
}) => {
  const [categories, setCategories] =
    useState<DropdownValueType<string>[]>(categoryOptions);
  const {
    categoryID,
    sortInfo,
    setSelectedCategoryID,
    setSortInfo,
    sortLinkInfo,
    setSortLinkInfo,
  } = useContext(NoumsContext);

  const selectCategory = useCallback(
    (category: DropdownValueType<string>) => {
      onSelectCategory(category.value);
      setSelectedCategoryID(category.value);
    },
    [onSelectCategory, setSelectedCategoryID],
  );

  const selectSort = useCallback(
    (sort: DropdownValueType<string>) => {
      onSelectOption(sort);
      setSortInfo(sort);
    },
    [setSortInfo, onSelectOption],
  );

  const selectLinkSort = useCallback(
    (linkSort: DropdownValueType<string>) => {
      onSelectLinkOption(linkSort);
      setSortLinkInfo(linkSort);
    },
    [onSelectLinkOption, setSortLinkInfo],
  );
  const shouldShowSubfilter = useMemo(
    () =>
      [NoumScopeEnum.Connected, NoumScopeEnum.Following].includes(
        selectedId as NoumScopeEnum,
      ),
    [selectedId],
  );

  const shouldShowCategoryFilter = useMemo(() => {
    const subFilterCondition =
      shouldShowSubfilter && noumType === SpaceTypeEnum.Project;
    const mainTabCondition = [
      NoumScopeEnum.Archived,
      NoumScopeEnum.Owned,
    ].includes(selectedId as NoumScopeEnum);
    return subFilterCondition || mainTabCondition;
  }, [shouldShowSubfilter, noumType, selectedId]);

  useEffect(() => {
    if (categoryOptions.length > 0) {
      setCategories(
        categoryOptions.map((cate) => ({
          ...cate,
          selected: cate.value === categoryID,
          icon: (
            <Radiobox
              isChecked={cate.value === categoryID}
              icon={
                <Icon
                  name="flag_pl_m"
                  size={cate.value === categoryID ? 12 : 0}
                  color={
                    cate.value === categoryID
                      ? '--icon-radiobutton-brand-primary-default'
                      : '--icon-radiobutton-inactive-default'
                  }
                />
              }
            />
          ),
          label: (
            <TagLabel
              bgColor={
                cate.labelColor
                  ? typeOfChamberBox[cate.labelColor as ChamberBoxNameEnum]
                      ?.bgColor
                  : ''
              }
              color={
                cate.labelColor
                  ? typeOfChamberBox[cate.labelColor as ChamberBoxNameEnum]
                      ?.color
                  : ''
              }
            >
              {cate.icon}
              {cate.label}
            </TagLabel>
          ),
        })),
      );
    }
  }, [categoryID, categoryOptions]);

  const resetCategoryFilter = useCallback(() => {
    setSelectedCategoryID('-1');
    onSelectCategory('-1');
  }, [setSelectedCategoryID, onSelectCategory]);

  return (
    <ChambersHeadWrapper>
      <ChamberActionButtons data-testid="Chamber-action-buttons">
        <BasicChipsTabsForm
          onChange={(tab: string) => {
            onChange(tab as NoumScopeEnum);
            resetCategoryFilter();
          }}
          inputList={[...chamberHeadList, ...linkTab]}
          selectedId={selectedId}
          mode="isBackground"
          isWithoutImage
          fontSize="--font-link-medium-size"
          tabWidth="auto"
        />
        <ChambersDropDown>
          {selectedId === 'Linked' ? (
            <Dropdown
              hideIcons
              placement="bottom-start"
              options={LinkedFilterOptions()}
              onSelectOption={selectLinkSort}
              isAnimation={false}
              usePortal={true}
              calRefTop={false}
              observerMinHeight="0"
              padding="0px"
              searchDisabled
              autoFocusInternalSearch={false}
            >
              {({
                targetRef,
                toggle,
              }: DropdownTargetProps<HTMLButtonElement>) => (
                <Button
                  ref={targetRef}
                  size="small"
                  rightIcon={
                    <Icon
                      name="chevron_down_m"
                      size={16}
                      color="--icon-input-neutral-default"
                    />
                  }
                  softDisabled
                  onClick={toggle}
                >
                  {LinkedFilterOptions().filter(
                    (linkSort) => linkSort.value === sortLinkInfo?.value,
                  )[0]?.label || ''}
                </Button>
              )}
            </Dropdown>
          ) : (
            <>
              <Dropdown
                hideIcons
                placement="bottom-start"
                options={updatedSortOptions}
                onSelectOption={selectSort}
                isAnimation={false}
                searchDisabled
                autoFocusInternalSearch={false}
              >
                {({
                  targetRef,
                  toggle,
                }: DropdownTargetProps<HTMLButtonElement>) => (
                  <Button
                    ref={targetRef}
                    size="small"
                    rightIcon={
                      <Icon
                        name="chevron_down_m"
                        color="--icon-input-neutral-default"
                        size={16}
                      />
                    }
                    softDisabled
                    onClick={toggle}
                  >
                    {updatedSortOptions.filter(
                      (sort) => sort.value === sortInfo?.value,
                    )[0]?.label || ''}
                  </Button>
                )}
              </Dropdown>
              {shouldShowCategoryFilter && (
                <Dropdown
                  options={categories}
                  onSelectOption={selectCategory}
                  isAnimation={false}
                  searchDisabled
                  autoFocusInternalSearch={false}
                >
                  {({
                    targetRef,
                    toggle,
                  }: DropdownTargetProps<HTMLButtonElement>) => (
                    <Button
                      ref={targetRef}
                      size="small"
                      rightIcon={
                        <Icon
                          name="chevron_down_m"
                          color="--icon-input-neutral-default"
                          size={16}
                        />
                      }
                      softDisabled
                      onClick={toggle}
                    >
                      {categoryOptions.filter(
                        (cate) => cate.value === categoryID,
                      )[0]?.label || ''}
                    </Button>
                  )}
                </Dropdown>
              )}
            </>
          )}
        </ChambersDropDown>
      </ChamberActionButtons>
    </ChambersHeadWrapper>
  );
};

export default ChambersHead;
