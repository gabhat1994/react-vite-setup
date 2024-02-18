import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { FollowActionEnum } from '@/apollo/generated/types';
import { useHandleFollowHelper } from './useHandleFollowHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useHandleFollowHelper', async () => {
  const { result } = renderHook(() => useHandleFollowHelper(), {
    wrapper: Wrapper,
  });

  act(async () => {
    const isSuccess = await result.current.handleFollowHelper(
      'spaceId',
      FollowActionEnum.Follow,
    );

    expect(typeof isSuccess).toBe('boolean');
  });

  act(async () => {
    const isSuccess = await result.current.handleFollowHelper(
      'spaceId',
      FollowActionEnum.Unfollow,
    );

    expect(typeof isSuccess).toBe('boolean');
  });
});
