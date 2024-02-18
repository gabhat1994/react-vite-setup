import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { fireEvent, render, screen } from '@/test-utils';
import { DeleteChamberBroadcastModal } from './DeleteBroadcastModal';

describe('<DeleteBroadcastModal />', () => {
  const onClose = vi.fn();
  const onRefetchCampaigns = vi.fn();
  test('renders', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <DeleteChamberBroadcastModal
          isOpen={true}
          onClose={onClose}
          campaignId=""
          onRefetchCampaigns={onRefetchCampaigns}
        />
      </ApolloProvider>,
    );

    const modal = screen.getByTestId('chamber-campaign-delete-modal');
    expect(modal).toBeInTheDocument();
  });

  test('handle cancel broadcast', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <DeleteChamberBroadcastModal
          isOpen={true}
          onClose={onClose}
          campaignId=""
          onRefetchCampaigns={onRefetchCampaigns}
        />
      </ApolloProvider>,
    );

    const handleCancel = screen.getByTestId('chamber-broadcast-cancel-btn');
    expect(handleCancel).toBeInTheDocument();
  });

  test('handle go back broadcast', () => {
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <DeleteChamberBroadcastModal
          isOpen={true}
          onClose={onClose}
          campaignId=""
          onRefetchCampaigns={onRefetchCampaigns}
        />
      </ApolloProvider>,
    );

    const handleGoBack = screen.getByTestId('chamber-broadcast-cancel-no-btn');
    expect(handleGoBack).toBeInTheDocument();

    fireEvent.click(handleGoBack);
    expect(onClose).toHaveBeenCalled();
  });
});
