import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@/components/TextField';
import { Icon } from '@/components/Icon';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import { mergeRefs } from '@/utils/mergeRefs';
import useDebounce from '@/hooks/useDebounce';
import { type TSearchSkill } from './types';
import { ClearIconWrapper } from '../../styles';

export const SearchSkill = ({
  options = [],
  onSelect = () => {},
  placeholder,
  ...rest
}: TSearchSkill) => {
  const { t } = useTranslation();

  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce<string>(search, 500);
  const [searchOptions, setOptions] =
    useState<DropdownValueType<string>[]>(options);

  const onInputChange = (val: string) => {
    setSearch(val);
    setIsOpen(true);
  };

  const clearSelection = useCallback(() => {
    setSearch('');
    searchRef.current?.focus();
  }, [searchRef]);

  useEffect(() => {
    const filteredOptions = options.filter((option) => {
      if (option && option.type === 'value' && option.label) {
        const regex = new RegExp(`\\s*${debouncedSearch.trim()}\\w*`, 'i');
        return String(option.label)?.match(regex);
      }
      return true;
    });
    setOptions(filteredOptions);
  }, [debouncedSearch, options]);

  return (
    <Dropdown
      inputValue={search}
      options={searchOptions}
      onSelectOption={(option) => {
        onSelect(option);
        setIsOpen(false);
      }}
      onInputChange={onInputChange}
      isMatchedBoldText
      hideIcons
      isOpen={!!search && isOpen}
      usePortal={false}
      containerHeight="230px"
      minHeight="0px"
      placement="bottom"
      noSearchOptionsText="No results"
    >
      {({ inputProps, inputRef, toggle }) => (
        <TextField
          {...inputProps}
          {...rest}
          placeholder={placeholder ?? t('noumena.skills_search.placeholder')}
          ref={mergeRefs<HTMLInputElement>(searchRef, inputRef)}
          rightIcon={
            debouncedSearch && (
              <ClearIconWrapper>
                <Icon
                  name="clear_m"
                  size={24}
                  color="--icon-input-brand-primary-default"
                  onClick={() => {
                    clearSelection();
                  }}
                />
              </ClearIconWrapper>
            )
          }
          leftIcon={
            !debouncedSearch && (
              <Icon
                name="search_m"
                size={24}
                color="--icon-input-neutral-default"
              />
            )
          }
          data-testid="input-component"
          value={search}
          onChange={(e) => onInputChange(e.target.value)}
          onClick={debouncedSearch.trim().length > 0 ? toggle : () => {}}
        />
      )}
    </Dropdown>
  );
};
