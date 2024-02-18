import { MockedProvider } from '@apollo/client/testing';
import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';

import ImageElement from './index';

const Wrapper = styled.div`
  padding: 24px;
  background-color: var(--bg-body-neutral-alt-highlighted);
`;

const uploadMock = {
  request: {
    query: GenerateUserS3SignedUrlDocument,
    variables: {
      file: {
        fileName: 'example.png',
        mime: 'image/png',
      },
    },
  },
  result: {
    data: {
      url: 'https://noumena-img.s3-accelerate.amazonaws.com/Group 1.TZW5HgkP.png',
    },
  },
};

export default {
  title: 'UI/Chambers/ImageElement',
  component: ImageElement,
  args: {
    url: 'https://noumena-img.s3-accelerate.amazonaws.com/Group 1.TZW5HgkP.png',
    isEditMode: false,
    currentTitle: 'Text',
  },
} as Meta<typeof ImageElement>;

export const Primary = ({ ...args }) => (
  <Wrapper>
    <MockedProvider mocks={[uploadMock]}>
      <ImageElement
        {...args}
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
        isEditing={args?.isEditMode}
        url={args?.url}
      />
    </MockedProvider>
  </Wrapper>
);
