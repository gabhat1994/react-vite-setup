import { type LinkedNoumFragment } from '@/apollo/graphql';
import { Checkbox } from '@/components/Checkbox';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { SearchField } from '@/features/globalSearch/components/GlobalSearch';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import LinkNoumOption from '@/screens/LinkNoum/components/LinkNoumOption';
import NoSearchResultsForNoums from '@/screens/LinkNoum/components/NoSearchResultsForNoums';
import { type LinkedNoumOptionType } from '@/screens/LinkNoum/components/types';
import { options } from '@/screens/LinkNoum/data';
import { t } from 'i18next';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  AlignTSpan,
  ButtonFlex,
  SearchWrapper,
  UnlinkContainer,
  UnlinkContainerHeader,
  UnlinkOptionContainer,
} from '../styles';
import {
  type UnlinkMultipleNoumProps,
  type UnlinkMultipleNoumRef,
} from '../types';

export const UnlinkMultipleNoumModal = forwardRef<
  UnlinkMultipleNoumRef,
  UnlinkMultipleNoumProps
>(({ isOpen, handleClose, acceptUnlinking, linkedNoums }, ref) => {
  const [searchStr, setSearchStr] = useState('');
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);

  const [linkNoumOption, setNoumOption] = useState<LinkedNoumOptionType[]>([]);
  const [filteredOptions, setFilteredOptions] = useState(linkNoumOption);

  useEffect(() => {
    const newLinkNoumOption = [...linkNoumOption];
    const lowerCaseSearch = searchStr.toLowerCase();
    const filtered = newLinkNoumOption.filter(({ name }) => {
      const lowerCaseName = name?.toLowerCase() ?? '';
      return (
        lowerCaseSearch.includes(lowerCaseName ?? '') ||
        lowerCaseName?.includes(lowerCaseSearch)
      );
    });
    setFilteredOptions(filtered);
  }, [searchStr, linkNoumOption]);

  const transformToLinkedOptions = useCallback(
    (noums: LinkedNoumFragment[] = []) =>
      noums.map((item) => ({
        ...item,
        checked: false,
        disabled: false,
      })) as LinkedNoumOptionType[],
    [],
  );

  useEffect(() => {
    const newLinkedNoums = transformToLinkedOptions(linkedNoums || []);
    setNoumOption(newLinkedNoums);
    if (!isOpen) setSearchStr('');
  }, [isOpen, linkedNoums, transformToLinkedOptions]);

  const onSearchChange = (arg: string) => {
    setSearchStr(arg);
  };

  useImperativeHandle(ref, () => ({
    handleSubmit: () =>
      (linkNoumOption.filter((item) => item.checked).map((item) => item._id) ||
        []) as string[],
  }));

  const allNoumOption = useMemo(() => {
    if (linkNoumOption.every((item) => item.checked)) {
      return true;
    }
    if (linkNoumOption.every((item) => !item.checked)) {
      return false;
    }
    return undefined;
  }, [linkNoumOption]);

  const updateOptionState = (id: string) => () => {
    const newLinkNoumOption = [...linkNoumOption];
    const foundOptionIdx = linkNoumOption.findIndex((item) => item._id === id);
    if (foundOptionIdx > -1) {
      newLinkNoumOption.splice(foundOptionIdx, 1, {
        ...newLinkNoumOption[foundOptionIdx],
        checked: !newLinkNoumOption[foundOptionIdx].checked,
      });
    }
    setNoumOption(newLinkNoumOption);
  };

  const updateAll = () => {
    const sumMajorBoolean = linkNoumOption.reduce(
      (acc, curVal) => {
        if (curVal.checked) acc.true += 1;
        else acc.false += 1;
        return acc;
      },
      { true: 0, false: 0 },
    );

    setNoumOption(
      linkNoumOption.map((item) => ({
        ...item,
        checked:
          typeof allNoumOption === 'boolean'
            ? !allNoumOption
            : !(sumMajorBoolean.false > sumMajorBoolean.true),
      })),
    );
  };

  const handleBeforeClose = useCallback(() => {
    const newLinkedNoums = transformToLinkedOptions(linkedNoums || []);
    setNoumOption(newLinkedNoums);
    handleClose();
  }, [handleClose, linkedNoums, transformToLinkedOptions]);

  return (
    <Modal
      enableCloseButton={!isMobile}
      testId="unlink-multiple-noum-modal"
      open={isOpen}
      onClose={handleBeforeClose}
      size={ModalSize.L}
      disableBackdropClick
    >
      <ModalHeader>{t('noumena.link_noums.unlink_noums')}</ModalHeader>
      <ModalBody>
        <AlignTSpan font="body-l" colorToken="--text-modal-neutral-default">
          {t('noumena.link_noums.unlink_multiple_modal_description')}
        </AlignTSpan>
        <SearchWrapper>
          <SearchField
            inputSize="small"
            placeholder="Search for a Noum"
            leftIcon={
              <Icon
                name="search_m"
                size={24}
                color="--icon-input-neutral-default"
              />
            }
            rightIcon={
              searchStr && (
                <Icon
                  name="clear_m"
                  size={24}
                  color="--icon-input-brand-primary-default"
                  onClick={() => onSearchChange('')}
                />
              )
            }
            value={searchStr || ''}
            onChange={(e) => onSearchChange(e.currentTarget.value)}
            data-testid="search-attendees"
          />
          {filteredOptions.length === 0 && <NoSearchResultsForNoums />}
        </SearchWrapper>
        <UnlinkContainer>
          {filteredOptions.length > 0 && (
            <UnlinkContainerHeader>
              <TSpan colorToken="--text-tablecell-header-neutral-highlighted">
                {t('noumena.link_noums.unlink_all')}
              </TSpan>
              <Checkbox
                onChange={updateAll}
                isChecked={
                  typeof allNoumOption === 'boolean' ? allNoumOption : true
                }
                icon={
                  <Icon
                    name={
                      typeof allNoumOption === 'boolean'
                        ? 'check_xs'
                        : 'minus_xs'
                    }
                    size={24}
                    color="--icon-checkbox-neutral-alt-default"
                  />
                }
              />
            </UnlinkContainerHeader>
          )}
          <UnlinkOptionContainer>
            {filteredOptions.map((item, idx) => (
              <LinkNoumOption
                key={item._id}
                style={{
                  paddingRight: 12,
                }}
                item={item}
                showBorder={idx < options.length - 1}
                updateOptionState={updateOptionState(item._id ?? '')}
              />
            ))}
          </UnlinkOptionContainer>
        </UnlinkContainer>
      </ModalBody>
      <ModalFooter gap={16}>
        <ButtonFlex
          size="full"
          testId="cancel-linking"
          flex={1}
          onClick={handleBeforeClose}
        >
          {t('noumena.cancel')}
        </ButtonFlex>
        <ButtonFlex
          testId="enable-linking"
          size="full"
          flex={isMobile ? 2 : 1}
          intent="negative"
          onClick={acceptUnlinking}
        >
          {t('noumena.link_noums.unlink_noums')}
        </ButtonFlex>
      </ModalFooter>
    </Modal>
  );
});
