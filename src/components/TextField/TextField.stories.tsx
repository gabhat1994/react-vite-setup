import { useState } from 'react';
import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { Icon } from '../Icon';

import { TextField } from './TextField';

const WrapperNormal = styled.div`
  padding-bottom: 24px;
`;

const WrapperFlex = styled(WrapperNormal)`
  display: flex;
  flex-direction: row;
`;

const search = <Icon name="search_m" size={24} />;
const clear = <Icon name="clear_m" size={24} />;

export default {
  title: 'Atoms/TextField',
  component: (props) => (
    <TextField
      {...props}
      leftIcon={props.leftIcon ? search : undefined}
      rightIcon={props.rightIcon ? clear : undefined}
    />
  ),
  argTypes: {
    size: {
      options: ['normal', 'small'],
      control: { type: 'radio' },
    },
    leftIcon: {
      options: [undefined, 'search'],
      control: { type: 'radio' },
    },
    rightIcon: {
      options: [undefined, 'clear'],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof TextField>;

export const Controlled = {
  args: {
    value: '',
    helperText: '',
    error: '',

    label: '',
    leftIcon: '',
    rightIcon: '',
    hasError: '',
    noBorder: false,

    size: '',
    width: '',
    fullWidth: true,

    type: '',
    autocomplete: '',
    dirname: '',
    list: '',
    readonly: false,
    inputSize: 1000,
    required: false,
    multiple: false,
    maxlength: 1000,
    pattern: '',
    min: 0,
    step: 1,
    placeholder: '',
    disabled: false,
  },
};

export const Primary = () => {
  const [value1, setValue1] = useState('Input text 1');
  const [value2, setValue2] = useState('Input text 2');
  const [value3, setValue3] = useState('Input text 3');
  const [value4, setValue4] = useState('Input text 4');
  const [value5, setValue5] = useState('Input text 5');
  const [value6, setValue6] = useState('Input text 6');
  const [value7, setValue7] = useState('Input text 7');
  const [value8, setValue8] = useState('Input text 8');
  const [value9, setValue9] = useState('Input text 9');
  const [value10, setValue10] = useState('Input text 10');
  const [value11, setValue11] = useState('Input text 11');
  const [value12, setValue12] = useState('Input text 12');
  return (
    <>
      <TextField label="Label" inputSize="small" />
      <div style={{ height: 30 }}>{/* separator */}</div>
      <TextField label="Label" />

      <div style={{ height: 100 }}>{/* separator */}</div>

      <WrapperFlex>
        <TextField label="Label" inputSize="small" />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField label="Label (optional)" inputSize="small" />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField label="Label" inputSize="small" helperText="Help text" />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          inputSize="small"
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <div style={{ height: 100 }}>{/* separator */}</div>

      <WrapperFlex>
        <TextField
          label="Label"
          value={value1}
          onChange={(event) => setValue1(event.currentTarget.value)}
          inputSize="small"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value2}
          onChange={(event) => setValue2(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value3}
          onChange={(event) => setValue3(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          value={value4}
          onChange={(event) => setValue4(event.currentTarget.value)}
          inputSize="small"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value5}
          onChange={(event) => setValue5(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value6}
          onChange={(event) => setValue6(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label"
          value={value7}
          onChange={(event) => setValue7(event.currentTarget.value)}
          inputSize="small"
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value8}
          onChange={(event) => setValue8(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value9}
          onChange={(event) => setValue9(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          value={value10}
          onChange={(event) => setValue10(event.currentTarget.value)}
          inputSize="small"
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value11}
          onChange={(event) => setValue11(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value12}
          onChange={(event) => setValue12(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <div style={{ height: 100 }}>{/* separator */}</div>

      <WrapperFlex>
        <TextField label="Label" error inputSize="small" />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField label="Label (optional)" inputSize="small" />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField label="Label" inputSize="small" helperText="Help text" />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          inputSize="small"
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <div style={{ height: 100 }}>{/* separator */}</div>

      <WrapperFlex>
        <TextField
          label="Label"
          value={value1}
          onChange={(event) => setValue1(event.currentTarget.value)}
          inputSize="small"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value2}
          onChange={(event) => setValue2(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value3}
          onChange={(event) => setValue3(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          value={value4}
          onChange={(event) => setValue4(event.currentTarget.value)}
          inputSize="small"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value5}
          onChange={(event) => setValue5(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value6}
          onChange={(event) => setValue6(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label"
          value={value7}
          onChange={(event) => setValue7(event.currentTarget.value)}
          inputSize="small"
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value8}
          onChange={(event) => setValue8(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value9}
          onChange={(event) => setValue9(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          value={value10}
          onChange={(event) => setValue10(event.currentTarget.value)}
          inputSize="small"
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value11}
          onChange={(event) => setValue11(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value12}
          onChange={(event) => setValue12(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <div style={{ height: 100 }}>{/* separator */}</div>

      <WrapperFlex>
        <TextField label="Label" inputSize="small" />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField label="Label (optional)" inputSize="small" />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField label="Label" inputSize="small" helperText="Help text" />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          inputSize="small"
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <div style={{ height: 100 }}>{/* separator */}</div>

      <WrapperFlex>
        <TextField
          label="Label"
          value={value1}
          onChange={(event) => setValue1(event.currentTarget.value)}
          inputSize="small"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value2}
          onChange={(event) => setValue2(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value3}
          onChange={(event) => setValue3(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          value={value4}
          onChange={(event) => setValue4(event.currentTarget.value)}
          inputSize="small"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value5}
          onChange={(event) => setValue5(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value6}
          onChange={(event) => setValue6(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label"
          value={value7}
          onChange={(event) => setValue7(event.currentTarget.value)}
          inputSize="small"
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value8}
          onChange={(event) => setValue8(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value9}
          onChange={(event) => setValue9(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          value={value10}
          onChange={(event) => setValue10(event.currentTarget.value)}
          inputSize="small"
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value11}
          onChange={(event) => setValue11(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value12}
          onChange={(event) => setValue12(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <div style={{ height: 100 }}>{/* separator */}</div>

      <WrapperFlex>
        <TextField label="Label" inputSize="small" />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField label="Label (optional)" inputSize="small" />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField label="Label" inputSize="small" helperText="Help text" />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          inputSize="small"
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <div style={{ height: 100 }}>{/* separator */}</div>

      <WrapperFlex>
        <TextField
          label="Label"
          value={value1}
          onChange={(event) => setValue1(event.currentTarget.value)}
          inputSize="small"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value2}
          onChange={(event) => setValue2(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value3}
          onChange={(event) => setValue3(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          value={value4}
          onChange={(event) => setValue4(event.currentTarget.value)}
          inputSize="small"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value5}
          onChange={(event) => setValue5(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value6}
          onChange={(event) => setValue6(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label"
          value={value7}
          onChange={(event) => setValue7(event.currentTarget.value)}
          inputSize="small"
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value8}
          onChange={(event) => setValue8(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value9}
          onChange={(event) => setValue9(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          value={value10}
          onChange={(event) => setValue10(event.currentTarget.value)}
          inputSize="small"
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value11}
          onChange={(event) => setValue11(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value12}
          onChange={(event) => setValue12(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
        />
      </WrapperFlex>

      <div style={{ height: 100 }}>{/* separator */}</div>

      <WrapperFlex>
        <TextField label="Label" inputSize="small" disabled />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          disabled
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField label="Label (optional)" inputSize="small" disabled />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          disabled
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label"
          inputSize="small"
          helperText="Help text"
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
          disabled
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          inputSize="small"
          helperText="Help text"
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
          disabled
        />
      </WrapperFlex>

      <div style={{ height: 100 }}>{/* separator */}</div>

      <WrapperFlex>
        <TextField
          label="Label"
          value={value1}
          onChange={(event) => setValue1(event.currentTarget.value)}
          inputSize="small"
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value2}
          onChange={(event) => setValue2(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value3}
          onChange={(event) => setValue3(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          disabled
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          value={value4}
          onChange={(event) => setValue4(event.currentTarget.value)}
          inputSize="small"
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value5}
          onChange={(event) => setValue5(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value6}
          onChange={(event) => setValue6(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          disabled
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label"
          value={value7}
          onChange={(event) => setValue7(event.currentTarget.value)}
          inputSize="small"
          helperText="Help text"
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value8}
          onChange={(event) => setValue8(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label"
          value={value9}
          onChange={(event) => setValue9(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
          disabled
        />
      </WrapperFlex>

      <WrapperFlex>
        <TextField
          label="Label (optional)"
          value={value10}
          onChange={(event) => setValue10(event.currentTarget.value)}
          inputSize="small"
          helperText="Help text"
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value11}
          onChange={(event) => setValue11(event.currentTarget.value)}
          inputSize="small"
          leftIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
          disabled
        />

        <div style={{ width: 25 }}>{/* separator */}</div>

        <TextField
          label="Label (optional)"
          value={value12}
          onChange={(event) => setValue12(event.currentTarget.value)}
          inputSize="small"
          rightIcon={
            <Icon
              name="placeholder_m"
              size={24}
              color="--icon-input-neutral-default"
            />
          }
          helperText="Help text"
          disabled
        />
      </WrapperFlex>
    </>
  );
};
