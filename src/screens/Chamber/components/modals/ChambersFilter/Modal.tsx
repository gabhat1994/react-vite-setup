import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Spacer } from '@/layout';
import { type DropdownValueType } from '@/components/Dropdown';

import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { Radiobox } from '@/components/Radiobox';
import { type ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import { typeOfChamberBox } from '@/components/ChamberBox/consts';
import {
  RadioBoxWrapper,
  SubTitle,
  Divider,
  RadioBoxItem,
  TagLabel,
} from './styles';
import { updatedSortOptions, LinkedFilterOptions } from './constants';
import { type ChambersFilterProps, type ICategoryOption } from './types';

const ChambersFilter: React.FC<ChambersFilterProps> = ({
  onClose,
  onSelectOption,
  selectedSortOption,
  categoryOptions,
  onSelectCategory,
  selectedCategoryID,
  selectedId,
  selectedLinkSort,
  onSelectLinkOption,
  shouldShowFilter,
}) => {
  const { t } = useTranslation();
  const isIPhone = !!window?.navigator.userAgent.match(/iPhone/i);

  const [selectedSortItem, setSelectedSortItem] = useState<
    DropdownValueType<string>
  >(updatedSortOptions[0]);

  const [selectedLinkSortItem, setSelectedLinkSortItem] = useState<
    DropdownValueType<string>
  >(LinkedFilterOptions()[0]);
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryOption | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  const selectSortOption = useCallback(
    (sortItem: DropdownValueType<string>) => {
      if (!isChanged) setIsChanged(true);
      setSelectedSortItem(sortItem);
    },
    [isChanged, setSelectedSortItem],
  );

  const selectLinkSortOption = useCallback(
    (sortItem: DropdownValueType<string>) => {
      if (!isChanged) setIsChanged(true);
      setSelectedLinkSortItem(sortItem);
    },
    [isChanged, setSelectedLinkSortItem],
  );

  const selectCategory = useCallback(
    (category: ICategoryOption) => {
      if (!isChanged) setIsChanged(true);
      setSelectedCategory(category);
    },
    [isChanged, setSelectedCategory],
  );

  const onApplySortAndFilter = useCallback(() => {
    onSelectOption(selectedSortItem);
    onSelectCategory(selectedCategory?.value || '-1');
    onSelectLinkOption(selectedLinkSortItem);
    onClose();
  }, [
    onClose,
    onSelectCategory,
    onSelectLinkOption,
    onSelectOption,
    selectedCategory?.value,
    selectedLinkSortItem,
    selectedSortItem,
  ]);

  useEffect(() => {
    setSelectedSortItem(
      updatedSortOptions.filter(
        (sortItem) => sortItem.value === selectedSortOption?.value,
      )[0],
    );
    setSelectedLinkSortItem(
      LinkedFilterOptions().filter(
        (sortItem) => sortItem.value === selectedLinkSort?.value,
      )[0],
    );

    setSelectedCategory(
      categoryOptions.filter((cate) => cate.value === selectedCategoryID)[0],
    );
  }, [
    categoryOptions,
    selectedCategoryID,
    selectedLinkSort?.value,
    selectedSortOption?.value,
  ]);

  const windowSize = useWindowDimensions();
  const isLaptop = useMemo(
    () => windowSize.width > breakpoints.LAPTOP,
    [windowSize.width],
  );

  return (
    <Modal
      open={!isLaptop}
      isFullScreen
      enableCloseButton
      testId="chamber-filter"
      onClose={onClose}
      disableBackdropClick
    >
      <ModalHeader isFullScreen justifyContent="flex-start">
        {t(`noumena.chambers.filter_modal_title`)}
      </ModalHeader>
      <ModalBody isFullScreen={!isIPhone}>
        {selectedId === 'Linked' ? (
          <>
            {LinkedFilterOptions().map((item) => (
              <RadioBoxWrapper key={item.key}>
                <RadioBoxItem
                  variant="sort"
                  onClick={() => selectLinkSortOption(item)}
                >
                  <Radiobox
                    isChecked={item.value === selectedLinkSortItem.value}
                    icon={
                      <Icon
                        name="radio_btn_m"
                        size={
                          item.value === selectedLinkSortItem.value ? 12 : 0
                        }
                        color={
                          item.value === selectedLinkSortItem.value
                            ? '--icon-radiobutton-brand-primary-default'
                            : '--icon-radiobutton-inactive-default'
                        }
                      />
                    }
                  />
                  <TSpan
                    font="body-m-bold"
                    colorToken="--text-tablecell-header-neutral-highlighted"
                  >
                    {item.label?.toString()}
                  </TSpan>
                </RadioBoxItem>
                <Divider />
              </RadioBoxWrapper>
            ))}
          </>
        ) : (
          <>
            <SubTitle
              font="body-l-bold"
              colorToken="--text-body-header-neutral-default"
            >
              {t('noumena.chambers.sorting')}
            </SubTitle>
            {updatedSortOptions.map((item) => (
              <RadioBoxWrapper key={item.key}>
                <RadioBoxItem
                  variant="sort"
                  onClick={() => selectSortOption(item)}
                >
                  <Radiobox
                    isChecked={item.value === selectedSortItem.value}
                    icon={
                      <Icon
                        name="radio_btn_m"
                        size={item.value === selectedSortItem.value ? 12 : 0}
                        color={
                          item.value === selectedSortItem.value
                            ? '--icon-radiobutton-brand-primary-default'
                            : '--icon-radiobutton-inactive-default'
                        }
                      />
                    }
                  />
                  <TSpan
                    font="body-m-bold"
                    colorToken="--text-tablecell-header-neutral-highlighted"
                  >
                    {item.label?.toString()}
                  </TSpan>
                </RadioBoxItem>
                <Divider />
              </RadioBoxWrapper>
            ))}
            <Spacer height={16} />
            {shouldShowFilter && (
              <>
                <SubTitle
                  font="body-l-bold"
                  colorToken="--text-body-header-neutral-default"
                >
                  {t('noumena.chambers.types')}
                </SubTitle>
                {categoryOptions.map((cate) => (
                  <RadioBoxWrapper key={cate.key}>
                    <RadioBoxItem
                      variant="filter"
                      onClick={() => selectCategory(cate)}
                    >
                      <Radiobox
                        isChecked={cate.value === selectedCategory?.value}
                        icon={
                          <Icon
                            name="radio_btn_m"
                            size={
                              cate.value === selectedCategory?.value ? 12 : 0
                            }
                            color={
                              cate.value === selectedCategory?.value
                                ? '--icon-radiobutton-brand-primary-default'
                                : '--icon-radiobutton-inactive-default'
                            }
                          />
                        }
                      />
                      <TagLabel
                        {...typeOfChamberBox[
                          cate.labelColor as ChamberBoxNameEnum
                        ]}
                      >
                        {cate.icon}
                        {cate.label}
                      </TagLabel>
                    </RadioBoxItem>
                    <Divider />
                  </RadioBoxWrapper>
                ))}
              </>
            )}
          </>
        )}
      </ModalBody>
      <ModalFooter isFullScreen justifyContent="center">
        {isChanged ? (
          <Button
            testId="chamber-filter-apply-button"
            onClick={onApplySortAndFilter}
            primary
            size="full"
          >
            {t(`noumena.chambers.filter_modal_button_apply_filter`)}
          </Button>
        ) : (
          <Button
            testId="chamber-filter-cancel-button"
            size="full"
            tertiary
            onClick={() => onClose()}
          >
            {t(`noumena.container.chamber_save_as_draft.cancel`)}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default ChambersFilter;
