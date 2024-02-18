import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { useExitSocialHall } from './useExitSocialHall';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('should remove user from social hall', async () => {
  const { result } = renderHook(() => useExitSocialHall(), {
    wrapper: Wrapper,
  });

  act(async () => {
    const resp = await result.current.exitFromSocialHall();
    expect(typeof resp).toBe('undefined');
  });
});

it('should remove user from social hall group', async () => {
  const { result } = renderHook(() => useExitSocialHall(), {
    wrapper: Wrapper,
  });

  act(async () => {
    const resp = await result.current.exitFromSocialHallGroup('1');
    expect(typeof resp).toBe('undefined');
  });
});
