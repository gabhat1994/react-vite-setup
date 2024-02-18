import { type Meta } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';

import AmountRangePopover, {
  type AmountRangePopoverProps,
} from './AmountRangePopover';

const Container = styled.div`
  max-width: 400px;
  width: 80%;
  padding: 16px;
  background-color: #fff;
  min-height: 100vh;
`;

export default {
  title: 'UI/AmountRangePopover',
  component: AmountRangePopover,
  argTypes: {
    min: {
      defaultValue: 0,
      control: { type: 'number' },
    },
    max: {
      defaultValue: 300,
      control: { type: 'number' },
    },
  },
} as Meta<typeof AmountRangePopover>;

const BasicWithHooks = (props: AmountRangePopoverProps) => {
  const [value, setValue] = useState({ min: 0, max: 100 });

  return (
    <Container>
      <AmountRangePopover
        min={props.min}
        max={props.max}
        value={value}
        renderValue={`${value.min} - ${value.max}`}
        onChange={setValue}
      />
    </Container>
  );
};

export const Basic = {
  render: BasicWithHooks,
};
