import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import { useToolbox } from './useToolbox';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

describe('useToolbox', () => {
  vi.mock('@/apollo/graphql', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { EWalletStatus: MockEWalletStatus } = await vi.importActual<any>(
      '@/screens/Money/Payments/Wallets/types',
    );
    return {
      useGetWalletQuery: vi.fn().mockReturnValue({
        data: {
          getWalletBalance: {
            status: MockEWalletStatus.CUSTOMER_VERIFIED,
          },
        },
      }),
    };
  });

  it('Open ToolBox', () => {
    const { result } = renderHook(() => useToolbox(), {
      wrapper: Wrapper,
    });
    act(() => {
      result.current.handleOpenToolbox('begin');
      result.current.handleOpenToolbox('end');
    });
    expect(result.current.tabWithOpenedToolboxes.length).toBeGreaterThan(0);
  });
  it('Close ToolBox', () => {
    const { result } = renderHook(() => useToolbox(), {
      wrapper: Wrapper,
    });
    act(() => {
      result.current.handleCloseToolbox();
      result.current.handleCloseToolbox();
    });
    expect(result.current.tabWithOpenedToolboxes.length).toBe(0);
  });
});
