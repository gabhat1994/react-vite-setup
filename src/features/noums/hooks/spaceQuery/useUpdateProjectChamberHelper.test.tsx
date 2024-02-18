import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { type SpaceUpdateInput } from '@/apollo/generated/types';
import { useUpdateProjectChamberHelper } from './useUpdateProjectChamberHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('updateProjectChamberHelper', async () => {
  const { result } = renderHook(() => useUpdateProjectChamberHelper(), {
    wrapper: Wrapper,
  });

  let isSuccess;

  act(async () => {
    isSuccess = await result.current.updateProjectChamberHelper(
      'spaceId',
      {} as SpaceUpdateInput,
    );

    expect(typeof isSuccess).toBe('boolean');
  });
});
