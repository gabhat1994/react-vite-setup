import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { fireEvent, render } from '@/test-utils';
import { MiniPlayer } from './MiniPlayer';

vi.mock('@/hooks/socialHall', () => ({
  useRefreshVisualizationSubscription: vi.fn().mockReturnValue({
    refreshVisualization: vi.fn(),
  }),

  useSocialHallCallContext: vi.fn().mockReturnValue({
    onLeaveCall: vi.fn(),
  }),
}));

describe('<MiniPlayer />', () => {
  test(`check MiniPlayer is displayed or not`, () => {
    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <MiniPlayer />
      </ApolloProvider>,
    );
    const PlayerWrapper = getByTestId('player_wrapper');
    expect(PlayerWrapper).toHaveStyle(`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    `);

    expect(getByTestId('player_wrapper')).toBeInTheDocument();
    expect(getByTestId('button_mute')).toBeInTheDocument();
    expect(getByTestId('button_close')).toBeInTheDocument();
    expect(getByTestId('button_leave')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test('check buttons clicked or not', () => {
    const { getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <MiniPlayer />
      </ApolloProvider>,
    );
    expect(getByTestId('button_mute')).toBeInTheDocument();
    expect(getByTestId('button_close')).toBeInTheDocument();
    expect(getByTestId('button_leave')).toBeInTheDocument();
    fireEvent.click(getByTestId('button_mute'));
    fireEvent.click(getByTestId('button_close'));
    fireEvent.click(getByTestId('button_leave'));
  });
});
