import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { EventDescription } from './EventDescription';
import { type EventDescriptionProps } from './types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  background: var(--bg-card-neutral-alt-default);
  padding: 50px;
  box-sizing: border-box;
  gap: 12px;
`;

export default {
  title: 'UI/Event/EventDescription',
  argTypes: {
    description: { control: { type: 'text' } },
  },
  args: {
    onClickSeeMore: () => {},
  },
} as Meta<typeof EventDescription>;

export const All = {
  render: (props: EventDescriptionProps) => (
    <Wrapper>
      <EventDescription {...props} />
    </Wrapper>
  ),
};
