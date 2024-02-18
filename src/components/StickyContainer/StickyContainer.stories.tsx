import { type Meta } from '@storybook/react';
import styled from 'styled-components';

import { StickyContainer } from '.';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  background-color: var(--bg-card-neutral-default);
  padding: 10px 10px;
  gap: 25px;
`;

const LengthyItem = styled.div`
  height: 1000px;
  border: 1px solid var(--border-card-neutral-highlighted);
  boxsizing: border-box;
  padding: 10px;
`;

const Item = styled.div`
  height: 100px;
  border: 2px solid var(--border-card-neutral-default);
  width: 300px;
  box-sizing: border-box;
`;

export default {
  title: 'Atoms/StickyContainer',
  component: StickyContainer,
} as Meta<typeof StickyContainer>;

export const StickyItem = () => (
  <Wrapper>
    <LengthyItem />
    <StickyContainer>
      <Item>Sticky Container</Item>
    </StickyContainer>
  </Wrapper>
);
