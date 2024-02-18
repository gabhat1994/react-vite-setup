import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { useInitializeSocialHall } from './useInitializeSocialHall';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
      {children}
    </ApolloProvider>
  </BrowserRouter>
);

it('useChangeProjectChamberStatus', async () => {
  const { result } = renderHook(() => useInitializeSocialHall(), {
    wrapper: Wrapper,
  });

  act(async () => {
    const resp = await result.current.initializeSocialHall(1234567890);
    expect(typeof resp).toBe('void');
  });
});
