import { useTranslation } from 'react-i18next';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useDebounce from '@/hooks/useDebounce';
import { Dropdown } from '@/components/Dropdown';
import { type GlobalSearchEntity } from '@/apollo/generated/types';
import { useBreakpoints, useToast } from '@/hooks';
import { Spacer } from '@/layout';
import { TextArea } from '@/components/TextArea';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useSendMultipleConnectionInviteMutation } from '@/apollo/graphql';
import { InviteUserSearch } from './InviteUserSearch';
import { type INoumUserDropdown, type InviteUserPickerProps } from './types';
import { InviteUserOptionRenderer } from './InviteUserOptionRenderer';
import { InviteSelectedUser } from './InviteSelectedUser';
import { Container, InviteButton } from './styles';
import useInviteUsersList from '../../useInviteUsersList';
import * as S from '../../../styles';

const buildDropDownData = (data: GlobalSearchEntity[]): INoumUserDropdown[] =>
  data.map((datum: GlobalSearchEntity) => ({
    key: datum.id,
    label: datum.user.name || '',
    type: 'value',
    description: datum.user.title || '',
    value: datum,
  }));

export const InviteUserPicker: React.FC<InviteUserPickerProps> = ({
  handleInvite,
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const {
    isMobile,
    windowDimensions: { width: windowWidth },
  } = useBreakpoints();

  const containerRef = useRef<HTMLDivElement>(null);
  const { space } = useNoumContext();
  const spaceId = space?._id || '';

  const [nonMembers, setNonMembers] = useState<INoumUserDropdown[]>([]);
  const [selected, setSelected] = useState<string[] | undefined>();
  const [search, setSearch] = useState<string>('');
  const [width, setWidth] = useState<number>(0);
  const [multiselect] = useState<boolean>(true);
  const [connectionMsg, setConnectionMsg] = useState<string>('');

  const debouncedSearch = useDebounce<string>(search, 500);
  const {
    allCount,
    users: searchedUsers,
    loading: loadingUsersList,
    fetchMore,
  } = useInviteUsersList(debouncedSearch);
  const [sendMultipleConnectionInviteMutation, { loading: loadingInvite }] =
    useSendMultipleConnectionInviteMutation();
  const [selectedOptions, setSelectedOptions] = useState<INoumUserDropdown[]>(
    [],
  );
  const [displayedNoumUsers, setDisplayedNoumUsers] = useState(
    searchedUsers || [],
  );

  const loading = loadingUsersList || loadingInvite;

  useEffect(() => {
    setDisplayedNoumUsers(searchedUsers || []);
  }, [searchedUsers]);

  const isSelected = useMemo(
    () => selected?.length || nonMembers.length,
    [selected, nonMembers],
  );

  const allOptions: INoumUserDropdown[] = useMemo(
    () => buildDropDownData(displayedNoumUsers || []),
    [displayedNoumUsers],
  );

  const selectableOptions: INoumUserDropdown[] = useMemo(() => {
    const availableOptions: INoumUserDropdown[] = [];

    allOptions.forEach((option) => {
      if (!(selected || []).includes(String(option.key))) {
        availableOptions.push({
          ...option,
          selected: false,
        });
      }
    });

    return availableOptions;
  }, [allOptions, selected]);

  const fetchOtherUsers = useCallback(async () => {
    if (displayedNoumUsers.length < allCount) {
      const otherUsers = await fetchMore(displayedNoumUsers.length);
      const allUsers = displayedNoumUsers.concat(
        otherUsers.data.globalSearch.data,
      );
      setDisplayedNoumUsers(allUsers);
    }
  }, [displayedNoumUsers, allCount, fetchMore]);

  const onChange = useCallback((e: { target: { value: string } }) => {
    const { value } = e.target;
    setSearch(value);
  }, []);

  const onSelect = useCallback(
    (option: INoumUserDropdown) => {
      const selectedIds: string[] = selected || [];

      if (multiselect) {
        if (selectedIds.includes(option.key)) {
          setSelected(selectedIds.filter((s) => s !== option.key));
          setSelectedOptions(
            selectedOptions.filter((s) => s.key !== option.key),
          );
        } else {
          setSelected([...selectedIds, option.key]);
          setSelectedOptions([...selectedOptions, option]);
        }
      } else {
        setSelected([option.key]);
        setSelectedOptions([option]);
      }
      setSearch('');
    },
    [multiselect, selected, selectedOptions],
  );

  const onUnSelect = useCallback((k: string) => {
    setSelected((s) => (s || []).filter((_s) => _s !== k));
    setSelectedOptions((s) => (s || []).filter((_s) => _s.key !== k));
    setNonMembers((m) => (m || []).filter((_m) => _m.key !== k));
  }, []);

  const onHandleInvite = useCallback(async () => {
    const idArray = selectedOptions.map((option) => option.value.id);
    try {
      await sendMultipleConnectionInviteMutation({
        variables: {
          message: connectionMsg.trim(),
          ownSpaceId: spaceId,
          invitedSpaceIds: idArray,
        },
      });
      handleInvite();
      addToast(
        'success',
        'icon',
        `${t('noumena.chamber_invite_sent.success_messages')}`,
      );
      setConnectionMsg('');
    } catch (e) {
      let message = 'Unknown';
      if (e instanceof Error) {
        message = e.message;
      }
      const toastErrorMessage = message.includes('not published')
        ? `${t('noumena.chamber_invite_sent.error_message.not_published')}`
        : `${t('noumena.toast_error.text')}: ${message}`;
      addToast('error', 'none', toastErrorMessage);
    }
    setSelectedOptions([]);
    setSelected([]);
  }, [
    selectedOptions,
    sendMultipleConnectionInviteMutation,
    connectionMsg,
    spaceId,
    handleInvite,
    addToast,
    t,
  ]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.clientWidth);
    }
  }, [containerRef, windowWidth]);

  const handleClose = useCallback(() => {
    if (isMobile) setSearch('');
  }, [isMobile]);

  return (
    <>
      <S.SettingWrapper>
        <S.DropdownWrapper fullWidth>
          <Container data-testid="invite-users-picker" ref={containerRef}>
            <Dropdown
              hideIcons
              closeOnSelect
              multiselect={multiselect}
              placement="bottom-start"
              options={selectableOptions}
              onInputChange={(val) => setSearch(val)}
              onSelectOption={onSelect}
              onClose={handleClose}
              usePortal
              calRefTop={false}
              isAnimation={false}
              containerWidth={`${width}px`}
              containerHeight={isMobile ? '100vh' : '250px'}
              isLoading={loading}
              showInternalSearch={isMobile}
              forceHideCloseButton={false}
              optionsRenderer={(options, handleSelectOption, activeItem) => (
                <InviteUserOptionRenderer
                  loading={loading}
                  hasMore={displayedNoumUsers.length < allCount}
                  options={options}
                  multiselect={multiselect}
                  activeItem={activeItem}
                  onSelect={handleSelectOption}
                  onFetchMore={fetchOtherUsers}
                />
              )}
            >
              {({ inputProps, inputRef }) => (
                <InviteUserSearch
                  ref={inputRef}
                  inputProps={{
                    ...inputProps,
                    placeholder: isSelected
                      ? ''
                      : t('noumena.chamber_edit.visibility.invite_placeholder'),
                    value: search,
                    onChange,
                    onKeyDown: () => {},
                  }}
                >
                  {[...selectedOptions, ...nonMembers].map((user) => (
                    <InviteSelectedUser
                      key={user.key}
                      multiselect={multiselect}
                      data={user}
                      onRemove={onUnSelect}
                    />
                  ))}
                </InviteUserSearch>
              )}
            </Dropdown>
          </Container>
          <S.DescriptionWrapper>
            <S.Description
              colorToken="--text-input-neutral-default"
              font="body-s"
            >
              {t(`noumena.chamber_edit.visibility.invite_description`)}
            </S.Description>
          </S.DescriptionWrapper>
        </S.DropdownWrapper>
        <InviteButton
          primary
          size="large"
          disabled={!isSelected}
          onClick={onHandleInvite}
          loading={loadingInvite}
        >
          {t(`noumena.chamber_edit.visibility.invite`)}
        </InviteButton>
      </S.SettingWrapper>
      {isSelected > 0 && (
        <>
          <Spacer height={16} />
          <TextArea
            label={t(
              'noumena.chamber_edit.visibility.invite_message.input_placeholder',
            )}
            maxLength={200}
            value={connectionMsg}
            onChange={(e) =>
              setConnectionMsg(e.target.value.trimStart().slice(0, 200))
            }
            autoResize
          />
        </>
      )}
    </>
  );
};
