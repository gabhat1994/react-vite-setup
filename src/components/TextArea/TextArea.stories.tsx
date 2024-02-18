import { useState } from 'react';
import styled from 'styled-components';
import { type Meta } from '@storybook/react';
import { TextArea } from './TextArea';
import { bodyTypography } from '../Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 0px;
  align-items: center;
  background-color: var(--bg-body-neutral-alt-highlighted);
  width: 100%;
`;
const WrapperContent = styled.div`
  width: calc(100% - 20px);
`;

const Description = styled.span`
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding: 24px;
  text-align: center;
  color: var(--text-card-brand-primary-default);
  ${bodyTypography.bodyXLargeBold};
`;

export default {
  title: 'Atoms/TextArea',
  component: TextArea,

  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    leftIcon: {
      table: {
        disable: true,
      },
    },
    rightIcon: {
      table: {
        disable: true,
      },
    },
  },

  args: {
    helperText: 'Helper Text',
    error: false,
    label: 'Text Area',
    resize: false,
    disabled: false,
    maxLength: 50,
  },
} as Meta<typeof TextArea>;

const ExampleWithHooks = ({ ...args }) => {
  const [value, setValue] = useState('Text area content');
  return (
    <Wrapper>
      <WrapperContent>
        <Description>Textarea example</Description>
        <TextArea
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </WrapperContent>
    </Wrapper>
  );
};

export const Example = {
  render: ExampleWithHooks,
};
