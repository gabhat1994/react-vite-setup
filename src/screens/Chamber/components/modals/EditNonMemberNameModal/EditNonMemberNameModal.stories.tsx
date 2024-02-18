import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import { EditNonMemberNameModal } from './EditNonMemberNameModal';
import { type EditNonMemberNameModalProps } from './types';

export default {
  title: 'UI/Chambers/Modal/EditNonMemberNameModal',
  component: EditNonMemberNameModal,
} as Meta<typeof EditNonMemberNameModal>;

export const Primary = () => {
  const [isOpen, toggle] = useToggle(false);

  const props: EditNonMemberNameModalProps = {
    title: 'Enter Your Name',
    isOpen,
    cancelCallback: () => {
      toggle();
    },
    confirmCallback: () => {
      toggle();
    },
  };

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <EditNonMemberNameModal {...props} />
    </>
  );
};
