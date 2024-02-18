import { type Meta, type StoryFn } from '@storybook/react';
import styled from 'styled-components';
import { MockedProvider } from '@apollo/client/testing';
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';
import { Upload } from './Upload';

export default {
  title: 'Atoms/Upload',
  component: Upload,

  argTypes: {},
} as Meta<typeof Upload>;

const TriggerEl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-family);
`;

const uploadMock = {
  request: {
    query: GenerateUserS3SignedUrlDocument,
    variables: {
      file: {
        fileName: 'test.docx',
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    },
  },
  result: {
    data: { url: 'https://www.s3.uploadurl.com' },
  },
};

const Template: StoryFn<typeof Upload> = () => (
  <MockedProvider mocks={[uploadMock]}>
    <Upload<HTMLDivElement> type="profile">
      {({ triggerElRef, isDraggingOver }) => (
        <TriggerEl
          ref={triggerElRef}
          style={{
            width: 300,
            height: 300,
            background: isDraggingOver
              ? 'var(--bg-dragdrop-brand-secondary-focused)'
              : 'var(--bg-dragdrop-neutral-default)',
          }}
        >
          Upload
        </TriggerEl>
      )}
    </Upload>
  </MockedProvider>
);

export const Default = {
  render: Template,
};
