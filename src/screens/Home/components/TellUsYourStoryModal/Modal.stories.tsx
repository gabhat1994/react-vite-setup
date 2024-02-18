import { ApolloProvider } from '@apollo/client';
import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { getClient, getLink } from '@/apollo/client';

import { useToggle } from '@/hooks/toggle';
import useEvent from '@/hooks/useEvent';
import { TellUsYourStoryModal } from './Modal';

const Component = ({ ...args }) => {
  const [isOpen, toggle] = useToggle(false);

  const handleClose = useEvent(() => {
    toggle();
  });

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ApolloProvider client={getClient(getLink(args.authorizationToken))}>
        <TellUsYourStoryModal
          open={isOpen}
          onClose={handleClose}
          calendlyData={undefined}
        />
      </ApolloProvider>
    </>
  );
};

export default {
  title: 'UI/Home/TellUsYourStoryModal',
  component: Component,
} as Meta<typeof TellUsYourStoryModal>;

export const Primary = {
  args: {
    authorizationToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVkQXQiOjE2MzU1MTY0MTYsImNyZWF0ZWRBdCI6MTYzNTM0MzYxNiwiX2lkIjoiNjBlODA1MWY5ODZkNjA1MTgyYzg1YWY3In0._Hr4euAUaslkDmcFetFppq3zEhk5J_HpE1NhlSjT0zY',
  },
  space: {},
};
