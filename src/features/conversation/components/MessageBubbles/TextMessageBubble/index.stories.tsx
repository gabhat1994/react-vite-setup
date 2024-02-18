import styled from 'styled-components';
import generate from 'uniqid';

import { type Meta } from '@storybook/react';

import { TextMessageBubble } from '.';
import { type TextMessageProps } from '../types';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default {
  title: 'UI/Chambers/Messages/TextMessageBubble',
  component: TextMessageBubble,
  argTypes: {
    justSentPrev: {
      options: [true, false],
      control: { type: 'radio' },
    },
    justSentNext: {
      options: [true, false],
      control: { type: 'radio' },
    },
    message: {
      defaultValue:
        'Deal signed! Can we grab something to eat at UNO and set up a roadmap? I can be there in 15 minutes',
      control: { type: 'text' },
    },
    readers: {
      options: ['User A', 'User B', 'User C'],
      control: { type: 'check' },
    },
    sender: {
      defaultValue: 'John',
      control: { type: 'text' },
    },
    status: {
      options: ['sending', 'sent', 'read', 'failed', 'success', undefined],
      control: { type: 'radio' },
    },
    type: {
      options: ['sent', 'received', undefined],
      control: { type: 'select' },
    },
    userAvatar: {
      defaultValue: 'https://www.w3schools.com/howto/img_avatar2.png',
      control: { type: 'text' },
    },
  },
} as Meta<typeof TextMessageBubble>;

export const Single = {
  render: (props: TextMessageProps) => (
    <Wrapper>
      <TextMessageBubble {...props} />
    </Wrapper>
  ),
};

export const All = () => {
  const data: TextMessageProps[] = [
    {
      sid: generate(),
      type: 'sent',
      status: 'sending',
      message: 'I can be there in 15 minutes',
    },
    {
      sid: generate(),
      type: 'received',
      message: 'I can be there in 15 minutes',
    },
    {
      sid: generate(),
      type: 'received',
      message: 'I can be there in 15 minutes',
      sender: 'John',
      justSentPrev: true,
    },
    {
      sid: generate(),
      type: 'received',
      message: 'Hey, Jack and John, please check this message',
      readers: ['Jack', 'John'],
      justSentNext: true,
      userAvatar: 'https://www.w3schools.com/howto/img_avatar2.png',
    },
    {
      sid: generate(),
      type: 'sent',
      message:
        'Deal signed! Can we grab something to eat at UNO and set up a roadmap? I can be there in 15 minutes',
      justSentPrev: true,
    },
    {
      sid: generate(),
      type: 'sent',
      message: 'Will you be there?',
      status: 'read',
      justSentNext: true,
    },
    {
      sid: generate(),
      type: 'sent',
      message: 'Will you be there?',
      status: 'sent',
    },
    {
      sid: generate(),
      type: 'received',
      message: 'I sure will',
    },
    {
      sid: generate(),
      type: 'sent',
      message: 'Is it good enough?',
      status: 'failed',
    },
  ];

  return (
    <Wrapper>
      {data.map((datum: TextMessageProps) => (
        <TextMessageBubble key={datum.sid} {...datum} />
      ))}
    </Wrapper>
  );
};
