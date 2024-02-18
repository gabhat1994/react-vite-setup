import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { useUpdateElementHelper } from './useUpdateElementHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useUpdateElementHelper', async () => {
  const { result } = renderHook(() => useUpdateElementHelper(), {
    wrapper: Wrapper,
  });

  let isSuccess;

  act(async () => {
    isSuccess = await result.current.updateElementHelper('spaceId', []);

    expect(typeof isSuccess).toBe('boolean');
  });
});
