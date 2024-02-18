import { MockedProvider } from '@apollo/client/testing';
import { type Meta } from '@storybook/react';
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import { ToastProvider } from '@/providers';
import { HomeNoumAboutMe } from './Modal';

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

  const handleSuccess = () => {
    toggle();
  };

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ToastProvider>
        <MockedProvider addTypename={false} mocks={[uploadMock]}>
          <HomeNoumAboutMe
            isOpen={isOpen}
            handleClose={toggle}
            handleSuccess={handleSuccess}
          />
        </MockedProvider>
      </ToastProvider>
    </>
  );
};

export default {
  title: 'UI/Chambers/HomeNoumAboutMe',
  component: Component,
} as Meta<typeof HomeNoumAboutMe>;

export const Primary = {};
