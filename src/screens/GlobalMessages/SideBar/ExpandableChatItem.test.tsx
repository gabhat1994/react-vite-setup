import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@/test-utils';
import { type NoumGroupConversationItem } from '@/apollo/generated/types';
import { ExpandableChatItem } from './ExpandableChatItem';

const conversationItem = {
  noum: { _id: 'test_noum', name: 'Test Noum', profileImage: 'test_image' },
  conversationsCount: 1,
  unread: 0,
  conversations: [
    {
      conversation: {
        _id: 'conversation_id',
        cid: 'conversation_cid',
      },
    },
  ],
} as NoumGroupConversationItem;

// To bypass ResizeObserver error
class ResizeObserver {
  // eslint-disable-next-line class-methods-use-this
  observe() {}

  // eslint-disable-next-line class-methods-use-this
  unobserve() {}

  // eslint-disable-next-line class-methods-use-this
  disconnect() {}
}

describe('<ExpandableChatItem />', () => {
  window.ResizeObserver = ResizeObserver;

  test('rendering test', () => {
    const { container } = render(
      <MockedProvider>
        <QueryClientProvider client={new QueryClient()}>
          <ExpandableChatItem
            conversationItem={conversationItem}
            activeConversationSid=""
            isNewConversation={false}
            handleClickItem={() => {}}
          />
        </QueryClientProvider>
      </MockedProvider>,
    );

    expect(container).toBeTruthy();
  });
});
