import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';

import { ChamberArchiveModal } from './ChamberArchiveModal';

const Component = () => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ChamberArchiveModal
        noumName="Test Noum"
        isOpen={isOpen}
        handleClose={toggle}
        onArchive={() => {
          toggle();
        }}
      />
    </>
  );
};

export default {
  title: 'UI/Chambers/ChamberArchiveModal',
  component: Component,
} as Meta<typeof ChamberArchiveModal>;

export const Primary = {};
