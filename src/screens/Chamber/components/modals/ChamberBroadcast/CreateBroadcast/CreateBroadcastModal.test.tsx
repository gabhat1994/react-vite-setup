import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { fireEvent, render, screen } from '@/test-utils';
import { CreateBroadcastModal } from './CreateBroadcastModal';

describe('<CreateBroadcastModal />', () => {
  const onClose = vi.fn();

  test('renders', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <CreateBroadcastModal
          isOpen={true}
          onClose={onClose}
          noumId=""
          noumType=""
        />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('chamber-campaign-create-modal');
    expect(modal).toBeInTheDocument();
  });

  test('cancel action works', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <CreateBroadcastModal
          isOpen={true}
          onClose={onClose}
          noumId=""
          noumType=""
        />
      </ApolloProvider>,
    );

    const cancelAction = screen.getByTestId('chamber-campaign-cancel-action');
    expect(cancelAction).toBeInTheDocument();
    fireEvent.click(cancelAction);
    expect(onClose).toHaveBeenCalled();
  });

  test('create action work', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <CreateBroadcastModal
          isOpen={true}
          onClose={onClose}
          noumId=""
          noumType=""
        />
      </ApolloProvider>,
    );

    const createAction = screen.getByTestId('chamber-campaign-create-action');
    expect(createAction).toBeInTheDocument();
  });
});
