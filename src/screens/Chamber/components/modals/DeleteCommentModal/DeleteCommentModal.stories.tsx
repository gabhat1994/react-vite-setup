import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import {
  DeleteCommentModal,
  type DeleteCommentModalProps,
} from './DeleteCommentModal';

export default {
  title: 'UI/Chambers/DeleteCommentModal',
  component: DeleteCommentModal,
  argTypes: {
    elementTitle: {
      control: { type: 'text' },
    },
  },
} as Meta<typeof DeleteCommentModal>;

export const Primary = () => {
  const [isOpen, toggle] = useToggle(false);
  const props: DeleteCommentModalProps = {
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
      <DeleteCommentModal {...props} />
    </>
  );
};

export const ModalWithControls = (props: DeleteCommentModalProps) => (
  <DeleteCommentModal {...props} />
);
