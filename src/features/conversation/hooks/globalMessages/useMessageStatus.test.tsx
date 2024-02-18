import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@/test-utils';
import { useMessageStatus } from './useMessageStatus';
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
    const message = mockedMessage();
    const { result } = renderHook(() => useMessageStatus({ message }), {
      wrapper,
    });

    expect(result.current?.status).toBeUndefined();
  });
});
