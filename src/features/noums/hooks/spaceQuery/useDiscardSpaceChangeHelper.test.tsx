import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { useDiscardSpaceChangeHelper } from './useDiscardSpaceChangeHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useDiscardSpaceChangeHelper', async () => {
  const { result } = renderHook(() => useDiscardSpaceChangeHelper(), {
    wrapper: Wrapper,
  });

  let isSuccess;

  act(async () => {
    isSuccess = await result.current.discardSpaceChangeHelper('spaceId');

    expect(typeof isSuccess).toBe('boolean');
  });
});
