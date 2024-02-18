import { MockedProvider } from '@apollo/client/testing';
import { type Meta } from '@storybook/react';
import { useState } from 'react';
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { useToggle } from '@/hooks/toggle';
import { ToastProvider } from '@/providers';
import { ProjectCreateModal } from './ProjectCreateModal';

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

const Component = () => {
  const [isOpen, toggle] = useToggle(false);
  const [newID, setNewID] = useState<string>('');

  const handleSuccess = (id: string) => {
    toggle();
    setNewID(id);
  };

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ToastProvider>
        <MockedProvider addTypename={false} mocks={[uploadMock]}>
          <ProjectCreateModal
            isOpen={isOpen}
            handleClose={toggle}
            handleSuccess={handleSuccess}
          />
          <br />
          <TSpan font="body-m" colorToken=" --text-modal-neutral-highlighted">
            New Project ID: {newID}
          </TSpan>
        </MockedProvider>
      </ToastProvider>
    </>
  );
};

export default {
  title: 'UI/Chambers/Create Project',
  component: Component,
} as Meta<typeof ProjectCreateModal>;

export const Primary = {};
