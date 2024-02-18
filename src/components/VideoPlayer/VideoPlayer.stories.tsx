import styled from 'styled-components';
import { type Meta } from '@storybook/react';
import VideoPlayer from './VideoPlayer';

const Wrapper = styled.div`
  padding-bottom: 24px;
`;

export const VideoPlayerExample = {
  render: ({ ...args }) => (
    <Wrapper>
      <VideoPlayer url={args.url} fileType={args.fileType} />
    </Wrapper>
  ),
};

export default {
  title: 'Atoms/VideoPlayer',
  component: VideoPlayer,
  argTypes: {
    url: {
      control: { type: 'text', default: null },
    },
    fileType: {
      options: ['video/mp4', 'video/quicktime'],
      control: { type: 'inline-radio', default: 'video/mp4' },
    },
  },
} as Meta<typeof VideoPlayer>;
