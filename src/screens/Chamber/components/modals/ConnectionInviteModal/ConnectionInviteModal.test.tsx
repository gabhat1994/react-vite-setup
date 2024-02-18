import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { intersectionObserver } from '@/test-utils/stubs';
import { cleanup, render, screen } from '@/test-utils';
import { ConnectionInviteModal } from './ConnectionInviteModal';

const onClose = vi.fn();

describe('<ConnectionInviteModal />', () => {
  beforeAll(() => intersectionObserver.mock());
  afterAll(() => {
    cleanup();
    intersectionObserver.restore();
  });
  test('renders', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ConnectionInviteModal
          isOpen={true}
          invitedInfo={{}}
          ownNoumId="testid"
          closeInviteModal={onClose}
        />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('message-text-area');
    expect(modal).toBeInTheDocument();

    const inviteBtn = screen.getByTestId('send-invite-btn');
    expect(inviteBtn).toBeInTheDocument();

    const closeBtn = screen.getByTestId('cancel-invite-btn');
    expect(closeBtn).toBeInTheDocument();
  });
});
