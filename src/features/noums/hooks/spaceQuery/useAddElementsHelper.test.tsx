import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { type CreateElementInput } from '@/apollo/generated/types';
import { useAddElementsHelper } from './useAddElementsHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useAddElementsHelper', async () => {
  const { result } = renderHook(() => useAddElementsHelper(), {
    wrapper: Wrapper,
  });

  let isSuccess;

  act(async () => {
    isSuccess = await result.current.addElementsHelper(
      'spaceId',
      [] as CreateElementInput[],
    );

    expect(typeof isSuccess).toBe('boolean');
  });
});
