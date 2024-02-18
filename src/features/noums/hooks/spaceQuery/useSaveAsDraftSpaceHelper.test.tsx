import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { useSaveAsDraftSpaceHelper } from './useSaveAsDraftSpaceHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useSaveAsDraftSpaceHelper', async () => {
  const { result } = renderHook(() => useSaveAsDraftSpaceHelper(), {
    wrapper: Wrapper,
  });

  let isSuccess;

  act(async () => {
    isSuccess = await result.current.saveAsDraftSpaceHelper('spaceId');

    expect(typeof isSuccess).toBe('boolean');
  });
});
