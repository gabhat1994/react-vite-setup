import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@/test-utils';
import { ConversationViewContext } from './ConversationViewContext';
import { ConversationViewProvider } from './ConversationViewProvider';
import { ViewMode } from '../types';

const TestComponent = () => {
  const { viewMode, setViewMode, isNewConversation, setIsNewConversation } =
    useContext(ConversationViewContext);

  return (
    <>
      <p data-testid="viewmode">{viewMode}</p>
      <p data-testid="isnewconversation">
        {isNewConversation ? 'true' : 'false'}
      </p>
      <button type="button" onClick={() => setViewMode(ViewMode.DEFAULT)}>
        set ViewMode
      </button>
      <button type="button" onClick={() => setIsNewConversation(true)}>
        set IsNewConversation
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
            <TestComponent />
          </ConversationViewProvider>
        </QueryClientProvider>
      </MockedProvider>,
    );

    expect(getByTestId('viewmode').textContent).toBe(ViewMode.DEFAULT);
    expect(getByTestId('isnewconversation').textContent).toBe('false');

    await waitFor(() => fireEvent.click(getByText('set ViewMode')));
    expect(getByTestId('viewmode').textContent).toBe(ViewMode.DEFAULT);

    await waitFor(() => fireEvent.click(getByText('set IsNewConversation')));
    expect(getByTestId('isnewconversation').textContent).toBe('true');
  });
});
