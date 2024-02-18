import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import * as S from './styles';
import {
  type DropdownItemProps,
  type DropdownItemType,
  type DropdownProps,
  type DropDownRenderOptionsType,
  type DropdownTargetProps,
  type DropdownValueType,
} from './types';
import { Infinite } from '../Infinite';
import { Spinner } from '../Spinner';
import { Icon } from '../Icon';
import { Checkbox } from '../Checkbox';
import { DropdownContent } from './components/DropdownContent';

/**
 * Wraps around any child to upgrade it to a dropdown component. If used in the
 * render props style you get access to some of the internal state of the dropdown
 * including the input props used for search
 * @example
 * const options = [
 *  {type: "header", label: "Header"},
 *  {type: "value", key: "1", label: "Value"}
 * ];
 *
 * function handleOnSelect(value: DropdownValueType) {}
 *
 * // as children
 * <Dropdown options={options} onSelectOption={handleOnSelect}>
 *  <button>click here</button>
 * </Dropdown>
 *
 * // as render props with controlled input
 * <Dropdown options={options} onSelectOption={handleOnSelect}>
 *  {({searchInputProps}) =>
 *    <input {...searchInputProps}/>
 *  }
 * </Dropdown>
 */
export function Dropdown<
  T,
  TargetRef extends HTMLElement,
  TabId extends string = string,
  Key extends string = string,
