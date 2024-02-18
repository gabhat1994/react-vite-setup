import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@/test-utils';
import { ActiveConversationContext } from './ActiveConversationContext';
import { ActiveConversationProvider } from './ActiveConversationProvider';
import { mockedUnsentMessage } from '../mocks';

const unsentMessage = mockedUnsentMessage();

const TestComponent = () => {
  const {
    activeConversationSid,
    setActiveConversationSid,
    addPendingMessage,
    updatePendingMessage,
    removePendingMessage,
    resendErrorMessage,
    pendingMessages,
  } = useContext(ActiveConversationContext);

  return (
    <>
      <p>{activeConversationSid}</p>
      <p>{pendingMessages.length}</p>
      <button type="button" onClick={() => setActiveConversationSid('12345')}>
        set active conversation
      </button>
      <button type="button" onClick={() => addPendingMessage(unsentMessage)}>
        add pending message
      </button>
      <button
        type="button"
        onClick={() =>
          updatePendingMessage('messageId', { status: { status: 'sent' } })
        }
      >
        update pending message
      </button>
      <button type="button" onClick={() => removePendingMessage('messageId')}>
        remove pending message
      </button>
      <button type="button" onClick={() => resendErrorMessage('messageId')}>
        resend error message
      </button>
    </>
  );
};

const queryClient = new QueryClient();

describe('ActiveConversationProvider', () => {
  it('activeConversationSid, setActiveConversationSid', async () => {
    const { getByText } = render(
      <MockedProvider>
        <QueryClientProvider client={queryClient}>
          <ActiveConversationProvider>
            <TestComponent />
          </ActiveConversationProvider>
        </QueryClientProvider>
      </MockedProvider>,
    );

    await waitFor(() => fireEvent.click(getByText('set active conversation')));
    expect(getByText('12345')).toBeInTheDocument();

    await waitFor(() => fireEvent.click(getByText('add pending message')));
    await waitFor(() => fireEvent.click(getByText('update pending message')));
    await waitFor(() => fireEvent.click(getByText('remove pending message')));
    await waitFor(() => fireEvent.click(getByText('resend error message')));
  });
});
