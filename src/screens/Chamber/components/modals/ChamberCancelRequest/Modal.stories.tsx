import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';

import { ChamberCancelRequest } from './Modal';

const Component = () => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      {isOpen && (
        <ChamberCancelRequest
          spaceName="Space name"
          onCancelRequest={() => null}
          onClose={toggle}
        />
      )}
    </>
  );
};

export default {
  title: 'UI/Chambers/ChamberCancelRequest',
  component: Component,
} as Meta<typeof ChamberCancelRequest>;

export const Primary = {};
