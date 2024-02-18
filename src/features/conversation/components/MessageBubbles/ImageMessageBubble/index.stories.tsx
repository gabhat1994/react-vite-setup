import styled from 'styled-components';

import { type Meta } from '@storybook/react';

import { ImageMessageBubble } from '.';
import { type MediaMessageProps } from '../types';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const getMedia = (url: string) =>
  ({
    getContentTemporaryUrl: async () => url,
    contentType: 'image/png',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

export default {
  title: 'UI/Chambers/Messages/ImageMessageBubble',
  component: ImageMessageBubble,
  argTypes: {
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
    media: {
      defaultValue: getMedia('https://picsum.photos/240/135'),
    },
  },
} as Meta<typeof ImageMessageBubble>;

export const Single = {
  render: (props: MediaMessageProps) => (
    <Wrapper>
      <ImageMessageBubble {...props} />
    </Wrapper>
  ),
};

export const All = () => {
  const data: MediaMessageProps[] = [
    {
      type: 'sent',
      status: 'sending',
      media: getMedia('https://picsum.photos/150/240'),
    },
    {
      type: 'received',
      media: getMedia('https://picsum.photos/240/135'),
    },
    {
      type: 'received',
      media: getMedia('https://picsum.photos/500/300'),
      sender: 'John',
    },
    {
      type: 'received',
      media: getMedia('https://picsum.photos/240/135'),
      readers: ['Jack', 'John'],
    },
    {
      type: 'sent',
      media: getMedia('https://picsum.photos/240/135'),
      status: 'read',
    },
    {
      type: 'sent',
      media: getMedia('https://picsum.photos/150/240'),
      status: 'sent',
    },
    {
      type: 'received',
      media: getMedia('https://picsum.photos/500/300'),
      userAvatar: 'https://www.w3schools.com/howto/img_avatar2.png',
    },
    {
      type: 'sent',
      media: getMedia('https://picsum.photos/240/135'),
      status: 'failed',
    },
  ];

  return (
    <Wrapper>
      {data.map((datum: MediaMessageProps, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ImageMessageBubble key={index} {...datum} />
      ))}
    </Wrapper>
  );
};
