import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';

import { ChamberUnfollow } from './Modal';

const Component = () => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      {isOpen && (
        <ChamberUnfollow
          spaceName="Space name"
          onUnfollow={() => null}
          onClose={toggle}
        />
      )}
    </>
  );
};

export default {
  title: 'UI/Chambers/ChamberUnfollow',
  component: Component,
} as Meta<typeof ChamberUnfollow>;

export const Primary = {};
