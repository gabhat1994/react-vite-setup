import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import { useUpdateConnectionStatusHelper } from './useUpdateConnectionStatusHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useUpdateConnectionStatusHelper', async () => {
  const { result } = renderHook(() => useUpdateConnectionStatusHelper(), {
    wrapper: Wrapper,
  });

  act(async () => {
    const isSuccess = await result.current.updateConnectionStatusHelper({
      spaceId: 'spaceId',
      connectionId: 'connectionId',
      status: ConnectionRequestTypeEnum.Declined,
    });

    expect(typeof isSuccess).toBe('boolean');
  });
});
