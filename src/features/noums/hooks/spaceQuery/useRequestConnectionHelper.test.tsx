import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { useRequestConnectionHelper } from './useRequestConnectionHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useRequestConnectionHelper', async () => {
  const { result } = renderHook(() => useRequestConnectionHelper(), {
    wrapper: Wrapper,
  });

  act(async () => {
    const isSuccess = await result.current.requestConnectionHelper(
      'ownSpaceId',
      'requestedSpaceId',
    );

    expect(typeof isSuccess).toBe('boolean');
  });
});
