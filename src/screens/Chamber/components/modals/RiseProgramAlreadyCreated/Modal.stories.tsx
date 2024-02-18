import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';

import { RiseProgramAlreadyCreated } from './Modal';

const Component = () => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      {isOpen && (
        <RiseProgramAlreadyCreated
          open={isOpen}
          onClose={toggle}
          riseApplicationNoumId="dgtrjkfvgrvggrbvgrv"
        />
      )}
    </>
  );
};

export default {
  title: 'UI/Chambers/RiseProgramAlreadyCreated',
  component: Component,
} as Meta<typeof RiseProgramAlreadyCreated>;

export const Primary = {};
