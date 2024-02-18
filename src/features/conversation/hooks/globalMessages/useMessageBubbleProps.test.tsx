import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@/test-utils';
import { useMessageBubbleProps } from './useMessageBubbleProps';
import { mockedMessage } from '../../mocks';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useMessageBubbleProps', () => {
  test('hook methods', () => {
    const message = mockedMessage();
    const { result } = renderHook(() => useMessageBubbleProps({ message }), {
      wrapper,
    });

    expect(result.current.pendingMessageBubbleProps?.message).toBeUndefined();
    expect(result.current.messageBubbleProps?.message).toBe(message.body);
  });
});
