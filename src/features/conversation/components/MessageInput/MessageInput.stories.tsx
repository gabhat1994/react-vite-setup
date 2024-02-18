import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { Card } from '@/components/Card';
import { MessageInput } from './MessageInput';

const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 0px;
  align-items: center;
  background-color: var(--bg-body-neutral-alt-highlighted);
  width: 100%;
  min-height: 100vh;
`;

const WrapperContent = styled(Card)`
  width: 470px;
  padding: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0;

  @media (max-width: 425px) {
    width: min-content;
  }
`;

export default {
  title: 'UI/Conversation/Messages/Message Input',
  component: MessageInput,
  args: {
    onSendMessage: () => {},
  },
  argTypes: {
    onSendMessage: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof MessageInput>;

export const Primary = {
  render: ({ ...args }) => (
    <WrapperContainer>
      <WrapperContent>
        <MessageInput {...args} onSendMessage={() => {}} />
      </WrapperContent>
    </WrapperContainer>
  ),
};
