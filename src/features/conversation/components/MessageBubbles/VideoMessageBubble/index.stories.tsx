import styled from 'styled-components';

import { type Meta } from '@storybook/react';

import { VideoMessageBubble } from '.';
import { type MediaMessageProps } from '../types';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const videoPortrait = {
  getContentTemporaryUrl: async () =>
    'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
  contentType: 'video/mp4',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const videoLandscape = {
  getContentTemporaryUrl: async () =>
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  contentType: 'video/mp4',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export default {
  title: 'UI/Chambers/Messages/VideoMessageBubble',
  component: VideoMessageBubble,
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
      defaultValue: videoLandscape,
    },
  },
} as Meta<typeof VideoMessageBubble>;

export const Single = {
  render: (props: MediaMessageProps) => (
    <Wrapper>
      <VideoMessageBubble {...props} />
    </Wrapper>
  ),
};

export const All = () => {
  const data: MediaMessageProps[] = [
    {
      type: 'sent',
      status: 'sending',
      media: videoPortrait,
    },
    {
      type: 'received',
      media: videoPortrait,
    },
    {
      type: 'received',
      media: videoLandscape,
      sender: 'John',
    },
    {
      type: 'received',
      media: videoPortrait,
      readers: ['Jack', 'John'],
    },
    {
      type: 'sent',
      media: videoPortrait,
      status: 'read',
    },
    {
      type: 'sent',
      media: videoPortrait,
      status: 'sent',
    },
    {
      type: 'received',
      media: videoLandscape,
      userAvatar: 'https://www.w3schools.com/howto/img_avatar2.png',
    },
    {
      type: 'sent',
      media: videoPortrait,
      status: 'failed',
    },
  ];

  return (
    <Wrapper>
      {data.map((datum: MediaMessageProps) => (
        <VideoMessageBubble key={new Date().getTime()} {...datum} />
      ))}
    </Wrapper>
  );
};
