import { MockedProvider } from '@apollo/client/testing';
import { type Meta } from '@storybook/react';
import { useState } from 'react';
// eslint-disable-next-line import/no-restricted-paths
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';

import { ToastProvider } from '@/providers';
import { AvatarSize } from '@/components/Avatar/Avatar/types';
import { EditableAvatar } from './index';

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
  title: 'Atoms/Avatar/Editable',
  component: EditableAvatar,
  argTypes: {
    url: { type: 'string' },
    size: {
      options: Object.keys(AvatarSize),
      control: { type: 'radio' },
    },
    maximumFileSize: { type: 'number' },
    onContentChange: { type: 'function' },
    editable: {
      table: {
        disable: true,
      },
    },
    fileSize: {
      table: {
        disable: true,
      },
    },
    isUploadComplete: {
      table: {
        disable: true,
      },
    },
    isUploadStarted: {
      table: {
        disable: true,
      },
    },
    onClear: {
      table: {
        disable: true,
      },
    },
    onClose: { table: { disable: true } },
    width: { table: { disable: true } },
    height: { table: { disable: true } },
    borderRadius: { table: { disable: true } },
  },
} as Meta<typeof EditableAvatar>;

const PrimaryWithHooks = ({ ...args }) => {
  const [url, setURL] = useState(args.url);
  const onContentChange = () => {
    setURL(uploadMock.result.data.url);
  };

  return (
    <MockedProvider mocks={[uploadMock]}>
      <ToastProvider>
        <EditableAvatar url={url} {...args} onContentChange={onContentChange} />
      </ToastProvider>
    </MockedProvider>
  );
};

export const Primary = {
  render: PrimaryWithHooks,
};
