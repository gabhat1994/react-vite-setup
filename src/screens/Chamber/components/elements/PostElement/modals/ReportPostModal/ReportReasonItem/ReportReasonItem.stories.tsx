import { type StoryFn } from '@storybook/react';
import styled from 'styled-components';
import { ReportType } from '@/apollo/generated/types';
import { ReportReasonItem } from './ReportReasonItem';
import { type ReportReasonItemProps } from './types';

const StyledContainer = styled.div`
  max-width: 620px;
`;

export default {
  title: 'UI/Chambers/Post/Report',
  component: ReportReasonItem,
  argTypes: {
    isChecked: {
      control: { type: 'boolean', default: false },
    },
    borderBottom: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text', default: 'Label' },
    },
    description: {
      control: { type: 'text', default: 'Description' },
    },
    reportText: {
      control: { type: 'text' },
    },
    value: {
      options: Object.values(ReportType),
      control: { type: 'inline-radio' },
    },
    onSelect: {
      table: {
        disable: true,
      },
    },
    onChangeText: {
      table: {
        disable: true,
      },
    },
  },
};

const Template: StoryFn<typeof ReportReasonItem> = (
  props: ReportReasonItemProps,
) => (
  <StyledContainer>
    <ReportReasonItem
      isChecked={props.isChecked || false}
      label={props.label || ''}
      value={props.value || ReportType.Offensive}
      description={props.description || ''}
      reportText={props.reportText}
      borderBottom={props.borderBottom}
      onChangeText={() => {}}
      onSelect={() => {}}
    />
  </StyledContainer>
);

export const ReportReasonItems = {
  render: Template,

  args: {
    isChecked: false,
    label: 'Label',
    value: ReportType.Offensive,
    description:
      'A member is posting content that is either spam, and/ or irrelevant to the discussion, derailing the discussion or excessively critical to themselves or others.',
    borderBottom: false,
    reportText: '',
  },
};
