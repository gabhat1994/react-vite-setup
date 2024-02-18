import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { useUpdateConnectionPermissionHelper } from './useUpdateConnectionPermissionHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useUpdateChamberProjectType', async () => {
  const { result } = renderHook(() => useUpdateConnectionPermissionHelper(), {
    wrapper: Wrapper,
  });

  act(async () => {
    const resp = await result.current.updateConnectionPermissionHelper({
      connectionsPermissions: [],
    });
    expect(typeof resp).toBe('void');
  });
});
