import {
  useRef,
  useState,
  type CSSProperties,
  useMemo,
  useEffect,
  type HTMLAttributes,
  useCallback,
  type ReactNode,
} from 'react';
import { usePopper } from 'react-popper';
import { type Placement } from '@popperjs/core';
import { type WindowDimensions, useWindowDimensions } from '@/hooks';
import { mergeRefs } from '@/utils/mergeRefs';
import { sizes } from '@/constants/devices';

import { BottomSheet, BottomSheetBody } from '@/components/BottomSheet';
import {
  TabbedSectionContainer,
  TabbedSectionTabs,
} from '@/components/TabbedSection';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { Portal } from '@/components/Portal';
import { notEmpty } from '@/utils/notEmpty';
import getNextItem from '../getNextItem';
import {
  type DropdownContentProps,
  type DropdownTargetProps,
  type DropdownValueType,
} from '../types';
import * as S from '../styles';

const RenderInnerDropdownContent: React.FC<{
  showInternalSearch: boolean;
  innerDropdownContent: (contentCentered?: boolean) => ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  windowSize: WindowDimensions;
  isBottomSheet?: boolean;
  forceListFromBottom?: boolean;
  stickyHeader?: ReactNode;
  isRenderFromBottomContentCentered?: boolean;
}> = ({
  showInternalSearch,
  innerDropdownContent,
  isOpen,
  handleClose,
  windowSize,
  isBottomSheet,
  stickyHeader,
  isRenderFromBottomContentCentered,
}) =>
  !showInternalSearch &&
  Boolean(windowSize.width < 768) &&
  isBottomSheet &&
  !isRenderFromBottomContentCentered ? (
    <BottomSheet
      usePortal={false}
      enableCloseButton
      testId="dropdown-BottomSheet"
      open={isOpen}
      onClose={handleClose}
      style={{ padding: 16, zIndex: 'unset' }}
      disableBackdropClick
    >
      <BottomSheetBody>
        {stickyHeader}
        {innerDropdownContent(true)}
      </BottomSheetBody>
    </BottomSheet>
  ) : (
    <>{innerDropdownContent()}</>
  );

export const DropdownContent = <
  T,
  TargetRef extends HTMLElement,
  TabId extends string = string,
  Key extends string = string,
