import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import { ChamberRestoreModal } from './ChamberRestoreModal';
import { type ChamberRestoreModalProps } from './types';

export default {
  title: 'UI/Chambers/ChamberActionModal/Restore',
  component: ChamberRestoreModal,
  argTypes: {
    version: {
      control: { type: 'text' },
    },
  },
} as Meta<typeof ChamberRestoreModal>;

export const Primary = () => {
  const [isOpen, toggle] = useToggle(false);
  const props: ChamberRestoreModalProps = {
    spaceId: 'testSpaceId',
    isOpen,
    version: '2022-05-20T15:13:57.573Z',
    cancelCallback: () => {
      toggle();
    },
    sucessCallback: () => {
      toggle();
    },
  };

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ChamberRestoreModal {...props} />
    </>
  );
};

export const ModalWithControls = {};
