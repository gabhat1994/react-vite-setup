import { useMemo, useCallback, useRef, useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useBreakpoints } from '@/hooks';
import { Dropdown } from '@/components/Dropdown';
import { useUsersPicker } from '@/features/events/hooks';
import { ConnectionPermissionType } from '@/apollo/generated/types';

import {
  type UsersSearchSelectorProps,
  type UserSearchInputProps,
} from './types';
import { UsersSearchSelectorWrapper, UserOptionContainer } from './styles';
import type { IUserDropdown } from '../../types/context';
import { UserOptionRenderer } from './UserOptionRenderer';

export const UsersSearchSelector = ({
  emptyText,
  chamberId,
  initialOpen,
  searchPlaceholder,
  initialData = [],
  dropdownProps,
  onChangeSelectedUsers,
  onFinish,
  onlyConnected,
  onlyFavorites,
  multiselect = true,
  renderSearch,
  members,
  children,
}: UsersSearchSelectorProps) => {
  const { t } = useTranslation();
  const { isMobile } = useBreakpoints();
  const [width, setWidth] = useState<string>();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string | undefined>();

  const containerRef = useRef<HTMLDivElement>(null);

  const {
    selectableOptions,
    selectedOptions,
    noOptions,
    loading,
    fetchMoreStatus,
    onFetchMore,
    onSelectUser,
    onUnSelectUser,
    onSave,
  } = useUsersPicker({
    filter: {
      ...(onlyFavorites
        ? { connectionType: ConnectionPermissionType.Favorite }
        : {}),
    },
    chamberId,
    isMobile,
    isOpened: true,
    searchText,
    multiselect,
    initialData,
    onlyConnected,
    onlyFavorites,
    fetchAllUsers: !onlyConnected,
    onChangeSelectedUsers: (users) => onChangeSelectedUsers?.(users),
    excludeCurrentUser: true,
  });

  useLayoutEffect(() => {
    setWidth(isMobile ? '100%' : `${containerRef.current?.scrollWidth ?? 0}px`);
  }, [isMobile]);

  const onChangeSearch = useCallback((e: { target: { value: string } }) => {
    setSearchText(e.target.value);
  }, []);

  const onClose = useCallback(
    (shouldSave: boolean) => {
      if (shouldSave) {
        onSave();
      }
      onFinish?.();
      setSearchText(undefined);
      setOpenDropdown(false);
    },
    [onSave, onFinish],
  );

  const searchInputProps: UserSearchInputProps = useMemo(
    () => ({
      inputProps: {
        autoFocus: Boolean(initialOpen),
        placeholder: selectedOptions?.length ? '' : searchPlaceholder,
        value: searchText || '',
        onChange: onChangeSearch,
      },
      hasSelectedOption:
        Boolean(selectedOptions?.length || searchText) || false,
      multiselect,
      isOpened: openDropdown,
      selectedOptions,
      onUnSelectUser,
      onClose,
    }),
    [
      initialOpen,
      multiselect,
      onChangeSearch,
      onClose,
      onUnSelectUser,
      openDropdown,
      searchPlaceholder,
      searchText,
      selectedOptions,
    ],
  );

  const noResultFoundText =
    emptyText ||
    (onlyConnected
      ? t('noumena.event.user_picker.no_connect_user_found')
      : t('noumena.event.modal.no_search_result'));

  return (
    <UsersSearchSelectorWrapper
      data-testid="users-search-selector"
      ref={containerRef}
    >
      <Dropdown
        hideIcons
        data-testid="user-search-selector"
        usePortal={dropdownProps.usePortal}
        isOpen={openDropdown}
        isLoading={loading}
        minHeight="330px"
        maxContainerHeight="90%"
        onClose={() => setOpenDropdown(false)}
        onOpen={() => setOpenDropdown(true)}
        multiselect={multiselect}
        placement={dropdownProps.placement}
        options={selectableOptions}
        onSelectOption={(option: IUserDropdown) => {
          onSelectUser(option, false);
          setSearchText('');
        }}
        isAnimation={false}
        containerWidth={width}
        containerStyle={{ maxHeight: isMobile ? 'unset' : '300px' }}
        noAvailableOptions={noOptions}
        noAvailableOptionsText={noResultFoundText}
        onFetchMore={onFetchMore}
        optionsRenderer={(options, handleSelectOption, activeItem) => (
          <UserOptionContainer
            hasContent={!!selectableOptions.length}
            maxHeight="80%"
            vertical
            fullWidth
            isMobile={isMobile}
          >
            <UserOptionRenderer
              fetchMoreStatus={fetchMoreStatus}
              options={options}
              onlyFavorites={onlyFavorites}
              multiselect={multiselect}
              activeItem={activeItem}
              onSelect={handleSelectOption}
              onFetchMore={onFetchMore}
              members={members}
              cohosts={initialData}
            />
          </UserOptionContainer>
        )}
      >
        {({ inputProps, inputRef }) => (
          <>
            {renderSearch({
              ...searchInputProps,
              inputProps: {
                ...inputProps,
                ...searchInputProps.inputProps,
              },
              inputRef,
            })}
          </>
        )}
      </Dropdown>
      {children && children({ selectedOptions, onClose })}
    </UsersSearchSelectorWrapper>
  );
};
