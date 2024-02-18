import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ForwardedRef,
} from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown } from '@/components/Dropdown';

import { DeviceTypeEnum, useDeviceType } from '@/hooks';

import { type UserBasicOutputFragment } from '@/apollo/graphql/fragments';
import { ConversationViewContext } from '../../contexts/ConversationViewContext';
import { ConversationType } from '../../types';
import { MessageSelectedUser } from './MessageSelectedUser';
import { MessageUserOptionRenderer } from './MessageUserOptionRenderer';
import { MessageUserSearch } from './MessageUserSearch';
import { Container, UserSearchDropDownInfobox } from './styles';
import {
  type IUserDropdown,
  type MessageUserPickerForwardRefProps,
  type MessageUserPickerProps,
} from './types';
import { buildDropDownData } from './utils';

export const MessageUserPicker = forwardRef(
  (
    {
      data,
      initialValue,
      onSelectUsers,
      initLoading,
      loading,
      hasMore,
      onFetchMore,
      CustomOptionsContent,
      onSetSearch,
      multiselect = true,
    }: MessageUserPickerProps,
    ref: ForwardedRef<MessageUserPickerForwardRefProps>,
  ) => {
    const { t } = useTranslation();
    const { conversationType, setIsNewConversation } = useContext(
      ConversationViewContext,
    );
    const deviceType = useDeviceType();
    const isMobile = useMemo(
      () => deviceType === DeviceTypeEnum.MOBILE,
      [deviceType],
    );
    const containerRef = useRef<HTMLDivElement>(null);
    const height = isMobile
      ? `calc(100% - ${(containerRef.current?.clientHeight || 0) + 180}px)`
      : '250px';
    const [width, setWidth] = useState<string>();
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    useLayoutEffect(() => {
      if (openDropdown) {
        setWidth(
          isMobile ? '100vw' : `${containerRef.current?.scrollWidth ?? 0}px`,
        );
      }
    }, [isMobile, openDropdown]);
    const [selectedUsers, setSelectedUsers] = useState<
      UserBasicOutputFragment[] | undefined
    >();
    const selectedUsersIds = useMemo(
      () => selectedUsers?.map((user) => user._id),
      [selectedUsers],
    );
    const [search, setSearch] = useState<string>('');
    useEffect(() => onSetSearch?.(search), [onSetSearch, search]);
    useEffect(() => {
      // Dropdown component trigger onClose on any document click event
      // This is for initial opening state
      const timeOut = setTimeout(() => {
        setOpenDropdown(true);
      }, 200);

      return () => {
        clearTimeout(timeOut);
      };
    }, []);

    useEffect(
      () => () => {
        setOpenDropdown(false);
      },
      [],
    );

    useEffect(() => {
      if (selectedUsers === undefined) {
        setSelectedUsers(initialValue || []);
      }
    }, [initialValue, selectedUsers]);

    useEffect(() => {
      if (selectedUsers) {
        onSelectUsers(selectedUsers);
      }
    }, [onSelectUsers, selectedUsers]);

    const closeOnSelect = useMemo(() => {
      if (isMobile) {
        return multiselect ? !!search : true;
      }

      return true;
    }, [multiselect, search, isMobile]);

    const allOptions = useMemo(() => buildDropDownData(data), [data]);

    const selectableOptions: IUserDropdown[] = useMemo(() => {
      const availableOptions: IUserDropdown[] = [];

      allOptions.forEach((option) => {
        if (isMobile) {
          // In mobile, we show all items with selected status
          availableOptions.push({
            ...option,
            selected: (selectedUsersIds || []).includes(option.key),
          });
          // In web/tablet, we only show unselected items
        } else if (!(selectedUsersIds || []).includes(option.key)) {
          availableOptions.push({
            ...option,
            selected: false,
          });
        }
      });

      return availableOptions;
    }, [allOptions, isMobile, selectedUsersIds]);

    const selectedOptions = useMemo(
      () => buildDropDownData(selectedUsers || []),
      [selectedUsers],
    );

    const isGlobalMessageScreen = useMemo(
      () =>
        [
          ConversationType.GLOBAL_ALL,
          ConversationType.GLOBAL_DIRECT,
          ConversationType.GLOBAL_NOUM,
        ].includes(conversationType),
      [conversationType],
    );

    const onCancel = useCallback(() => {
      setSearch('');
      setSelectedUsers([]);
      setOpenDropdown(false);
      setIsNewConversation(false);
    }, [setIsNewConversation]);

    const onChange = useCallback((e: { target: { value: string } }) => {
      const { value } = e.target;
      setOpenDropdown(true);
      setSearch(value);
    }, []);

    const onSelect = useCallback(
      (option: IUserDropdown) => {
        const mSelectedUsers: UserBasicOutputFragment[] = selectedUsers || [];

        if (multiselect) {
          if (mSelectedUsers.map((u) => u._id).includes(option.key)) {
            setSelectedUsers(
              mSelectedUsers.filter((s) => s._id !== option.key),
            );
          } else {
            setSelectedUsers([...mSelectedUsers, option.value]);
          }
        } else {
          setSelectedUsers([option.value]);
        }
        setSearch('');
      },
      [multiselect, selectedUsers],
    );

    const onUnSelect = useCallback((k: UserBasicOutputFragment) => {
      setSelectedUsers((s) => (s || []).filter((_s) => _s._id !== k._id));
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        cancel() {
          onCancel();
        },
      }),
      [onCancel],
    );

    return (
      <Container data-testid="users-picker" ref={containerRef}>
        <Dropdown
          hideIcons
          isLoading={initLoading}
          isOpen={openDropdown}
          onOpen={() => setOpenDropdown(true)}
          onClose={() => setOpenDropdown(false)}
          closeOnSelect={closeOnSelect}
          multiselect={multiselect}
          placement="bottom-start"
          options={selectableOptions}
          onSelectOption={onSelect}
          usePortal={false}
          isAnimation={false}
          usePopStyle={true}
          containerWidth={width}
          containerStyle={{ maxHeight: height }}
          noAvailableOptions={!allOptions || allOptions.length === 0}
          noAvailableOptionsText={t('noumena.dropdown.no_users_searched.text')}
          noSearchOptionsText={t('noumena.dropdown.no_search_results.text')}
          optionsRenderer={(options, handleSelectOption, activeItem) =>
            CustomOptionsContent || (
              <>
                {options.length && isGlobalMessageScreen ? (
                  <UserSearchDropDownInfobox
                    colorToken="--text-body-neutral-default"
                    font="footnote"
                  >
                    Create a direct conversation. To create a Noum conversation,
                    visit the Noum Page.
                  </UserSearchDropDownInfobox>
                ) : null}
                <MessageUserOptionRenderer
                  loading={loading}
                  hasMore={hasMore}
                  options={options}
                  multiselect={multiselect}
                  activeItem={activeItem}
                  onSelect={handleSelectOption}
                  onFetchMore={onFetchMore}
                />
              </>
            )
          }
        >
          {({ inputProps, inputRef }) => (
            <MessageUserSearch
              ref={inputRef}
              inputProps={{
                ...inputProps,
                autoFocus: true,
                placeholder: selectedUsers?.length
                  ? ''
                  : t('noumena.message.user_select_placeholder'),
                value: search,
                onChange,
              }}
              hasSelectedOption={
                Boolean(selectedUsers?.length || search) || false
              }
              onCancel={onCancel}
            >
              {selectedOptions.map((s) => (
                <MessageSelectedUser
                  key={s.key}
                  multiselect={true}
                  data={s}
                  onRemove={onUnSelect}
                />
              ))}
            </MessageUserSearch>
          )}
        </Dropdown>
      </Container>
    );
  },
);
