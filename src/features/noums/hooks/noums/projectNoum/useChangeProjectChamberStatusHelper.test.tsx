import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { SpaceStatusEnum } from '@/apollo/generated/types';
import { useChangeProjectChamberStatusHelper } from './useChangeProjectChamberStatusHelper';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useChangeProjectChamberStatus', async () => {
  const { result } = renderHook(() => useChangeProjectChamberStatusHelper(), {
    wrapper: Wrapper,
  });

  act(async () => {
    const resp = await result.current.changeProjectChamberStatusHelper(
      '',
      SpaceStatusEnum.Archived,
    );
    expect(typeof resp).toBe('void');
  });
});