>({
  children,
  options,
  stickyHeaderOptions,
  stickyFooterOptions,
  showFooterDivider = true,
  showHeaderDivider = true,
  isPopperStyle,
  inputValue,
  observerMinHeight,
  searchPlaceholder,
  searchLeftIcon,
  placement = 'auto',
  padding,
  showInternalSearch = false,
  autoFocusInternalSearch = true,
  isLoading = false,
  isMatchedBoldText = false,
  isMobile = false,
  usePortal = true,
  closeOnSelect = true,
  isOpen: isOpenProp,
  renderCreateNewOption,
  hideIcons,
  iconColumnWidth,
  checkboxPosition,
  containerWidth,
  containerHeight,
  maxContainerHeight,
  containerPadding,
  minHeight,
  containerStyle,
  dropdownItemStyle,
  searchDisabled,
  multiselect,
  leftIcon,
  onSelectOption,
  onInputChange,
  onFetchMore,
  onClear,
  onClose,
  onOpen,
  optionsRenderer,
  tabProps,
  disabled,
  calRefTop = true,
  isAnimation = true,
  isShowEmptyText = true,
  usePopStyle = false,
  forceHideCloseButton = false,
  renderContainerFromBottom = false,
  noAvailableOptions,
  noAvailableOptionsText,
  noSearchOptionsText,
  noSearchOptionsTextAlign,
  forceListFromBottom = false,
  hideLeftIconPlace = false,
  unsetOverflow = false,
  isRenderFromBottomContentCentered = false,
}: DropdownProps<T, TargetRef, TabId, Key>): JSX.Element {
  const { t } = useTranslation();

  const inputSearchRef = useRef<HTMLInputElement>(null);

  const [isOpenState, setIsOpenState] = useState(false);
  const [activeItem, setActiveItem] = useState<DropdownValueType<
    T,
    Key
  > | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  const isOpen = useMemo(
    () => isOpenProp ?? isOpenState,
    [isOpenProp, isOpenState],
  );

  type Cause = 'select' | 'user';

  const handleClose = useCallback(
    (cause?: Cause) => {
      function close() {
        setIsOpenState(false);
        onClose?.();
        setActiveItem(null);
        setActiveSubItem(null);
      }
      if (cause === 'select' && !closeOnSelect) return;
      close();
    },
    [closeOnSelect, onClose],
  );

  useEffect(() => {
    if (isOpenState && disabled) {
      handleClose();
    }
  }, [isOpenState, disabled, handleClose]);

  useEffect(() => {
    if (isOpenState) {
      inputSearchRef.current?.focus();
    }
  }, [isOpenState]);

  const handleSelectOption = useCallback(
    (value: DropdownValueType<T, Key>) => {
      onSelectOption?.(value);
      handleClose('select');
    },
    [handleClose, onSelectOption],
  );

  const innerDropdownContent = (contentCentered?: boolean) => (
    <>
      {optionsRenderer &&
        optionsRenderer(
          options,
          handleSelectOption,
          activeItem,
          activeSubItem,
          setActiveSubItem,
          hideIcons,
        )}
      {!optionsRenderer && options?.length > 0 && (
        <Infinite
          observerMinHeight={observerMinHeight}
          onFetchMore={onFetchMore}
          scrollbarWidth={20}
          paddingRight="0px"
          width="100%"
          style={{ ...(unsetOverflow ? { overflow: 'unset' } : {}) }}
        >
          {options.map(
            dropdownRenderOptions(
              handleSelectOption,
              activeItem,
              setActiveSubItem,
              {
                activeSubItem,
                hideIcons,
                multiselect,
                checkboxPosition,
                iconColumnWidth,
                leftIcon,
                dropdownItemStyle,
                isMatchedBoldText,
                containerPadding,
                inputValue,
                contentCentered,
              },
            ),
          )}
        </Infinite>
      )}
      {!isLoading && options?.length === 0 && isShowEmptyText && (
        <S.DropdownNoSearchResultsContainer
          justifyContent={noSearchOptionsTextAlign}
        >
          <TSpan
            font="body-m"
            colorToken="--text-tablecell-body-neutral-default"
          >
            {noAvailableOptions
              ? noAvailableOptionsText ??
                t('noumena.dropdown.nothing_found.text')
              : noSearchOptionsText ?? t('noumena.dropdown.nothing_found.text')}
          </TSpan>
        </S.DropdownNoSearchResultsContainer>
      )}
      {isLoading && (
        <S.DropdownNoSearchResultsContainer
          justifyContent={noSearchOptionsTextAlign}
        >
          <Spinner />
        </S.DropdownNoSearchResultsContainer>
      )}
    </>
  );

  const stickyHeader = useMemo(
    () =>
      stickyHeaderOptions && (
        <>
          {stickyHeaderOptions.map(
            dropdownRenderOptions(
              handleSelectOption,
              activeItem,
              setActiveSubItem,
              {
                activeSubItem,
                isMatchedBoldText,
              },
            ),
          )}
          {showHeaderDivider && <S.DropdownDividerItem />}
        </>
      ),
    [
      activeItem,
      activeSubItem,
      isMatchedBoldText,
      showHeaderDivider,
      stickyHeaderOptions,
      handleSelectOption,
      setActiveSubItem,
    ],
  );

  const stickyFooter = useMemo(
    () =>
      stickyFooterOptions && (
        <>
          {showFooterDivider && <S.DropdownDividerItem />}
          {stickyFooterOptions.map(
            dropdownRenderOptions(
              handleSelectOption,
              activeItem,
              setActiveSubItem,
              {
                activeSubItem,
                hideIcons,
                dropdownItemStyle,
                isMatchedBoldText,
              },
            ),
          )}
        </>
      ),
    [
      activeItem,
      hideIcons,
      activeSubItem,
      dropdownItemStyle,
      isMatchedBoldText,
      showFooterDivider,
      stickyFooterOptions,
      handleSelectOption,
      setActiveSubItem,
    ],
  );

  return (
    <DropdownContent<T, TargetRef, TabId, Key>
      options={options}
      isOpen={isOpen}
      isMobile={isMobile}
      disabled={disabled}
      isAnimation={isAnimation}
      containerHeight={containerHeight}
      maxContainerHeight={maxContainerHeight}
      activeItem={activeItem}
      padding={padding}
      minHeight={minHeight}
      usePortal={usePortal}
      usePopStyle={usePopStyle}
      isPopperStyle={isPopperStyle}
      containerStyle={containerStyle}
      containerWidth={containerWidth}
      placement={placement}
      calRefTop={calRefTop}
      tabProps={tabProps}
      inputValue={inputValue}
      searchDisabled={searchDisabled}
      closeOnSelect={closeOnSelect}
      searchPlaceholder={searchPlaceholder}
      searchLeftIcon={searchLeftIcon}
      showInternalSearch={showInternalSearch}
      renderContainerFromBottom={renderContainerFromBottom}
      stickyHeader={stickyHeader}
      stickyFooter={stickyFooter}
      stickyHeaderOptions={stickyHeaderOptions}
      stickyFooterOptions={stickyFooterOptions}
      innerDropdownContent={innerDropdownContent}
      renderCreateNewOption={renderCreateNewOption}
      forceHideCloseButton={forceHideCloseButton}
      autoFocusInternalSearch={autoFocusInternalSearch}
      onInputChange={onInputChange}
      setIsOpenState={setIsOpenState}
      setActiveItem={setActiveItem}
      setActiveSubItem={setActiveSubItem}
      onSelectOption={onSelectOption}
      onOpen={onOpen}
      onClose={onClose}
      onClear={onClear}
      forceListFromBottom={forceListFromBottom}
      hideLeftIconPlace={hideLeftIconPlace}
      unsetOverflow={unsetOverflow}
      isRenderFromBottomContentCentered={isRenderFromBottomContentCentered}
    >
      {children}
    </DropdownContent>
  );
}

