import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import { EventModal } from './EventModal';
import {
  attendeeLeaveEventModalData,
  cancelEventModalData,
  countDownModalData,
  endEventModalData,
  hostEndedModalData,
  hostFinishMainEventModalData,
  hostLeaveEventModalData,
  kickedOutModalData,
  kickUserModalData,
  waitingHostModalData,
} from './data';

export default {
  title: 'UI/SocialHall/EventModal',
  component: EventModal,
} as Meta<typeof EventModal>;

export const CancelEventModal = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Show Cancel Event Modal
      </Button>
      <EventModal
        isOpen={isOpen}
        onClose={toggle}
        onConfirm={toggle}
        {...cancelEventModalData}
      />
    </>
  );
};

export const EndEventModal = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Show End Event Modal
      </Button>
      <EventModal
        isOpen={isOpen}
        onClose={toggle}
        onConfirm={toggle}
        {...endEventModalData}
      />
    </>
  );
};

export const KickUserModal = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Show Kick User Modal
      </Button>
      <EventModal
        isOpen={isOpen}
        onClose={toggle}
        onConfirm={toggle}
        {...kickUserModalData('Anna Smith')}
      />
    </>
  );
};

export const HostLeaveEventModal = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Show Host Leave Event Modal
      </Button>
      <EventModal
        isOpen={isOpen}
        onClose={toggle}
        onConfirm={toggle}
        {...hostLeaveEventModalData}
      />
    </>
  );
};

export const AttendeeLeaveEventModal = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Show Attendee Leave Event Modal
      </Button>
      <EventModal
        isOpen={isOpen}
        onClose={toggle}
        onConfirm={toggle}
        isConfirmButtonPrimary
        {...attendeeLeaveEventModalData}
      />
    </>
  );
};

export const EventFinishedModal = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Show Event Finished Modal
      </Button>
      <EventModal
        isOpen={isOpen}
        onClose={toggle}
        {...hostFinishMainEventModalData}
      />
    </>
  );
};

export const EventEndedModal = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Show Event Ended Modal
      </Button>
      <EventModal isOpen={isOpen} onClose={toggle} {...hostEndedModalData} />
    </>
  );
};

export const KickedOutModal = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Show Kicked Out Modal
      </Button>
      <EventModal isOpen={isOpen} onClose={toggle} {...kickedOutModalData} />
    </>
  );
};

export const WaitingHostModal = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Show Waiting Host Modal
      </Button>
      <EventModal isOpen={isOpen} onClose={toggle} {...waitingHostModalData} />
    </>
  );
};

export const CountDownModal = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Show Count Down Modal
      </Button>
      <EventModal
        isOpen={isOpen}
        countDown={true}
        onClose={toggle}
        {...countDownModalData}
      />
    </>
  );
};
