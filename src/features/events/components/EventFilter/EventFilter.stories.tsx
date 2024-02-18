import { useState } from 'react';
import styled from 'styled-components';

import { EventFilter } from './EventFilter';
import { type EventFilterProps } from './types';

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
  title: 'UI/Event/EventFilter',
  argTypes: {
    visible: {
      options: [true, false, undefined],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
  },
};

const AllWithHooks = (props: EventFilterProps) => {
  const [filter, setFilter] = useState<string>('all');

  return (
    <Wrapper>
      <EventFilter {...props} activeFilter={filter} onChange={setFilter} />
    </Wrapper>
  );
};

export const All = {
  render: AllWithHooks,
};
