import { type FC, useCallback, useEffect, useState } from 'react';
import generate from 'uniqid';
import { t } from 'i18next';
import { Stack } from '@/layout';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { Flag } from '@/components/Flag';
import countries from '@/assets/json/countries.json';
import { type Country } from './types';
import { CountryCodeRightIcon, StyledCountryWrapper } from './styles';

const optionsWithIcons: DropdownValueType<Country>[] = countries.map(
  (country) => ({
    key: generate(),
    label: (
      <Stack>
        <TSpan
          font="input-s"
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          +{country.dialCode}
        </TSpan>
        <TSpan
          font="input-s"
          colorToken="--text-tablecell-header-neutral-default"
        >
          <StyledCountryWrapper>
            <div style={{ padding: '0 4px' }}>·</div>
            <div style={{ padding: '0 4px' }}>{country.name}</div>
          </StyledCountryWrapper>
        </TSpan>
      </Stack>
    ),
    type: 'value',
    value: { ...country },
    icon: <Flag flag={`flag_${country.iso2}` as keyof typeof Flag} size={24} />,
  }),
);

type CountryCodePickerProps = {
  onCountryCodeChange: (value: string | undefined) => void;
  selectedCountryCode?: string;
  disabled?: boolean;
};

export const CountryCodePicker: FC<CountryCodePickerProps> = ({
  onCountryCodeChange,
  selectedCountryCode,
  disabled,
}) => {
  const [searchOptions, setOptions] = useState<DropdownValueType<Country>[]>(
    [],
  );
  const [numberOfItems, setNumberOfItems] = useState(15);
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry = countries.find(
    (country) => country.iso2 === selectedCountryCode?.toLowerCase(),
  );
  const [selected, setSelected] = useState<Country | undefined>({
    name: 'United States',
    dialCode: '1',
    iso2: 'us',
  });
  useEffect(() => {
    if (selectedCountryCode) {
      setSelected(selectedCountry);
    }
  }, [selectedCountry, setSelected, selectedCountryCode]);

  const [selectedOption, setSelectedOption] =
    useState<DropdownValueType<Country>>();
  const [search, setSearch] = useState<string>('');

  const onInputChange = (val: string) => {
    setSearch(val);
  };

  useEffect(() => {
    const filteredOptions = optionsWithIcons.filter((option) => {
      if (option && option.type === 'value' && option.value) {
        if (search.startsWith('+')) {
          if (search.length === 1) return true;
          return String(option.value.dialCode)
            ?.toLowerCase()
            .startsWith(`${parseInt(search.trim(), 10)}`);
        }

        return (
          String(option.value.name)
            ?.toLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          String(option.value.dialCode)
            ?.toLowerCase()
            .includes(search.toLocaleLowerCase())
        );
      }
      return true;
    });
    setOptions(filteredOptions);
  }, [search]);

  useEffect(() => {
    const option = optionsWithIcons.find(
      (_option) =>
        _option.value.dialCode === selected?.dialCode &&
        _option.value.iso2 === selected.iso2,
    );
    setSelectedOption(option);
    onCountryCodeChange(option?.value.dialCode);
  }, [onCountryCodeChange, selected]);

  const handleFetchMore = useCallback(
    () => setNumberOfItems(numberOfItems + 15),
    [numberOfItems],
  );

  const options = searchOptions.slice(
    0,
    Math.min(searchOptions.length, numberOfItems),
  );

  return (
    <Stack maxWidth={125} fullWidth data-testid="countryCodePicker">
      <Dropdown
        containerWidth="343px"
        inputValue={search || ''}
        options={options}
        placement="bottom-start"
        onSelectOption={(option) => {
          setSelected(option.value);
          setSearch('');
        }}
        showInternalSearch
        onInputChange={onInputChange}
        onFetchMore={handleFetchMore}
        onClose={() => {
          setSearch('');
          setIsOpen(false);
        }}
        onOpen={() => setIsOpen(true)}
        // minHeight="200px"
        disabled={disabled}
        noSearchOptionsText={t('noumena.dropdown.no_search_results.text')}
        noSearchOptionsTextAlign="left"
      >
        {({ inputProps, inputRef, toggle }) => (
          <TextField
            readOnly={true}
            ref={inputRef}
            {...inputProps}
            value={`+${selectedOption?.value.dialCode as string}` ?? ''}
            isAlwaysFocus={isOpen}
            rightIcon={
              <CountryCodeRightIcon
                name="chevron_down_m"
                isOpen={isOpen}
                size={16}
                onClick={toggle}
                data-testid="styledCountryDownArrow"
                color="--icon-input-neutral-default"
              />
            }
            leftIcon={
              <Flag
                flag={`flag_${selectedOption?.value.iso2}` as keyof typeof Flag}
                size={24}
                onClick={toggle}
              />
            }
          />
        )}
      </Dropdown>
    </Stack>
  );
};

export default CountryCodePicker;
