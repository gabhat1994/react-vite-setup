import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { type SpaceUpdateInput } from '@/apollo/generated/types';
import { useUpdateSpaceHelper } from './useUpdateSpaceHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useUpdateSpaceHelper', async () => {
  const { result } = renderHook(() => useUpdateSpaceHelper(), {
    wrapper: Wrapper,
  });

  let isSuccess;

  act(async () => {
    isSuccess = await result.current.updateSpaceHelper(
      'spaceId',
      {} as SpaceUpdateInput,
    );

    expect(typeof isSuccess).toBe('boolean');
  });
});
