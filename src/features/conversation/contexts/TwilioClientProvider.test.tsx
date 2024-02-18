import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@/test-utils';
import { TwilioClientContext } from './TwilioClientContext';
import { TwilioClientProvider } from './TwilioClientProvider';

const TestComponent = () => {
  const { client, isInitialized } = useContext(TwilioClientContext);

  return (
    <>
      <p data-testid="isinitialized">{isInitialized ? 'true' : 'false'}</p>
      <p data-testid="isclient">{client ? 'true' : 'false'}</p>
    </>
  );
};

const queryClient = new QueryClient();

describe('ActiveConversationProvider', () => {
  it('activeConversationSid, setActiveConversationSid', async () => {
    const { container, getByTestId } = render(
      <MockedProvider>
        <QueryClientProvider client={queryClient}>
          <TwilioClientProvider>
            <TestComponent />
          </TwilioClientProvider>
        </QueryClientProvider>
      </MockedProvider>,
    );

    expect(container).toBeTruthy();
    expect(getByTestId('isinitialized').textContent).toBe('false');
    expect(getByTestId('isclient').textContent).toBe('false');
  });
});
