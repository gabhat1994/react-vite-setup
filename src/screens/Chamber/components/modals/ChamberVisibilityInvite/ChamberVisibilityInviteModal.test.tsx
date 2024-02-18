import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { cleanup, render } from '@/test-utils';
import { ChamberVisibilityInviteModal } from './ChamberVisibilityInviteModal';

describe('<ChamberVisibilityInviteModal />', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders', () => {
    const handleClose = vi.fn();
    const { getByTestId, container } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <ChamberVisibilityInviteModal
            linkedNoums={[]}
            isOpen={true}
            handleClose={handleClose}
            spaceId="6290433d08848e8992d9bfa2"
            isSEOEnabled={false}
          />
        </ApolloProvider>
      </BrowserRouter>,
    );
    expect(getByTestId('chamber-visibility-invite-modal')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
