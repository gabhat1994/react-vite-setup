import { type Meta } from '@storybook/react';
import { MockedProvider } from '@apollo/client/testing';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import { InviteAttendeeModal } from './InviteAttendeeModal';
import { usersMock } from './mock';

export default {
  title: 'UI/SocialHall/InviteAttendeeModal',
  component: InviteAttendeeModal,
} as Meta<typeof InviteAttendeeModal>;

export const Primary = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      {isOpen && (
        <MockedProvider addTypename={false} mocks={[usersMock]}>
          <InviteAttendeeModal isOpen={isOpen} handleClose={toggle} />
        </MockedProvider>
      )}
    </>
  );
};
