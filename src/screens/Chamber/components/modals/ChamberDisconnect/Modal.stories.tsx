import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';

import { ChamberDisconnect } from './Modal';

const Component = () => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      {isOpen && (
        <ChamberDisconnect
          spaceName="Space name"
          onDisconnect={() => null}
          onClose={toggle}
        />
      )}
    </>
  );
};

export default {
  title: 'UI/Chambers/ChamberDisconnect',
  component: Component,
} as Meta<typeof ChamberDisconnect>;

export const Primary = {};
