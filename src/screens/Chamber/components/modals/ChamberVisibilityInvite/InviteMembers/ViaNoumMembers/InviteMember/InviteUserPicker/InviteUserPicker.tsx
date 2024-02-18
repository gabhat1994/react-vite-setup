import { type GlobalSearchEntity } from '@/apollo/generated/types';
import { Dropdown } from '@/components/Dropdown';
import { useBreakpoints } from '@/hooks';
import useDebounce from '@/hooks/useDebounce';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useInviteUsersList from '../../../useInviteUsersList';
import { InviteSelectedUser } from './InviteSelectedUser';
import { InviteUserOptionRenderer } from './InviteUserOptionRenderer';
import { InviteUserSearch } from './InviteUserSearch';
import { Container } from './styles';
import { type INoumUserDropdown } from './types';
import * as S from '../../../../styles';

const buildDropdownOptions = (
  searchResults: GlobalSearchEntity[],
): INoumUserDropdown[] =>
  searchResults.map((entity: GlobalSearchEntity) => ({
    key: entity.user.id || '',
    label: entity.user.name || '',
    type: 'value',
    description: entity.user.title || '',
    value: entity,
    selected: false,
  }));

interface InviteUserPickerProps {
  value: string[];
  onChange(value: string[]): void;
  helperText?: string;
  placeholder?: string;
}

export const InviteUserPicker: React.FC<InviteUserPickerProps> = ({
  value,
  onChange,
  helperText,
  placeholder,
}) => {
  const { t } = useTranslation();
  const { isMobile } = useBreakpoints();

  const containerRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);

  const {
    allCount,
    users: searchResults,
    loading,
    fetchMore,
  } = useInviteUsersList(debouncedSearch);

  const [selectedOptions, setSelectedOptions] = useState<INoumUserDropdown[]>(
    [],
  );

  const selectableOptions: INoumUserDropdown[] = useMemo(
    () =>
      buildDropdownOptions(searchResults || []).filter(
        (option) => !value.includes(option.key),
      ),
    [searchResults, value],
  );

  const fetchOtherUsers = async () => {
    if (searchResults.length < allCount) {
      fetchMore(searchResults.length);
    }
  };

  const onSelectItem = useCallback(
    (option: INoumUserDropdown) => {
      if (value.includes(option.key)) {
        onChange(value.filter((s) => s !== option.key));
        setSelectedOptions(selectedOptions.filter((s) => s.key !== option.key));
      } else {
        onChange([...value, option.key]);
        setSelectedOptions([...selectedOptions, option]);
      }
      setSearch('');
    },
    [value, onChange, selectedOptions],
  );

  const onRemoveItem = (option: INoumUserDropdown) => {
    onChange(value.filter((v) => v !== option.key));
    setSelectedOptions((s) => s.filter((_s) => _s.key !== option.key));
  };

  const inputWidth = containerRef.current?.clientWidth ?? 0;

  return (
    <Container data-testid="invite-users-picker" ref={containerRef}>
      <Dropdown
        hideIcons
        closeOnSelect
        multiselect
        placement="bottom-start"
        options={selectableOptions}
        onInputChange={setSearch}
        onSelectOption={onSelectItem}
        onClose={() => {
          if (isMobile) setSearch('');
        }}
        usePortal
        calRefTop={false}
        isAnimation={false}
        containerWidth={`${inputWidth}px`}
        containerHeight={isMobile ? '100vh' : '250px'}
        isLoading={loading}
        showInternalSearch={isMobile}
        forceHideCloseButton={false}
        optionsRenderer={(options, handleSelectOption, activeItem) => (
          <InviteUserOptionRenderer
            loading={loading}
            hasMore={searchResults.length < allCount}
            options={options}
            multiselect
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
              placeholder: value.length > 0 ? '' : placeholder,
              value: search,
              onChange: (e) => setSearch(e.currentTarget.value),
              onKeyDown: () => {},
            }}
          >
            {selectedOptions.map((user) => (
              <InviteSelectedUser
                key={user.key}
                multiselect
                data={user}
                onRemove={onRemoveItem}
              />
            ))}
          </InviteUserSearch>
        )}
      </Dropdown>
      {helperText && (
        <S.DescriptionWrapper>
          <S.Description
            colorToken="--text-input-neutral-default"
            font="body-s"
          >
            {t(`noumena.chamber_edit.visibility.invite_description`)}
          </S.Description>
        </S.DescriptionWrapper>
      )}
    </Container>
  );
};
