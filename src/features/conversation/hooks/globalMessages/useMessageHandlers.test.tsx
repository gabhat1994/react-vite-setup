import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@/test-utils';
import { useMessageHandlers } from './useMessageHandlers';
import { mockedMessage } from '../../mocks';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useMessageHandlers', () => {
  test('hook methods', () => {
    const { result } = renderHook(() => useMessageHandlers(), {
      wrapper,
    });

    act(async () => {
      const added = await result.current.addMessage({
        message: mockedMessage(),
      });
      expect(added).toBeUndefined();
    });
  });
});
