import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { ProjectChamberType } from '@/apollo/generated/types';
import { useUpdateChamberProjectTypeHelper } from './useUpdateChamberProjectTypeHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useUpdateNoumVisibilitySettings', async () => {
  const { result } = renderHook(() => useUpdateChamberProjectTypeHelper(), {
    wrapper: Wrapper,
  });

  act(async () => {
    const resp = await result.current.updateChamberProjectTypeHelper(
      '',
      ProjectChamberType.Private,
    );
    expect(typeof resp).toBe('void');
  });
});