function DropdownItem<T = unknown, Key extends string = string>({
  value,
  active,
  onSelect,
  onSelectIcon,
  onClickSubItem,
  activeSubItem,
  setActiveSubItem,
  hideIcons,
  iconColumnWidth,
  intent,
  multiselect,
  leftIcon,
  labelColor,
  isBottomBorder,
  dropdownItemStyle,
  containerPadding,
  inputValue,
  isMatchedBoldText,
  labelFontFamily,
  contentCentered,
  checkboxPosition,
}: DropdownItemProps<T, Key>): JSX.Element {
  const hasSubItems = (value.subItems?.length ?? 0) > 0;
  const handleOnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (value.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (value.subItems && value.openSubmenuOnSelect) {
      setActiveSubItem?.(value.key);
      onClickSubItem?.(value);
    } else {
      onSelect?.(value);
    }
  };

  const searchValue = () => {
    const mainStringIndex = value.label
      ?.toString()
      ?.toLowerCase()
      .indexOf(inputValue?.toLowerCase() as string) as number;
    const searchString = value.label
      ?.toString()
      .substring(
        mainStringIndex as number,
        mainStringIndex + (inputValue?.length ?? 0),
      );

    return (
      value.label
        ?.toString()
        .replace(searchString as string, `<span>${searchString}</span>`) ?? ''
    );
  };

  return (
    <Dropdown<T, HTMLAnchorElement, string, Key>
      isOpen={activeSubItem === value.key}
      options={value.subItems ?? []}
      placement="right-start"
      onSelectOption={onSelect}
      onFetchMore={value.onFetchMoreSubItems}
    >
      {({
        targetProps,
        targetRef,
        index: _index,
      }: DropdownTargetProps<HTMLAnchorElement>) => (
        <S.DropdownItemLayout
          ref={targetRef}
          {...targetProps}
          data-testid="dropdown-value"
          data-test={`dropdown-value-${_index}`}
          active={active}
          onKeyDownCapture={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          tabIndex={0}
          href={value.href}
          rel={value.href ? 'noreferrer noopener' : undefined}
          target={value.href ? '_blank' : undefined}
          onClick={value.href ? undefined : handleOnClick}
          disabled={value.disabled}
          drillDown={(value.subItems?.length ?? 0) > 0}
          intent={intent}
          isBottomBorder={isBottomBorder}
          containerPadding={containerPadding}
          style={{
            ...dropdownItemStyle,
          }}
        >
          {multiselect && checkboxPosition === 'left' && (
            <S.CheckboxWrapper>
              <Checkbox
                isChecked={value.selected ?? false}
                icon={
                  <Icon
                    name="tick_m"
                    size={value.selected ? 24 : 0}
                    color="--icon-checkbox-neutral-alt-default"
                  />
                }
              />
            </S.CheckboxWrapper>
          )}
          <S.DropDownLabel
            selected={value.selected}
            hasSubItems={hasSubItems}
            labelColor={labelColor}
            contentCentered={contentCentered}
          >
            {!hideIcons && !value.hideIconPlace && (
              <S.DropdownIcon
                iconColumnWidth={iconColumnWidth}
                data-testid="dropdown-icons"
                onClick={
                  value.icon && onSelectIcon
                    ? (e) => {
                        e.stopPropagation();
                        onSelectIcon(value.value);
                      }
                    : undefined
                }
              >
                {value.icon}
              </S.DropdownIcon>
            )}
            <S.DropdownValueWrapper fontFamily={labelFontFamily}>
              <S.DropdownValueLabel
                fontFamily={labelFontFamily}
                intent={intent}
                isMatchedBoldText={isMatchedBoldText}
              >
                {isMatchedBoldText ? (
                  // eslint-disable-next-line react/no-danger
                  <div dangerouslySetInnerHTML={{ __html: searchValue() }} />
                ) : (
                  value.label
                )}
              </S.DropdownValueLabel>
              {value.description && (
                <S.DropdownValueDescription intent={intent}>
                  {value.description}
                </S.DropdownValueDescription>
              )}
            </S.DropdownValueWrapper>
          </S.DropDownLabel>

          {multiselect && checkboxPosition === 'right' && (
            <S.CheckboxWrapper>
              <Checkbox
                isChecked={value.selected ?? false}
                icon={
                  <Icon
                    name="tick_m"
                    size={value.selected ? 24 : 0}
                    color="--icon-checkbox-neutral-alt-default"
                  />
                }
              />
            </S.CheckboxWrapper>
          )}
          {value.href && (
            <Icon
              name="link_m"
              size={24}
              color="--icon-tablecell-neutral-highlighted"
            />
          )}
          {!value.selected && !!value.rightIcon && value.rightIcon}
          {value.selected && !!leftIcon && leftIcon}
          {hasSubItems && (
            <S.ExpandButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveSubItem?.(value.key);
                onClickSubItem?.(value);
              }}
            >
              <Icon
                name="arrow_right_m"
                size={16}
                color="--icon-input-neutral-default"
              />
            </S.ExpandButton>
          )}
        </S.DropdownItemLayout>
      )}
    </Dropdown>
  );
}

