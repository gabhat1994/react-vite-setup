import { ApolloProvider } from '@apollo/client';
import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { getClient, getLink } from '@/apollo/client';

import { useToggle } from '@/hooks/toggle';
import { ElementDelete } from './Modal';

const Component = ({ ...args }) => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ApolloProvider client={getClient(getLink(args.authorizationToken))}>
        <ElementDelete
          isOpen={isOpen}
          handleClose={toggle}
          spaceId={args.spaceId}
          elementId={args.elementId}
          elementTitle={args.elementTitle}
          elementType={args.elementType}
        />
      </ApolloProvider>
    </>
  );
};

export default {
  title: 'UI/Chambers/ElementDelete',
  component: Component,
} as Meta<typeof ElementDelete>;

export const Primary = {
  args: {
    authorizationToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVkQXQiOjE2MzU1MTY0MTYsImNyZWF0ZWRBdCI6MTYzNTM0MzYxNiwiX2lkIjoiNjBlODA1MWY5ODZkNjA1MTgyYzg1YWY3In0._Hr4euAUaslkDmcFetFppq3zEhk5J_HpE1NhlSjT0zY',
    spaceId: '6254515c5e1600ac5743ba49',
    elementId: '625f8e1801c890444800b2b5',
    elementTitle: 'My Element',
    elementType: 'Test',
  },
};