>({
  children,
  options,
  isAnimation,
  activeItem,
  isOpen,
  isMobile,
  disabled,
  padding,
  minHeight,
  usePortal,
  usePopStyle,
  isPopperStyle,
  containerStyle,
  containerWidth,
  searchDisabled,
  containerHeight,
  maxContainerHeight,
  placement = 'auto',
  calRefTop,
  tabProps,
  inputValue,
  searchPlaceholder,
  searchLeftIcon,
  showInternalSearch,
  renderContainerFromBottom,
  stickyHeader,
  stickyFooter,
  innerDropdownContent,
  stickyHeaderOptions,
  stickyFooterOptions,
  closeOnSelect,
  renderCreateNewOption,
  forceHideCloseButton,
  autoFocusInternalSearch,
  onOpen,
  onClose,
  onClear,
  onInputChange,
  setIsOpenState,
  onSelectOption,
  setActiveItem,
  setActiveSubItem,
  forceListFromBottom = false,
  hideLeftIconPlace = false,
  unsetOverflow = false,
  isRenderFromBottomContentCentered = false,
}: DropdownContentProps<T, TargetRef, TabId, Key>) => {
  const windowSize = useWindowDimensions();
  const tabletWidth = parseInt(sizes.TABLET, 10);
  const minimumDropdownWidth = 236;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const targetRef = useRef<TargetRef>(null);

  const [searchValue, setSearchValue] = useState('');
  const [popperElement, setPopperElement] = useState<null | HTMLElement>(null);
  const [activePlacement, setActivePlacement] = useState<Placement>(placement);
  const [referenceElement, setReferenceElement] = useState<null | Element>(
    null,
  );
  const AnimationVariants = {
    closed: {
      height: '0px',
      transition: {
        duration: isAnimation ? 0.3 : 0,
      },
    },
    open: {
      height: containerHeight ?? 'auto',
      transition: {
        duration: isAnimation ? 0.3 : 0,
      },
    },
  };

  const mobileStylesDropdown: CSSProperties = usePortal
    ? {
        width: '100vw',
        maxHeight: '98vh',
        position: 'fixed',
        bottom: renderContainerFromBottom ? '0%' : '',
      }
    : {};

  const refWidth = useMemo(() => {
    const { width = 0 } =
      referenceElement?.parentElement?.getBoundingClientRect() || {};
    if (width <= minimumDropdownWidth) return minimumDropdownWidth;
    if (windowSize.width <= width) return windowSize.width;
    return width;
  }, [referenceElement?.parentElement, windowSize]);

  const refTop = useMemo(() => {
    const { top = 0 } =
      referenceElement?.parentElement?.getBoundingClientRect() || {};
    return top;
  }, [referenceElement?.parentElement]);

  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: placement === 'auto' ? activePlacement : placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    },
  );

  const handleOpen = useCallback(() => {
    if (!disabled) {
      onOpen?.();
      setIsOpenState(true);
    }
  }, [disabled, onOpen, setIsOpenState]);
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
    [closeOnSelect, onClose, setIsOpenState, setActiveItem, setActiveSubItem],
  );

  const handleOnClick = useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [handleClose, handleOpen, isOpen]);

  function isHtmlNode(node: unknown): node is HTMLElement {
    return (
      typeof node === 'object' && notEmpty(node) && node instanceof HTMLElement
    );
  }

  const eventHandler = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (
        !(
          dropdownRef.current?.contains(event.target as Node) ||
          (isHtmlNode(targetRef.current) &&
            targetRef.current.contains(event.target as Node)) ||
          (isHtmlNode(inputSearchRef.current) &&
            inputSearchRef.current.parentElement?.contains(
              event.target as Node,
            )) ||
          inputSearchRef.current?.contains(event.target as Node)
        )
      ) {
        handleClose();
      }
    },
    [handleClose],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;
      const valueOptions = [
        ...(stickyHeaderOptions ?? []),
        ...(options ?? []),
        ...(stickyFooterOptions ?? []),
      ].filter((opt): opt is DropdownValueType<T, Key> => opt.type === 'value');

      switch (key) {
        case 'ArrowUp':
          e.preventDefault();
          setActiveItem(getNextItem(valueOptions, activeItem, 'up'));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setActiveItem(getNextItem(valueOptions, activeItem, 'down'));
          break;
        case 'Enter':
          if (activeItem) {
            onSelectOption?.(activeItem);
            handleClose('select');
          } else if (options!.length > 0 && options![0].type === 'value') {
            onSelectOption?.(options![0]);
            handleClose('select');
          } else {
            handleClose('user');
          }
          break;
        case 'ArrowRight':
          if (activeItem) {
            e.preventDefault();
          }
          break;
      }
    },
    [
      activeItem,
      options,
      stickyFooterOptions,
      stickyHeaderOptions,
      handleClose,
      onSelectOption,
      setActiveItem,
    ],
  );

  const targetProps: DropdownTargetProps<TargetRef> = {
    index: 1,
    active: !!isOpen,
    targetProps: {
      onClick: handleOnClick,
      ...styles.reference,
      ...attributes.reference,
    } as HTMLAttributes<HTMLElement>,
    targetRef: mergeRefs<TargetRef>(setReferenceElement, targetRef),
    inputRef: mergeRefs<HTMLInputElement>(setReferenceElement, inputSearchRef),
    inputProps: {
      disabled: searchDisabled,
      value: inputValue,
      onFocus: handleOpen,
      onChange: (event) => onInputChange?.(event.target.value),
      placeholder: searchPlaceholder,
      onKeyDown: handleKeyDown,
    },
    handleOnClear: onClear,
    toggle: handleOnClick,
  };

  useEffect(() => {
    document.addEventListener('mouseup', eventHandler);
    return () => {
      document.removeEventListener('mouseup', eventHandler);
    };
  }, [eventHandler]);

  useEffect(() => {
    update?.();
  }, [update, options]);

  useEffect(() => {
    if (!forceListFromBottom && windowSize.height / 2 < refTop) {
      setActivePlacement('top-start');
    } else {
      setActivePlacement('bottom-start');
    }
  }, [forceListFromBottom, refTop, windowSize]);

  useEffect(() => {
    setSearchValue(inputValue || '');
  }, [inputValue]);

  useEffect(() => {
    function handler(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleClose();
      }
    }

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleClose]);

  const dropdownContent = (
    <S.DropdownContainer
      variants={AnimationVariants}
      initial="closed"
      animate="open"
      padding={padding}
      onKeyDownCapture={handleKeyDown}
      isMobile={Boolean(windowSize.width < 768)}
      data-testid="dropdown-container"
      ref={mergeRefs<HTMLDivElement>(setPopperElement, dropdownRef)}
      style={{
        ...(isMobile
          ? mobileStylesDropdown
          : usePopStyle
          ? styles.popper
          : windowSize.width >= tabletWidth || isPopperStyle
          ? styles.popper
          : mobileStylesDropdown),
        ...containerStyle,
      }}
      containerWidth={containerWidth || `${refWidth}px`}
      containerHeight={containerHeight}
      maxContainerHeight={maxContainerHeight}
      minHeight={minHeight}
      refTop={calRefTop ? refTop : 0}
      isPositionedTop={!forceListFromBottom && windowSize.height / 1.5 < refTop}
      {...attributes.popper}
      unsetOverflow={unsetOverflow}
    >
      {stickyHeader}
      {showInternalSearch && (
        <>
          {windowSize.width < 768 && !forceHideCloseButton && (
            <S.CloseDropDownIcon onClick={() => handleClose()}>
              <Icon
                name="close_m"
                size={24}
                color="--icon-button-neutral-default"
              />
            </S.CloseDropDownIcon>
          )}
          <S.DropdownInternalSearchInputContainer>
            <TextField
              autoFocus={autoFocusInternalSearch}
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
                onInputChange?.(event.target.value);
              }}
              leftIcon={
                searchLeftIcon || (
                  <Icon
                    name="search_m"
                    color="--icon-input-neutral-default"
                    size={16}
                  />
                )
              }
              hideLeftIconPlace={hideLeftIconPlace}
              rightIcon={
                searchValue !== '' ? (
                  <Icon
                    name="clear_m"
                    size={24}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSearchValue('');
                      onInputChange?.('');
                    }}
                    color="--icon-input-brand-primary-default"
                  />
                ) : undefined
              }
              inputSize="small"
              ref={inputSearchRef}
              label={searchPlaceholder}
              rightIconColor="var(--icon-input-brand-primary-default)"
            />
          </S.DropdownInternalSearchInputContainer>
        </>
      )}
      {tabProps && (
        <TabbedSectionContainer>
          <TabbedSectionTabs
            tabsWrapperStyles={{
              padding: '0 8px',
              justifyContent: 'flex-start',
              gap: 5,
            }}
            tabs={tabProps.tabs}
            activeTab={tabProps.activeTabId}
            onTabChange={tabProps.onTabChange}
          />
        </TabbedSectionContainer>
      )}
      <RenderInnerDropdownContent
        handleClose={handleClose}
        innerDropdownContent={innerDropdownContent}
        stickyHeader={stickyHeader}
        isOpen={!!isOpen}
        showInternalSearch={!!showInternalSearch}
        windowSize={windowSize}
        isBottomSheet={renderContainerFromBottom}
        forceListFromBottom={forceListFromBottom}
        isRenderFromBottomContentCentered={isRenderFromBottomContentCentered}
      />
      {stickyFooter}
      {renderCreateNewOption && (
        <>
          <S.DropdownDividerItem />
          {renderCreateNewOption}
        </>
      )}
    </S.DropdownContainer>
  );

  return (
    <>
      {typeof children === 'function' ? children(targetProps) : children}
      {isOpen &&
        (!forceListFromBottom && usePortal ? (
          <Portal>{dropdownContent}</Portal>
        ) : (
          dropdownContent
        ))}
    </>
  );
};
