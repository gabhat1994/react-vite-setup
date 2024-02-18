import { type Meta } from '@storybook/react';
import { useCallback, useRef } from 'react';

import { Button } from '@/components/Button';
import { EventAttendeesModal } from './EventAttendeesModal';

export default {
  title: 'UI/Event/EventAttendeeModal',
  component: EventAttendeesModal,
} as Meta<typeof EventAttendeesModal>;

export const Primary = () => {
  const ref = useRef<React.ElementRef<typeof EventAttendeesModal>>(null);

  const onOpenModal = useCallback(() => {
    ref.current?.open('', false);
  }, []);

  return (
    <>
      <Button primary onClick={onOpenModal}>
        Toggle
      </Button>
      <EventAttendeesModal ref={ref} />
    </>
  );
};
