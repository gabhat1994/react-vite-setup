import { useState, useEffect, useCallback } from 'react';
import generate from 'uniqid';
import { TextField } from '@/components/TextField';
import { Icon } from '@/components/Icon';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import { useHomeNoumAboutMeGetLocationHelper } from '../../hooks/useHomeNoumAboutMeGetLocationHelper';
import { type TSearchSelect } from './types';

export const SearchSelectAPI = ({
  options = [],
  onSelect = () => {},
  onClear = () => {},
  showValue = '',
  error,
  helperText,
  setTextFieldValue,
  register,
  setSuggestedOptions,
  ...rest
}: TSearchSelect) => {
  const [search, setSearch] = useState<string>(showValue);
  const [searchFlag, setSearchFlag] = useState<Boolean>(true);
  const [searchOptions, setOptions] =
    useState<DropdownValueType<string>[]>(options);
  const isIPhone = !!window?.navigator.userAgent.match(/iPhone/i);

  const [isListVisible, setIsListVisible] = useState(false);
  const onInputChange = (val: string) => {
    setSearchFlag(false);
    callAPI();
    setSearch(val);
    if (setTextFieldValue) {
      setTextFieldValue(val);
    }
  };
  const clearSelection = () => {
    setSearch('');
    onClear();
  };
  const { locationHelper, locationsLoading } =
    useHomeNoumAboutMeGetLocationHelper();

  const callAPI = useCallback(async () => {
    if (search === '') {
      return;
    }
    const data = await locationHelper(search);
    const filteredOptions: DropdownValueType<string>[] = data.map((option) => ({
      key: generate(),
      type: 'value',
      label: option?.description || '',
      value: option?.description || '',
      fontFamily: 'var(--font-body-medium-bold-font)',
    }));
    setOptions(filteredOptions);
    setSuggestedOptions?.(filteredOptions);
  }, [locationHelper, search, setSuggestedOptions]);

  useEffect(() => {
    if (searchFlag) {
      setSearch(showValue);
      callAPI();
    }
  }, [callAPI, searchFlag, showValue]);

  return (
    <Dropdown
      inputValue={search}
      options={searchOptions}
      onSelectOption={(option) => {
        setSearch(option.label as string);
        onSelect(option);
        setIsListVisible(false);
      }}
      onInputChange={onInputChange}
      hideIcons
      isLoading={locationsLoading}
      isOpen={isListVisible && search !== ''}
      usePortal={false}
      placement="top"
      calRefTop={true}
      usePopStyle={isIPhone}
    >
      {({ inputProps, inputRef }) => (
        <TextField
          {...inputProps}
          {...rest}
          ref={inputRef}
          inputSize="normal"
          rightIcon={
            isListVisible && search !== ''
              ? search.trim() && (
                  <Icon
                    name="clear_m"
                    color="--border-input-brand-primary-default"
                    size={16}
                    onClick={clearSelection}
                  />
                )
              : null
          }
          data-testid="input-component"
          value={search}
          onChange={(e) => onInputChange(e.target.value)}
          error={error}
          helperText={helperText}
          onFocus={() => {
            setIsListVisible(true);
            onInputChange(search);
          }}
        />
      )}
    </Dropdown>
  );
};
