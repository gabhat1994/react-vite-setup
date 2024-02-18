import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { render } from '@/test-utils';
import { type ISocialHallContext } from '@/screens/SocialHall/types';
import { useClient } from '@/hooks';
import SocialHall from './SocialHall';

const mockClass = vi.fn();

function updateSocialHallContext(value?: Partial<ISocialHallContext>) {
  mockClass.mockReturnValue({
    setShowBuzzRoom: vi.fn(),
    ...value,
  });
}

vi.mock('polished', () => ({
  cssVar: vi.fn(),
  rgba: vi.fn(),
}));

vi.mock('@/providers', () => ({
  useSocialHallContext: () => mockClass(),
}));

vi.mock('@/hooks', () => ({
  useSocialHallUsersAndGroupsData: vi.fn().mockReturnValue({
    users: [],
    groups: [],
  }),
  useVisualizationContainerDimensions: vi.fn().mockReturnValue({
    width: 1920,
    height: 1280,
  }),

  useWindowDimensions: vi.fn().mockReturnValue({
    width: 1920,
  }),
  useRefreshKnocks: vi.fn().mockReturnValue({
    userOwnKnocks: {},
    userActiveKnocks: {},
  }),
  useKnockSubscription: vi.fn().mockReturnValue({
    declinedKnocks: {},
  }),
}));

describe('<SocialHall />', () => {
  test(`check social hall rendered enough or not`, () => {
    updateSocialHallContext();
    const { container } = render(
      <>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <BrowserRouter>
                <SocialHall />
              </BrowserRouter>
            </ApolloProvider>
          );
        }}
      </>,
    );

    expect(container).toBeTruthy();
  });
});
