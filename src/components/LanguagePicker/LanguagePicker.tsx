import { useCallback, useMemo, useState } from 'react';
import generate from 'uniqid';

import { Stack } from '@/layout';
import languages from '@/assets/json/languages.json';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';

import useDebounce from '@/hooks/useDebounce';
import { type Language, type LanguagePickerProps, type State } from './type';
import { TSpan } from '../Typography';
import S from './styles';
import { TextField } from '../TextField';

export function LanguagePicker({
  onOptionSelect,
  placement = 'bottom-start',
  containerHeight,
  value: languageValue = '',
  ...textFieldProps
}: LanguagePickerProps) {
  const [state, setState] = useState<State>({
    open: false,
    searchQuery: '',
    filteredOptions: [],
    value: {
      code: 'en-us',
      name: 'English (US)',
      nativeName: 'English (US)',
    },
  });

  const debouncedSearchQuery = useDebounce(state.searchQuery, 1000);

  const value = useMemo(
    () =>
      languageValue
        ? languages.find(
            (lan) =>
              lan.name.toLowerCase() === languageValue.toLowerCase() ||
              lan.nativeName.toLowerCase() === languageValue.toLowerCase(),
          )
        : state.value,
    [state.value, languageValue],
  );

  /* Dropdown options for languages */
  const dropDownOptions: DropdownValueType<Language>[] = useMemo(
    () =>
      languages.map(($language) => ({
        key: generate(),
        label: (
          <Stack>
            <TSpan
              font="input-s"
              colorToken="--text-tablecell-header-neutral-default"
              data-testid="country-options"
            >
              <div style={{ padding: '0 4px' }}>{$language.name}</div>
            </TSpan>
          </Stack>
        ),
        type: 'value',
        value: { ...$language },
      })),
    [],
  );

  const filterDropDownOptions = useCallback(
    (searchQuery: string) =>
      dropDownOptions.filter(({ value: { name } }) =>
        name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [dropDownOptions],
  );

  const handleSearch = useCallback((searchQuery: string) => {
    setState(($state) => ({ ...$state, searchQuery }));
  }, []);

  const handleToggle = useCallback(() => {
    setState(($state) => ({ ...$state, open: !$state.open }));
  }, []);

  const handleClose = useCallback(() => {
    setState(($state) => ({ ...$state, open: !$state.open, searchQuery: '' }));
  }, []);

  const handleOptionSelect = useCallback(
    ({ value: $value }: DropdownValueType<Language, string>) => {
      onOptionSelect($value);
      setState(($state) => ({ ...$state, value: $value }));
    },
    [onOptionSelect],
  );

  const languageOptions = useMemo(
    () =>
      debouncedSearchQuery
        ? filterDropDownOptions(debouncedSearchQuery)
        : dropDownOptions,
    [debouncedSearchQuery, dropDownOptions, filterDropDownOptions],
  );

  return (
    <Stack fullWidth data-testid="language-picker">
      <Dropdown
        containerWidth="443px"
        containerHeight={containerHeight}
        inputValue={state.searchQuery}
        options={languageOptions}
        usePortal
        placement={placement}
        showInternalSearch
        onInputChange={handleSearch}
        onClose={handleClose}
        onOpen={handleToggle}
        onSelectOption={handleOptionSelect}
      >
        {({ inputProps, inputRef, toggle }) => (
          <TextField
            data-testid="country-picker-textfield"
            readOnly={true}
            ref={inputRef}
            {...textFieldProps}
            {...inputProps}
            value={value?.name ?? ''}
            rightIcon={
              <S.RightIcon
                name="chevron_down_m"
                isOpen={state.open}
                size={16}
                onClick={toggle}
                data-testid="language-dropdown-icon"
                color="--icon-input-neutral-default"
              />
            }
          />
        )}
      </Dropdown>
    </Stack>
  );
}
