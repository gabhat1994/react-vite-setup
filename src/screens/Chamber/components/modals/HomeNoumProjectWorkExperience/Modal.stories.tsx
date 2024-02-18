import { type Meta } from '@storybook/react';
import { MockedProvider } from '@apollo/client/testing';
import { GenerateUserS3SignedUrlDocument } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import { ToastProvider } from '@/providers';
import { ElementTypeEnum } from '@/apollo/generated/types';
import { HomeNoumProjectWorkExperience } from './Modal';

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
          <HomeNoumProjectWorkExperience
            isOpen={isOpen}
            handleClose={toggle}
            handleSuccess={handleSuccess}
            elementType={ElementTypeEnum.ProjectWorkExperience}
            position={1}
          />
        </MockedProvider>
      </ToastProvider>
    </>
  );
};

export default {
  title: 'UI/Chambers/Project and Work Experience',
  component: Component,
} as Meta<typeof HomeNoumProjectWorkExperience>;

export const Primary = {};
