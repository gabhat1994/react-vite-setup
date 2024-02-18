import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@/test-utils';
import { ViewMode } from '@/features/conversation/types';
import { ConversationViewProvider } from '@/features/conversation/contexts/ConversationViewProvider';
import {
  MessageElementContext,
  MessageElementProvider,
} from './MessageElementProvider';

const TestComponent = () => {
  const {
    viewMode,
    setViewMode,
    isNewConversation,
    setIsNewConversation,
    isOthersConversations,
    setIsOthersConversations,
    unreadMessages,
    setUnreadMessages,
  } = useContext(MessageElementContext);

  return (
    <>
      <p data-testid="viewmode">{viewMode}</p>
      <button type="button" onClick={() => setViewMode(ViewMode.DEFAULT)}>
        set ViewMode
      </button>
      <p data-testid="unreadmessages">{unreadMessages}</p>
      <button type="button" onClick={() => setUnreadMessages(10)}>
        set UnreadMessages
      </button>
      <p data-testid="isnewconversation">
        {isNewConversation ? 'true' : 'false'}
      </p>
      <button type="button" onClick={() => setIsNewConversation(true)}>
        set IsNewConversation
      </button>
      <p data-testid="isothersconversation">
        {isOthersConversations ? 'true' : 'false'}
      </p>
      <button type="button" onClick={() => setIsOthersConversations(true)}>
        set IsOthersConversations
      </button>
    </>
  );
};

const queryClient = new QueryClient();

describe('ActiveConversationProvider', () => {
  it('activeConversationSid, setActiveConversationSid', async () => {
    const { getByText, getByTestId } = render(
      <MockedProvider>
        <QueryClientProvider client={queryClient}>
          <ConversationViewProvider>
            <MessageElementProvider>
              <TestComponent />
            </MessageElementProvider>
          </ConversationViewProvider>
        </QueryClientProvider>
      </MockedProvider>,
    );

    expect(getByTestId('viewmode').textContent).toBe(ViewMode.DEFAULT);
    expect(getByTestId('unreadmessages').textContent).toBe('0');
    expect(getByTestId('isnewconversation').textContent).toBe('false');
    expect(getByTestId('iscollapse').textContent).toBe('true');
    expect(getByTestId('isothersconversation').textContent).toBe('false');

    await waitFor(() => fireEvent.click(getByText('set ViewMode')));
    await waitFor(() => fireEvent.click(getByText('set IsNewConversation')));
    await waitFor(() => fireEvent.click(getByText('set IsCollapse')));
    await waitFor(() =>
      fireEvent.click(getByText('set IsOthersConversations')),
    );
    await waitFor(() => fireEvent.click(getByText('set UnreadMessages')));

    expect(getByTestId('viewmode').textContent).toBe(ViewMode.DEFAULT);
    expect(getByTestId('unreadmessages').textContent).toBe('10');
    expect(getByTestId('isnewconversation').textContent).toBe('true');
    expect(getByTestId('iscollapse').textContent).toBe('false');
    expect(getByTestId('isothersconversation').textContent).toBe('true');
  });
});
