import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { intersectionObserver } from '@/test-utils/stubs';
import { render, type RenderResult, cleanup, act } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { GetConnectedSpacesDocument } from '@/apollo/graphql';
import { client } from '@/apollo/client';
import GuestHome from '.';
import { getConnectedSpaces } from './mockdata';

const getConnectedSpacesMock = {
  request: {
    query: GetConnectedSpacesDocument,
    variables: {
      uid: '',
    },
  },
  result: () => ({ data: { getConnectedSpaces }, loading: false }),
};

const mocks = (): MockedResponse[] => [getConnectedSpacesMock];

const user = {
  _id: 'someId',
};

const emptyNoumsTitle = 'No Noums to Show Right Now';
const emptyNoumsDescription =
  'If you were invited to a Noum, please click on the invite link in the email you received.';

vi.mock('@/hooks/guest/useGuestHome', () => ({
  useGuestHome: vi.fn().mockImplementation(() => ({
    noums: [],
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

  test('Test for rendering Empty Noums page', async () => {
    const { container, getByTestId, getByText } = mocked;
    expect(container).toBeTruthy();
    expect(getByText(emptyNoumsTitle)).toBeInTheDocument();
    expect(
      getByText(emptyNoumsDescription, { exact: false }),
    ).toBeInTheDocument();
    expect(getByTestId('guest-home-empty')).toBeInTheDocument();
  });
});
