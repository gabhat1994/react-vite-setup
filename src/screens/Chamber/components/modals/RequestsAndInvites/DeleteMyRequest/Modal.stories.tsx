import { type Meta } from '@storybook/react';
import { t } from 'i18next';
import { useCallback } from 'react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';

import { useToast } from '@/hooks';
import { DeleteMyRequest } from './Modal';

const Component = () => {
  const [isOpen, toggle] = useToggle(false);
  const { addToast } = useToast();

  const handleDelete = useCallback(async () => {
    addToast(
      'success',
      'none',
      t('noumena.chambers.element.requests.success.delete'),
    );
    toggle();
  }, [addToast, toggle]);

  return (
    <>
      <Button primary onClick={toggle}>
        Delete a Request
      </Button>
      {isOpen && (
        <DeleteMyRequest
          onDelete={handleDelete}
          onClose={toggle}
          requestId="spaceID"
        />
      )}
    </>
  );
};

export default {
  title: 'UI/Chambers/DeleteMyRequest',
  component: Component,
} as Meta<typeof DeleteMyRequest>;

export const DeleteARequest = {};
