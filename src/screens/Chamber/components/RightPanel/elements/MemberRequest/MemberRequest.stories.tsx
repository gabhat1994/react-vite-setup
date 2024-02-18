import styled from 'styled-components';
import { type Meta } from '@storybook/react';
import { Card } from '@/components/Card';
import { ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import MemberRequest from './MemberRequest';

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
  width: 783px;
  @media (max-width: 425px) {
    width: min-content;
  }
`;

export default {
  title: 'UI/Chambers/MemberRequest',
  component: MemberRequest,

  argTypes: {
    category: {
      options: [
        'project',
        'social',
        'investment',
        'member',
        'story',
        'special',
      ],
      control: { type: 'radio' },
    },
  },

  args: {
    name: 'Esther Howard',
    title: 'Product Design',
    type: 'HOME',
    profileImage:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80',
    category: ChamberBoxNameEnum.member,
  },
} as Meta<typeof MemberRequest>;

export const Example = ({ ...args }) => (
  <Wrapper>
    <Card>
      <WrapperContent>
        <MemberRequest refetchReceivedRequests={() => ({})} {...args} />
      </WrapperContent>
    </Card>
  </Wrapper>
);
