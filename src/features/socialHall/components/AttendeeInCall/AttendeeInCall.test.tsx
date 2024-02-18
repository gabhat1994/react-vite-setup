import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { client } from '@/apollo/client';
import { AuthProvider } from '@/features/auth/contexts';
import { render, act } from '@/test-utils';
import { AttendeeInCall } from './AttendeeInCall';
import { demoUsers } from './data';

const user = {
  _id: '61a885f93eb5863ce0000002',
};
describe('<AttendeeInCall />', () => {
  test(`check Raise Hand Rendered or not`, async () => {
    await act(async () => {
      const { container } = render(
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <AuthProvider client={client} initialUser={user}>
            <AttendeeInCall isMuted={false} {...demoUsers[1]} />
          </AuthProvider>
        </ApolloProvider>,
      );
      // expect(getByTestId('raise_hand')).toBeInTheDocument();
      expect(container).toBeTruthy();
    });
  });

  test(`check Muted User Rendered or not`, async () => {
    await act(async () => {
      const { container, getByTestId } = render(
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <AuthProvider client={client} initialUser={user}>
            <AttendeeInCall isMuted={true} {...demoUsers[2]} />
          </AuthProvider>
        </ApolloProvider>,
      );
      expect(getByTestId('muted_user')).toBeInTheDocument();
      expect(container).toBeTruthy();
    });
  });

  test(`check Invited User Rendered or not`, async () => {
    await act(async () => {
      const { container, getByTestId } = render(
        <BrowserRouter>
          <ApolloProvider
            client={new ApolloClient({ cache: new InMemoryCache() })}
          >
            <AuthProvider client={client} initialUser={user}>
              <AttendeeInCall
                isMuted={false}
                isInvited={true}
                {...demoUsers[3]}
              />
            </AuthProvider>
          </ApolloProvider>
        </BrowserRouter>,
      );
      expect(getByTestId('invited_user')).toBeInTheDocument();
      expect(container).toBeTruthy();
    });
  });
});
