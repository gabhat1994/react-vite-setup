import { type FC, useEffect, useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react';
import generate from 'uniqid';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { SmartyServices } from '../../services/smarty';
import { type AddressDropDownProps } from './types';
import AddressRightIcon from './styles';

const AddressDropDown: FC<AddressDropDownProps> = ({
  setSelectedAddress,
  setShowForm,
  onLookupFailed,
}) => {
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [internalSearchedAddress, setInternalSearchedAddress] = useState<
    DropdownValueType<string>[] | undefined
  >([]);
  const [smartySearchedAddress, setSmartySearchedAddress] =
    useState<string>('');
  const [internalSearch, setInternalSearch] = useState<string>('');

  const dropDownOpen = useMemo(
    () => Boolean(smartySearchedAddress?.length),
    [smartySearchedAddress],
  );

  const getSuggestionData = useCallback(
    async (keyword: string | undefined) => {
      try {
        if (keyword) {
          const res = await SmartyServices.lookup(keyword);
          const response = res?.suggestions;
          let suggestionsData: string[] = [];
          if (response) {
            suggestionsData = response.map((suggestion) => {
              const {
                city,
                street_line: streetLine,
                secondary,
                state,
                zipcode,
              } = suggestion;
              return [streetLine, secondary, city, state, zipcode].join(',');
            });
          }
          setSuggestions(suggestionsData);
        }
      } catch (error: unknown) {
        if (onLookupFailed) {
          onLookupFailed();
        }
        Sentry.captureException(JSON.stringify(error));
      }
    },
    [onLookupFailed],
  );

  const onInputChange = (val: string) => {
    setInternalSearch(val);
    if (!val) {
      setInternalSearchedAddress([]);
    }
  };

  const generateOptions: DropdownValueType<string>[] | undefined = useMemo(
    () =>
      suggestions?.map(
        (address) =>
          ({
            key: generate(),
            label: (
              <Stack>
                <TSpan
                  font="input-s"
                  colorToken="--text-tablecell-header-neutral-highlighted"
                  data-testid="country-options"
                >
                  <div style={{ padding: '0 4px' }}>{address}</div>
                </TSpan>
              </Stack>
            ),
            type: 'value',
            value: address,
          } || []),
      ),
    [suggestions],
  );
  useEffect(() => {
    if (generateOptions) {
      const filteredOptions = generateOptions.filter((option) => {
        if (option && option.type === 'value' && option.value) {
          return String(option.value)
            ?.toLowerCase()
            .includes(internalSearch.toLocaleLowerCase());
        }
        return true;
      });
      if (filteredOptions) {
        setInternalSearchedAddress(filteredOptions);
      }
    }
  }, [internalSearch, generateOptions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getSuggestionData(smartySearchedAddress);
    }, 500);
    setSuggestions([]);
    return () => clearTimeout(timer);
  }, [smartySearchedAddress, getSuggestionData]);

  return (
    <Stack fullWidth data-testid="address-picker">
      <Dropdown
        containerWidth="443px"
        inputValue={internalSearch}
        isOpen={dropDownOpen}
        options={
          internalSearch && internalSearchedAddress
            ? internalSearchedAddress
            : generateOptions || []
        }
        placement="bottom-start"
        onSelectOption={(option) => {
          setSmartySearchedAddress(option.value as string);
          setSelectedAddress(option.value as string);
          if (setShowForm) {
            setShowForm(true);
          }
        }}
        // showInternalSearch
        autoFocusInternalSearch={false}
        onInputChange={onInputChange}
      >
        {({ inputProps, inputRef }) => (
          <TextField
            data-testid="step-one-address"
            label={t('noumena.money.setupWallet.address.search.street')}
            {...inputProps}
            onFocus={(e) => e.preventDefault()}
            ref={inputRef}
            autoFocus={true}
            onChange={(e) => {
              setSmartySearchedAddress(e.target.value);
            }}
            value={smartySearchedAddress}
            rightIcon={
              <AddressRightIcon
                name="chevron_down_m"
                isOpen={dropDownOpen}
                size={16}
                data-testid="styledAddressDownArrow"
              />
            }
          />
        )}
      </Dropdown>
    </Stack>
  );
};

export default AddressDropDown;
