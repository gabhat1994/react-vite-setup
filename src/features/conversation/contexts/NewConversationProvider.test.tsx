import { useContext, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@/test-utils';
import { mockUsers } from '../mocks';
import { ConversationViewContext } from './ConversationViewContext';
import { ConversationViewProvider } from './ConversationViewProvider';
import { NewConversationContext } from './NewConversationContext';
import { NewConversationProvider } from './NewConversationProvider';

const TestComponent = () => {
  const { setIsNewConversation } = useContext(ConversationViewContext);

  const {
    isConversationCreatable,
    loading,
    selectedUsers,
    setSelectedUsers,
    createNewConversation,
    createHomeNoumNewConversation,
  } = useContext(NewConversationContext);

  useEffect(() => {
    if (selectedUsers.length > 0) {
      setIsNewConversation(true);
    } else {
      setIsNewConversation(false);
    }
  }, [selectedUsers, setIsNewConversation]);

  return (
    <>
      <p data-testid="isconversationcreatable">
        {isConversationCreatable ? 'true' : 'false'}
      </p>
      <p data-testid="loading">{loading ? 'true' : 'false'}</p>
      <p data-testid="selecteduserslength">{selectedUsers.length}</p>
      <button type="button" onClick={() => setSelectedUsers(mockUsers(3))}>
        setSelectedUsers
      </button>
      <button type="button" onClick={() => createNewConversation()}>
        createNewConversation
      </button>
      <button type="button" onClick={() => createHomeNoumNewConversation()}>
        createHomeNoumNewConversation
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
            <NewConversationProvider>
              <TestComponent />
            </NewConversationProvider>
          </ConversationViewProvider>
        </QueryClientProvider>
      </MockedProvider>,
    );

    expect(getByTestId('isconversationcreatable').textContent).toBe('false');
    expect(getByTestId('loading').textContent).toBe('false');
    expect(getByTestId('selecteduserslength').textContent).toBe('0');

    await waitFor(() => fireEvent.click(getByText('setSelectedUsers')));
    expect(getByTestId('selecteduserslength').textContent).toBe('3');
    expect(getByTestId('isconversationcreatable').textContent).toBe('true');

    await waitFor(() => fireEvent.click(getByText('createNewConversation')));
    await waitFor(() =>
      fireEvent.click(getByText('createHomeNoumNewConversation')),
    );
  });
});
