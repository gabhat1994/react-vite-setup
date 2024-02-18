import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import {
  KnockMessageModalTypeEnum,
  KnockMessageSelectModal,
} from './KnockMessageSelectModal';

export default {
  title: 'UI/SocialHall/KnockMessageSelectModal',
  component: KnockMessageSelectModal,
} as Meta<typeof KnockMessageSelectModal>;

export const KnockMessageModal = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <KnockMessageSelectModal
        isOpen={isOpen}
        onClose={toggle}
        modalType={KnockMessageModalTypeEnum.knock}
      />
    </>
  );
};

export const DeclineMessageModal = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <KnockMessageSelectModal
        isOpen={isOpen}
        onClose={toggle}
        modalType={KnockMessageModalTypeEnum.decline}
      />
    </>
  );
};
