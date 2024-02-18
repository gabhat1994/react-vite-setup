import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { useRemoveElementHelper } from './useRemoveElementHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useRemoveElementHelper', async () => {
  const { result } = renderHook(() => useRemoveElementHelper(), {
    wrapper: Wrapper,
  });

  let isSuccess;

  act(async () => {
    isSuccess = await result.current.removeElementHelper(
      'spaceId',
      'elementId',
    );

    expect(typeof isSuccess).toBe('boolean');
  });
});
