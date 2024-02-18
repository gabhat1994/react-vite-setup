import { type Meta } from '@storybook/react';
import { MockedProvider } from '@apollo/client/testing';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import { ChamberVisibilityInviteModal } from './ChamberVisibilityInviteModal';
import { mockdata } from './mockdata';

export default {
  title: 'UI/Chambers/ChamberVisibilityInviteModal',
  component: ChamberVisibilityInviteModal,
} as Meta<typeof ChamberVisibilityInviteModal>;

export const Primary = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <MockedProvider mocks={mockdata}>
        <ChamberVisibilityInviteModal
          linkedNoums={[]}
          isOpen={isOpen}
          handleClose={toggle}
          spaceId="6297245dc35418000ea0ab05"
        />
      </MockedProvider>
    </>
  );
};
