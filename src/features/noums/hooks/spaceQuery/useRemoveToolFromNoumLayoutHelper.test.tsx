import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { useRemoveToolFromNoumLayoutHelper } from './useRemoveToolFromNoumLayoutHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useRemoveToolFromNoumLayoutHelper', async () => {
  const { result } = renderHook(() => useRemoveToolFromNoumLayoutHelper(), {
    wrapper: Wrapper,
  });

  let isSuccess;

  act(async () => {
    isSuccess = await result.current.removeToolFromNoumLayoutHelper(
      'toolId',
      'spaceId',
    );

    expect(typeof isSuccess).toBe('boolean');
  });
});
