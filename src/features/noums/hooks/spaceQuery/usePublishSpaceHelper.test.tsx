import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { usePublishSpaceHelper } from './usePublishSpaceHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('usePublishSpaceHelper', async () => {
  const { result } = renderHook(() => usePublishSpaceHelper(), {
    wrapper: Wrapper,
  });

  let isSuccess;

  act(async () => {
    isSuccess = await result.current.publishSpaceHelper('spaceId', undefined);

    expect(typeof isSuccess).toBe('boolean');
  });
});
