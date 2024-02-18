import { useCallback, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import { TextField } from '@/components/TextField';
import * as S from './styles';
import { type FontPickerProps, type FontProps } from './types';
import { fontOptions } from './constants';

export const FontPicker = ({
  title,
  isLastItem,
  name,
  selected,
  setFonts,
}: FontPickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [searchOptions, setOptions] = useState<DropdownValueType<FontProps>[]>(
    [],
  );
  const [numberOfItems, setNumberOfItems] = useState(15);

  const optionsWithIcons: DropdownValueType<FontProps>[] = useMemo(
    () =>
      fontOptions.map((option, index) => ({
        ...option,
        rightIcon: (
          <S.FontItemOptionButton
            neutral
            leftIcon={
              <S.OptionIcon selected={option.value.name === selected} />
            }
          />
        ),
        intent: index % 5 !== 0 ? 'default' : 'danger',
        selected: false,
      })),
    [selected],
  );

  const selectedOption = useMemo(
    () => optionsWithIcons.find((_option) => _option.value.name === selected),
    [selected, optionsWithIcons],
  );

  const handleFetchMore = useCallback(
    () => setNumberOfItems(numberOfItems + 15),
    [numberOfItems],
  );

  const options = searchOptions.slice(
    0,
    Math.min(searchOptions.length, numberOfItems),
  );

  useEffect(() => {
    const filteredOptions = optionsWithIcons.filter((option) => {
      if (option && option.type === 'value' && option.value) {
        return String(option.value.name)
          ?.toLowerCase()
          .includes(search.toLocaleLowerCase());
      }
      return true;
    });
    setOptions(filteredOptions);
  }, [optionsWithIcons, search]);

  const onInputChange = (val: string) => {
    setSearch(val);
  };

  const onSelectOption = useCallback(
    (option) => {
      setFonts(name, option.value.name);
      setSearch('');
    },
    [name, setFonts],
  );

  return (
    <S.FontPickerContainer>
      <S.FontTitle
        font="body-l"
        colorToken="--text-tablecell-header-neutral-highlighted"
      >
        {title}
      </S.FontTitle>
      <S.SeparateLine />
      <S.FontPickerWrap>
        <TSpan
          font="footnote-bold"
          colorToken="--text-card-neutral-highlighted"
        >
          {t('noumena.customize.font_family')}
        </TSpan>
        <br />
        <TSpan font="footnote" colorToken="--text-card-neutral-default">
          {t('noumena.customize.font_apply_to_all')}
        </TSpan>
        <S.DropdownContainer>
          <Dropdown
            inputValue={(selectedOption?.label as string) ?? ''}
            options={optionsWithIcons}
          >
            <Dropdown
              inputValue={search || ''}
              options={options}
              placement="bottom-start"
              usePortal={false}
              onInputChange={onInputChange}
              onFetchMore={handleFetchMore}
              padding="0px"
              containerPadding="12.5px 10px 12.5px 0"
              iconColumnWidth={0}
              minHeight="336px"
              containerHeight="336px"
              showInternalSearch
              onOpen={() => setIsOpen(true)}
              onClose={() => {
                setSearch('');
                setIsOpen(false);
              }}
              onSelectOption={onSelectOption}
              noSearchOptionsText={t('noumena.dropdown.no_search_results.text')}
              noSearchOptionsTextAlign="left"
            >
              {({ inputProps, inputRef, toggle }) => (
                <TextField
                  readOnly={true}
                  ref={inputRef}
                  {...inputProps}
                  value={selectedOption?.value.name}
                  spellCheck="false"
                  rightIcon={
                    <S.FontDropdownRightIcon
                      name="chevron_down_m"
                      isOpen={isOpen}
                      size={16}
                      onClick={toggle}
                      data-testid="styledCountryDownArrow"
                    />
                  }
                  rightIconColor="var(--icon-button-brand-primary-default)"
                  isAlwaysFocus={isOpen}
                  inputSize="small"
                />
              )}
            </Dropdown>
          </Dropdown>
        </S.DropdownContainer>
      </S.FontPickerWrap>
      {!isLastItem && <S.SeparateLine width="3px" />}
    </S.FontPickerContainer>
  );
};
