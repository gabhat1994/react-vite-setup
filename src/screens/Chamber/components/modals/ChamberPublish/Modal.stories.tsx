import { ApolloProvider } from '@apollo/client';
import { type Meta } from '@storybook/react';
import { getClient, getLink } from '@/apollo/client';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import { ToastProvider } from '@/providers';

import ChamberPublish from './Modal';

const Component = ({ ...args }) => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ToastProvider>
        <ApolloProvider client={getClient(getLink(args.authorizationToken))}>
          <ChamberPublish
            handleClickInfo={() => {}}
            isOpen={isOpen}
            handleClose={toggle}
            spaceId={args.spaceId}
            isHomeNoum={false}
          />
        </ApolloProvider>
      </ToastProvider>
    </>
  );
};

export default {
  title: 'UI/Chambers/ChamberPublish',
  component: Component,
} as Meta<typeof ChamberPublish>;

export const Primary = {
  args: {
    authorizationToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVkQXQiOjE2MzU1MTY0MTYsImNyZWF0ZWRBdCI6MTYzNTM0MzYxNiwiX2lkIjoiNjBlODA1MWY5ODZkNjA1MTgyYzg1YWY3In0._Hr4euAUaslkDmcFetFppq3zEhk5J_HpE1NhlSjT0zY',
    spaceId: '617926f92ae574733e43a826',
  },
};
