import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { cleanup, fireEvent, render } from '@/test-utils';
import { AttendeeDummyData } from './data';
import { SpeakerViewCarousel } from './SpeakerViewCarousel';

vi.mock('@/providers/SocialHallCallProvider', async () => {
  const consts = await vi.importActual<{
    SocialHallContextCallInitialValue: {};
  }>('@/screens/SocialHall/const');
  return {
    useSocialHallCallContext: vi
      .fn()
      .mockReturnValue(consts.SocialHallContextCallInitialValue),
  };
});

vi.mock('@/hooks', async () => ({
  useAttendeeManagement: vi.fn().mockReturnValue({
    onBlockUser: vi.fn(),
  }),
  useActiveSpeaker: vi.fn().mockReturnValue({
    activeSpeaker: [],
  }),
  useToggle: vi.fn().mockReturnValue([]),
  useMediaPreviewSettings: vi.fn().mockReturnValue({
    handleSelectOptions: vi.fn(),
    selectableOptions: [],
  }),
  useToast: vi.fn().mockReturnValue({
    addToast: vi.fn(),
  }),
  useWindowDimensions: vi.fn().mockReturnValue({
    width: 100,
  }),
}));

describe('SpeakerView', () => {
  afterEach(() => {
    cleanup();
  });

  test('Should not render without data', () => {
    const { queryByTestId } = render(
      <SpeakerViewCarousel
        speakerFeed={{ _id: '1' }}
        userFeeds={[]}
        maxVideoPerPage={0}
        clientHeight={0}
        clientWidth={0}
      />,
    );

    expect(queryByTestId('GalleryView')).toBeNull();
  });

  test('Click', () => {
    const { getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <SpeakerViewCarousel
          speakerFeed={{ _id: '1' }}
          userFeeds={AttendeeDummyData}
          maxVideoPerPage={3}
          clientHeight={0}
          clientWidth={0}
        />
        ,
      </ApolloProvider>,
    );

    fireEvent.click(getByTestId('previous'));
    fireEvent.click(getByTestId('next'));
  });
});
