import { type Meta } from '@storybook/react';
import { useMemo, useState } from 'react';
import { type DropdownItemType, type DropdownValueType } from '../Dropdown';
import { Icon } from '../Icon';
import { Avatar } from '../Avatar/Avatar';
import { Alert } from '../Toast';
import ApiEntityPickerField from './ApiEntityPickerField';
import ApiEntityPickerFieldWithLocalSearch from './ApiEntityPickerFieldWithLocalSearch';
import ApiEntityPickerFieldWithRemoteSearch from './ApiEntityPickerFieldWithRemoteSearch';
import getItemsFromLocalSearch from './utils/getItemsFromLocalSearch';

export default {
  title: 'UI/ApiEntityPickerField',
  component: ApiEntityPickerField,
} as Meta<typeof ApiEntityPickerField>;

export const WithLocalSearch = () => {
  const [options] = useState<DropdownItemType<string, string>[]>(OPTIONS);
  const [searchedOptions] =
    useState<DropdownItemType<string, string>[]>(options);
  const [value, setValue] = useState<string | undefined>();
  const [alert, setAlert] = useState<boolean>(false);

  const onChange = (option: DropdownValueType<string> | undefined) => {
    if (option?.key === 'Add New Customer') {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } else {
      setValue(option?.key);
    }
  };

  const stickyHeaderOptions = useMemo<DropdownValueType<string>[]>(
    () => [
      {
        type: 'value',
        value: 'Add New Customer',
        key: 'Add New Customer',
        label: 'Add New Customer',
        icon: <Icon name="add_m" size={24} />,
      },
    ],
    [],
  );

  const handleClear = () => {
    onChange(undefined);
  };

  const selectedRightSideOption = (
    <Icon name="edit_m" size={24} onClick={handleClear} />
  );

  return (
    <>
      <div
        style={{ height: '50px', display: 'flex', justifyContent: 'center' }}
      >
        {!!alert && (
          <Alert id="id" message="Clicked add new customer.." type="success" />
        )}
      </div>

      <ApiEntityPickerFieldWithLocalSearch
        options={searchedOptions}
        value={value}
        onChange={onChange}
        placeholderText="Find or add a customer..."
        stickyHeaderOptions={stickyHeaderOptions}
        selectedRightSideOption={selectedRightSideOption}
      />
    </>
  );
};

export const WithRemoteSearch = () => {
  const [options] = useState<DropdownItemType<string, string>[]>(OPTIONS);
  const [searchedOptions, setSearchedOptions] =
    useState<DropdownItemType<string, string>[]>(OPTIONS);
  const [value, setValue] = useState<string | undefined>();
  const [alert, setAlert] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const onChange = (option: DropdownValueType<string> | undefined) => {
    if (option?.key === 'Add New Customer') {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } else {
      setValue(option?.key);
    }
  };

  const onInputChange = (searchVal: string) => {
    setTimeout(() => {
      const searchValue = searchVal?.toLowerCase() || '';
      const filteredOptions = getItemsFromLocalSearch(options, searchValue);

      setInputValue(searchValue);
      setSearchedOptions(filteredOptions);
    }, 500);
  };

  const stickyHeaderOptions = useMemo<DropdownValueType<string>[]>(
    () => [
      {
        type: 'value',
        value: 'Add New Customer',
        key: 'Add New Customer',
        label: 'Add New Customer',
        icon: <Icon name="add_m" size={24} />,
      },
    ],
    [],
  );

  const handleClear = () => {
    onChange(undefined);
    onInputChange?.('');
  };

  const selectedRightSideOption = (
    <Icon name="close_m" size={24} onClick={handleClear} />
  );

  return (
    <>
      <div
        style={{ height: '50px', display: 'flex', justifyContent: 'center' }}
      >
        {!!alert && (
          <Alert id="id" message="Clicked add new customer.." type="success" />
        )}
      </div>

      <ApiEntityPickerFieldWithRemoteSearch
        options={searchedOptions}
        value={value}
        onChange={onChange}
        placeholderText="Find or add a customer..."
        stickyHeaderOptions={stickyHeaderOptions}
        selectedRightSideOption={selectedRightSideOption}
        inputValue={inputValue}
        onInputChange={
          onInputChange as ((input: string) => void) &
            ((event: React.ChangeEvent<HTMLInputElement> | undefined) => void)
        }
      />
    </>
  );
};

const OPTIONS: DropdownItemType<string, string>[] = [
  {
    type: 'header',
    label: 'Recent Contacts',
  },
  {
    key: '1',
    label: 'Amit Singh',
    type: 'value',
    value: '1',
    description: 'Medical Assistant',
    icon: (
      <Avatar
        url="https://noumena-img.s3-accelerate.amazonaws.com/Passport%20size%20photograph,yVB29fEu.5ymxF7Q0.jpg"
        width={32}
      />
    ),
  },
  {
    key: '2',
    label: 'Amit G',
    type: 'value',
    value: '2',
    description: 'Medical Assistant',
    icon: <Avatar url="" width={32} />,
  },
  {
    type: 'header',
    label: 'Saved Contacts',
  },
  {
    key: '3',
    label: 'Datta',
    type: 'value',
    value: '3',
    description: 'Medical Assistant',
    icon: <Avatar url="" width={32} />,
  },
  {
    key: '4',
    label: 'Kapil',
    type: 'value',
    value: '4',
    description: 'Medical Assistant',
    icon: (
      <Avatar
        url="https://noumena-img.s3-accelerate.amazonaws.com/Passport%20size%20photograph,yVB29fEu.5ymxF7Q0.jpg"
        width={32}
      />
    ),
  },
  {
    key: '5',
    label: 'Jakub',
    type: 'value',
    value: '3',
    description: 'Medical Assistant',
    icon: <Avatar url="" width={32} />,
  },
  {
    key: '6',
    label: 'Arek',
    type: 'value',
    value: '4',
    description: 'Medical Assistant',
    icon: (
      <Avatar
        url="https://noumena-img.s3-accelerate.amazonaws.com/Passport%20size%20photograph,yVB29fEu.5ymxF7Q0.jpg"
        width={32}
      />
    ),
  },
  {
    key: '7',
    label: 'Swarup',
    type: 'value',
    value: '3',
    description: 'Medical Assistant',
    icon: <Avatar url="" width={32} />,
  },
  {
    key: '8',
    label: 'Amit K',
    type: 'value',
    value: '3',
    description: 'Medical Assistant',
    icon: <Avatar url="" width={32} />,
  },
  {
    key: '9',
    label: 'Amit S',
    type: 'value',
    value: '3',
    description: 'Medical Assistant',
    icon: <Avatar url="" width={32} />,
  },
  {
    key: '18',
    label: 'Datta',
    type: 'value',
    value: '4',
    description: 'Medical Assistant',
    icon: (
      <Avatar
        url="https://noumena-img.s3-accelerate.amazonaws.com/Passport%20size%20photograph,yVB29fEu.5ymxF7Q0.jpg"
        width={32}
      />
    ),
  },
];
