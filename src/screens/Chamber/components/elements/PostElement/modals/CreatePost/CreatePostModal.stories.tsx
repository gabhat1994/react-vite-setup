import { type Meta } from '@storybook/react';
import { MockedProvider } from '@apollo/client/testing';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import { CreatePostModal } from './CreatePostModal';

const Component = () => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <Button primary onClick={toggle}>
        Create a Post
      </Button>
      {isOpen && (
        <MockedProvider>
          <CreatePostModal
            onSuccess={() => {}}
            onClose={toggle}
            spaceId="spaceID"
          />
        </MockedProvider>
      )}
    </>
  );
};

export default {
  title: 'UI/Chambers/Post',
  component: Component,
} as Meta<typeof CreatePostModal>;

export const CreateAPost = {};