export function dropdownRenderOptions<T = string, Key extends string = string>(
  handleSelectOption: (value: DropdownValueType<T, Key>) => void,
  activeItem: DropdownValueType<T, Key> | null,
  setActiveSubItem: (item: string | null) => void,
  uiOptions?: DropDownRenderOptionsType,
): (
  value: DropdownItemType<T, Key>,
  index: number,
  array: DropdownItemType<T, Key>[],
) => JSX.Element | null {
  return (opt, index, arr) => {
    switch (opt.type) {
      case 'value':
        return (
          <DropdownItem<T, Key>
            index={index}
            active={activeItem?.key === opt.key}
            onSelect={handleSelectOption}
            onSelectIcon={opt.onClickIcon}
            onClickSubItem={opt.onClickSubItem}
            key={opt.key}
            value={opt}
            meta={{ active: false, input: '' }}
            isMatchedBoldText={uiOptions?.isMatchedBoldText}
            activeSubItem={uiOptions?.activeSubItem}
            setActiveSubItem={setActiveSubItem}
            hideIcons={uiOptions?.hideIcons}
            multiselect={uiOptions?.multiselect}
            iconColumnWidth={uiOptions?.iconColumnWidth}
            intent={opt.intent}
            leftIcon={uiOptions?.leftIcon}
            labelColor={opt?.labelColor}
            isBottomBorder={arr.length - 1 !== index}
            dropdownItemStyle={uiOptions?.dropdownItemStyle}
            checkboxPosition={uiOptions?.checkboxPosition}
            inputValue={uiOptions?.inputValue}
            containerPadding={uiOptions?.containerPadding}
            labelFontFamily={opt?.fontFamily}
            contentCentered={uiOptions?.contentCentered}
          />
        );
      case 'header':
        return (
          <S.DropdownHeaderItem key={`header${index}`}>
            {opt.label}
            {opt.rightIcon}
          </S.DropdownHeaderItem>
        );
      case 'divider':
        return <S.DropdownDividerItem key={`divider${index}`} />;
      default:
        return null;
    }
  };
}
