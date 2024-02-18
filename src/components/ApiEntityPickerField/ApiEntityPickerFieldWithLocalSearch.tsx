import { useMemo, useState } from 'react';
import ApiEntityPickerField from './ApiEntityPickerField';
import { type ApiEntityPickerFieldProps } from './types';
import getItemsFromLocalSearch from './utils/getItemsFromLocalSearch';

export type ApiEntityPickerFieldWithLocalSearchProps<
  Key extends string,
  Data extends unknown = Key,
> = ApiEntityPickerFieldProps<Key, Data>;

function ApiEntityPickerFieldWithLocalSearch<
  Key extends string,
  Data extends unknown = Key,
>({ options, ...rest }: ApiEntityPickerFieldWithLocalSearchProps<Key, Data>) {
  const [inputValue, setInputValue] = useState<string>('');

  const filteredOptions = useMemo(() => {
    const searchValue = inputValue.toLowerCase();
    return getItemsFromLocalSearch(options, searchValue);
  }, [inputValue, options]);

  return (
    <ApiEntityPickerField
      options={filteredOptions}
      inputValue={inputValue}
      onInputChange={setInputValue}
      {...rest}
    />
  );
}

export default ApiEntityPickerFieldWithLocalSearch;
