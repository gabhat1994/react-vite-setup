import { type Meta } from '@storybook/react';
import { t } from 'i18next';
import { useCallback } from 'react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';

import { useToast } from '@/hooks';
import { DeletePost } from './Modal';

const Component = () => {
  const [isOpen, toggle] = useToggle(false);
  const { addToast } = useToast();

  const handleDelete = useCallback(async () => {
    addToast(
      'success',
      'none',
      t('noumena.chambers.element.posts.success.delete'),
    );
    toggle();
  }, [addToast, toggle]);

  return (
    <>
      <Button primary onClick={toggle}>
        Delete a Post
      </Button>
      {isOpen && (
        <DeletePost onDelete={handleDelete} onClose={toggle} postId="spaceID" />
      )}
    </>
  );
};

export default {
  title: 'UI/Chambers/Post',
  component: Component,
} as Meta<typeof DeletePost>;

export const DeleteAPost = {};
