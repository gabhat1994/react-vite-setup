import { type Meta } from '@storybook/react';
import { useCallback } from 'react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';

import ChamberEditMode from './Modal';

const Component = () => {
  const [isOpen, toggle] = useToggle(false);
  const markAsVistied = useCallback(() => {
    toggle();
  }, [toggle]);

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ChamberEditMode
        isOpen={isOpen}
        handleClose={toggle}
        handleMarkAsVisited={markAsVistied}
        markSpaceAsEditedLoading={false}
      />
    </>
  );
};

export default {
  title: 'UI/Chambers/ChamberEditMode',
  component: Component,
} as Meta<typeof ChamberEditMode>;

export const Primary = {};
