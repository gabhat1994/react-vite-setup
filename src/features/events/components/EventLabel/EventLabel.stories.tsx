import styled from 'styled-components';

import { EventLabel } from './EventLabel';
import { type EventLabelProps } from './types';

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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default {
  title: 'UI/Event/EventLabel',
  argTypes: {
    flex: {
      defaultValue: '',
      control: { type: 'text' },
    },
    width: {
      defaultValue: '',
      control: { type: 'text' },
    },
    variant: {
      options: ['attending', 'not_attending', 'finished'],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
  },
};

export const All = {
  render: (props: EventLabelProps) => (
    <Wrapper>
      <Row>
        <EventLabel {...props} variant="not_attending" />
      </Row>
      <Row>
        <EventLabel {...props} variant="finished" />
      </Row>
    </Wrapper>
  ),
};
