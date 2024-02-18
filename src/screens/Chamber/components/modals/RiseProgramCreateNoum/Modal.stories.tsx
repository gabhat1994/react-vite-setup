import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';

import { RiseProgramCreateNoum } from './Modal';

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
      {isOpen && (
        <RiseProgramCreateNoum
          onClose={toggle}
          setOpenAlreadyCreated={handleSuccess}
          setRiseApplicationNoumId={handleSuccess}
        />
      )}
    </>
  );
};

export default {
  title: 'UI/Chambers/RiseProgramCreateNoum',
  component: Component,
} as Meta<typeof RiseProgramCreateNoum>;

export const Primary = {};
