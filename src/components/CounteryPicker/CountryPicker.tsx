import { type FC, useCallback, useEffect, useState } from 'react';
import { type Placement } from '@popperjs/core';
import generate from 'uniqid';
import { Stack } from '@/layout';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import countries from '@/assets/json/countries.json';
import { type Country } from './types';
import { CountryRightIcon } from './styles';
import { type ITextField } from '../TextField/types';
import { Flag } from '../Flag';
import { type FlagProps } from '../Flag/Flag';

const genericCountryOptions: DropdownValueType<Country>[] = countries.map(
  (country) => ({
    key: generate(),
    label: (
      <Stack>
        <TSpan
          font="input-s"
          colorToken="--text-tablecell-header-neutral-default"
          data-testid="country-options"
        >
          <div style={{ padding: '0 4px' }}>{country.name}</div>
        </TSpan>
      </Stack>
    ),
    type: 'value',
    value: { ...country },
    icon: <Flag flag={`flag_${country.iso2}` as FlagProps['flag']} size={14} />,
  }),
);

type CountryPickerProps = {
  options?: DropdownValueType<Country>[];
  onCountryCodeChange: (value: string | undefined, code?: string) => void;
  value?: string;
  disabled?: boolean;
  placement?: Placement;
  containerHeight?: string;
} & Pick<ITextField, 'helperText' | 'error' | 'inputSize' | 'label'>;

const CountryPicker: FC<CountryPickerProps> = ({
  options = genericCountryOptions,
  onCountryCodeChange,
  value,
  disabled,
  containerHeight,
  placement = 'bottom-start',
  ...textFieldProps
}) => {
  const [searchOptions, setOptions] = useState<DropdownValueType<Country>[]>(
    [],
  );
  const [numberOfItems, setNumberOfItems] = useState(15);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Country>({
    name: '',
    dialCode: '',
    iso2: '',
  });

  const [search, setSearch] = useState<string>('');

  const onInputChange = (val: string) => {
    setSearch(val);
  };

  useEffect(() => {
    const filteredOptions = options.filter((option) => {
      if (option && option.type === 'value' && option.value) {
        return String(option.value.name)
          ?.toLowerCase()
          .includes(search.toLocaleLowerCase());
      }
      return true;
    });
    setOptions(filteredOptions);
  }, [options, search]);

  useEffect(() => {
    if (value && value.length === 2) {
      setSelected({
        name:
          options.find(
            (_option) =>
              _option.value.iso2.toLocaleLowerCase() ===
              value?.toLocaleLowerCase(),
          )?.value.name || '',
        dialCode:
          options.find(
            (_option) =>
              _option.value.iso2.toLocaleLowerCase() ===
              value?.toLocaleLowerCase(),
          )?.value.dialCode || '',
        iso2: value || '',
      });
    }
  }, [options, value]);

  useEffect(() => {
    const option = options.find(
      (_option) => _option.value.iso2 === selected.iso2,
    );
    onCountryCodeChange(option?.value.name, option?.value?.iso2);
  }, [onCountryCodeChange, options, selected]);

  const handleFetchMore = useCallback(
    () => setNumberOfItems(numberOfItems + 15),
    [numberOfItems],
  );

  const visibleOptions = searchOptions.slice(
    0,
    Math.min(searchOptions.length, numberOfItems),
  );

  return (
    <Stack fullWidth data-testid="countryPicker">
      <Dropdown
        containerWidth="443px"
        containerHeight={containerHeight}
        inputValue={search || ''}
        options={search.length > 0 ? visibleOptions : options}
        usePortal={true}
        placement={placement}
        disabled={disabled}
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
      >
        {({ inputProps, inputRef, toggle }) => (
          <TextField
            data-testid="country-picker-textfield"
            readOnly={true}
            ref={inputRef}
            {...textFieldProps}
            {...inputProps}
            value={selected.name || ''}
            isAlwaysFocus={isOpen}
            label="Select Country..."
            leftIcon={
              selected?.iso2 ? (
                <Flag
                  flag={`flag_${selected.iso2}` as FlagProps['flag']}
                  size={28}
                />
              ) : null
            }
            rightIcon={
              <CountryRightIcon
                name="chevron_down_m"
                isOpen={isOpen}
                size={16}
                onClick={toggle}
                data-testid="styledCountryDownArrow"
                color="--icon-input-neutral-default"
              />
            }
          />
        )}
      </Dropdown>
    </Stack>
  );
};

export default CountryPicker;
