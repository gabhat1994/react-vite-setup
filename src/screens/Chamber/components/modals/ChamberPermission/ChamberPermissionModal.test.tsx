import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { intersectionObserver } from '@/test-utils/stubs';
import { cleanup, render } from '@/test-utils';
import { ChamberPermissionModal } from './ChamberPermissionModal';

describe('<ChamberPermissionModal />', () => {
  beforeAll(() => intersectionObserver.mock());
  afterAll(() => {
    cleanup();
    intersectionObserver.restore();
  });

  it('renders', () => {
    const onInvite = vi.fn();
    const handleClose = vi.fn();
    const { getByTestId, container } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <ChamberPermissionModal
          spaceId="62ab39b8e6a0ce000d92e67c"
          isOpen={true}
          onInvite={onInvite}
          onClose={handleClose}
        />
      </ApolloProvider>,
    );
    expect(getByTestId('chamber-permission-modal')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
