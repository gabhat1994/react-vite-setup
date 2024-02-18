import { type FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@/test-utils';
import { useMediaMessageBubble } from './useMediaMessageBubble';

const wrapper: FC = ({ children }) => (
  <MockedProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </MockedProvider>
);

describe('custom hook: useMediaMessageBubble', () => {
  test('hook methods', async () => {
    const { result } = renderHook(() => useMediaMessageBubble({}), {
      wrapper,
    });

    expect(result.current.isLoadingMedia).toBeTruthy();
    expect(result.current.isLoaded).toBeFalsy();
    expect(result.current.isPending).toBeFalsy();
    expect(result.current.mediaUrl).toBeFalsy();
    expect(result.current.pendingUrl).toBeFalsy();

    await act(async () => {
      const inited = await result.current.initMedia();
      expect(inited).toBeUndefined();
    });
    await act(async () => {
      result.current.setLoadingMedia(true);
      expect(result.current.isLoadingMedia).toBeTruthy();
    });
  });
});
