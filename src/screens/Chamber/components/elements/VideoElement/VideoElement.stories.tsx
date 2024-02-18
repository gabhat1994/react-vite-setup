import { MockedProvider } from '@apollo/client/testing';
import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';

import VideoElement from './index';

const Wrapper = styled.div`
  padding: 24px;
  background-color: var(--bg-body-neutral-alt-highlighted);
`;

const uploadMock = {
  request: {
    query: GenerateUserS3SignedUrlDocument,
    variables: {
      file: {
        fileName: 'example.mp4',
        mime: 'video/mp4',
      },
    },
  },
  result: {
    data: {
      url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
    },
  },
};

export default {
  title: 'UI/Chambers/VideoElement',
  component: VideoElement,
  args: {
    url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
    isEditMode: false,
    currentTitle: 'Text',
  },
} as Meta<typeof VideoElement>;

export const Primary = ({ ...args }) => (
  <Wrapper>
    <MockedProvider mocks={[uploadMock]}>
      <VideoElement
        spaceId=""
        element={{
          __typename: undefined,
          _id: undefined,
          bodyContent: undefined,
          bodyContentJson: undefined,
          bodyContentType: undefined,
          draft: undefined,
          elementType: undefined,
          headerContent: undefined,
          percentCompleted: undefined,
          position: undefined,
          status: undefined,
          tempStatus: undefined,
          unSaved: undefined,
          viewOnly: undefined,
        }}
        {...args}
        isEditing={args?.isEditMode}
        url={args?.url}
      />
    </MockedProvider>
  </Wrapper>
);
