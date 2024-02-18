import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import { HandsUpModal } from './HandsUpModal';

export default {
  title: 'UI/SocialHall/HandsUpModal',
  component: HandsUpModal,
} as Meta<typeof HandsUpModal>;

export const Primary = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Show Hands Up Modal
      </Button>
      <HandsUpModal isOpen={isOpen} onClose={toggle} onConfirm={toggle} />
    </>
  );
};
