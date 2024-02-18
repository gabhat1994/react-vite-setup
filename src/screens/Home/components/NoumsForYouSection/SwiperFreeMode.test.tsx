import { BrowserRouter } from 'react-router-dom';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import {
  act,
  cleanup,
  fireEvent,
  render,
  resizeWindow,
  waitFor,
} from '@/test-utils';
import { client } from '@/apollo/client';

import {
  GetProjectChambersDocument,
  CurrentUserDocument,
} from '@/apollo/graphql';
import { AuthProvider } from '@/features/auth/contexts';
import { RecommendedNoums } from './mockData';
import { SwiperFreeMode } from './SwiperFreeMode';

const currentUser = {
  _id: '624fbb408eaeb3c5fbe40eb2',
  access: true,
  userStatus: 'ACTIVE',
};

const currentUserMock = {
  request: {
    query: CurrentUserDocument,
  },
  result: () => ({ data: { currentUser } }),
};

const recommendedNoumIds = [
  '62cff49557c84e000f1dcff8',
  '62ea135bdbe0c8000e653f54',
  '62ea135bdbe0c8000e653f54',
  '62ea135bdbe0c8000e653f54',
];

const getRecommendedNoumsMock = {
  request: {
    query: GetProjectChambersDocument,
    variables: {
      filter: {
        spaceIds: recommendedNoumIds,
      },
    },
  },
  result: () => ({ data: RecommendedNoums }),
};

const mocks = (): MockedResponse[] => [
  getRecommendedNoumsMock,
  currentUserMock,
];

describe('NoumsForYouSection swiper mode', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render NoumsForYouSection swiper mode', async () => {
    const { container, getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={currentUser}>
          <BrowserRouter>
            <SwiperFreeMode recommendedNoumIds={recommendedNoumIds} />
          </BrowserRouter>
        </AuthProvider>
      </MockedProvider>,
    );

    await waitFor(() =>
      expect(getByTestId('SwiperTestId')).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(getByTestId('SwiperControlsTestId')).toBeInTheDocument(),
    );

    const prevButton = getByTestId('PrevBtnId');
    expect(prevButton).toHaveClass('disabled');

    const nextButton = getByTestId('NextBtnId');
    fireEvent.click(nextButton);
    expect(prevButton).not.toHaveClass('disabled');
    fireEvent.click(prevButton);

    expect(container).toBeTruthy();
    const slide = getByTestId('62d8b6d1c91711000d66d731');
    fireEvent.click(slide);

    act(() => {
      resizeWindow(424, 561);
    });

    act(() => {
      resizeWindow(767, 561);
    });

    act(() => {
      resizeWindow(1023, 561);
    });
  });

  it('No Swiper Test', async () => {
    const { container, getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={currentUser}>
          <BrowserRouter>
            <SwiperFreeMode recommendedNoumIds={[]} />
          </BrowserRouter>
        </AuthProvider>
      </MockedProvider>,
    );

    await waitFor(() =>
      expect(getByTestId('SwiperTestId')).toBeInTheDocument(),
    );
    expect(() => getByTestId('PrevBtnId')).toThrow();
    expect(() => getByTestId('NextBtnId')).toThrow();

    expect(container).toBeTruthy();
  });
});
