import { type Meta } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';

import AmountRangeField, { type AmountRangeFieldProps } from './AmountRangeField';

const Container = styled.div`
  width: 400px;
  background-color: #fff;
  padding-bottom: 32px;
`;

export default {
  title: 'UI/AmountRangeField',
  component: AmountRangeField,
  argTypes: {
    min: {
      defaultValue: 0,
      control: { type: 'number' },
    },
    max: {
      defaultValue: 400,
      control: { type: 'number' },
    },
  },
} as Meta<typeof AmountRangeField>;

const BasicWithHooks = (props: AmountRangeFieldProps) => {
  const [value, setValue] = useState({ min: 0, max: 400 });

  return (
    <Container>
      <AmountRangeField
        min={props.min}
        max={props.max}
        value={value}
        onChange={setValue}
      />
    </Container>
  );
};

export const Basic = {
  render: BasicWithHooks,
};
