import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { intersectionObserver } from '@/test-utils/stubs';
import { render, type RenderResult, cleanup, act } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { GetConnectedSpacesDocument } from '@/apollo/graphql';
import { client } from '@/apollo/client';
import GuestHome from '.';
import { getConnectedSpaces as mockGetConnectedSpaces } from './mockdata';

const getConnectedSpacesMock = {
  request: {
    query: GetConnectedSpacesDocument,
    variables: {
      uid: '',
    },
  },
  result: () => ({
    data: { getConnectedSpaces: mockGetConnectedSpaces },
    loading: false,
  }),
};

const mocks = (): MockedResponse[] => [getConnectedSpacesMock];

const user = {
  _id: 'someId',
};

const usefulLinksTitle = 'Useful Links';
const browsingAsTitle = 'Browsing as:';
const noumsTitle = 'Noums you are connected to';
const mockedData = mockGetConnectedSpaces.data;
vi.mock('@/hooks/guest/useGuestHome', () => ({
  useGuestHome: vi.fn().mockImplementation(() => ({
    noums: mockedData,
    fetchMoreNoums: vi.fn().mockImplementation(() => Promise.resolve([])),
    loading: false,
    refetchNoums: vi.fn().mockImplementation(() => Promise.resolve([])),
    infiniteState: 'end',
    error: undefined,
  })),
}));

describe('<GuestHome />', () => {
  const initialEntries = ['/guest'];

  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(async () => {
    intersectionObserver.mock();
    await act(async () => {
      mocked = render(
        <MockedProvider addTypename={false} mocks={mocks()}>
          <AuthProvider client={client} initialUser={user}>
            <MemoryRouter initialEntries={initialEntries}>
              <GuestHome />
            </MemoryRouter>
          </AuthProvider>
        </MockedProvider>,
      );
    });
  });

  afterEach(() => {
    intersectionObserver.restore();
    cleanup();
  });

  test('Testing for rendering Guest Header menu', async () => {
    const { getByText } = mocked;
    expect(getByText(usefulLinksTitle)).toBeInTheDocument();
    expect(getByText(browsingAsTitle)).toBeInTheDocument();
  });

  test('Testing for rendering chambers list', async () => {
    const { container, getByTestId, getByText } = mocked;
    expect(container).toBeTruthy();
    expect(getByText(noumsTitle)).toBeInTheDocument();
    expect(getByTestId('guest-chambers-list')).toBeInTheDocument();
  });
});
