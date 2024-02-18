import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@/test-utils';
import { ConversationViewProvider } from '@/features/conversation/contexts/ConversationViewProvider';
import {
  GlobalMessageContext,
  GlobalMessageProvider,
} from './GlobalMessageProvider';

const TestComponent = () => {
  const {
    notExistsConversation,
    setNotExistsConversation,
    selectedTabId,
    setSelectedTabId,
  } = useContext(GlobalMessageContext);

  return (
    <>
      <p data-testid="notExistsConversation">
        {notExistsConversation ? 'true' : 'false'}
      </p>
      <button type="button" onClick={() => setNotExistsConversation(false)}>
        set NotExistsConversation
      </button>
      <p data-testid="selectedTabId">{selectedTabId}</p>
      <button type="button" onClick={() => setSelectedTabId(1)}>
        set tab
      </button>
    </>
  );
};

const queryClient = new QueryClient();

describe('GlobalMessageProvider', () => {
  it('all vars', async () => {
    const { getByText, getByTestId } = render(
      <MockedProvider>
        <QueryClientProvider client={queryClient}>
          <ConversationViewProvider>
            <GlobalMessageProvider>
              <TestComponent />
            </GlobalMessageProvider>
          </ConversationViewProvider>
        </QueryClientProvider>
      </MockedProvider>,
    );

    expect(getByTestId('notExistsConversation').textContent).toBe('true');
    expect(getByTestId('selectedTabId').textContent).toBe('0');

    await waitFor(() =>
      fireEvent.click(getByText('set NotExistsConversation')),
    );
    await waitFor(() => fireEvent.click(getByText('set tab')));

    expect(getByTestId('notExistsConversation').textContent).toBe('false');
    expect(getByTestId('selectedTabId').textContent).toBe('1');
  });
});
