import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { UserStatus } from '@/apollo/generated/types';
import { render, type RenderResult, cleanup, act } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { client } from '@/apollo/client';
import { InActive } from './InActive';

const user = {
  _id: 'someId',
  firstName: 'James',
  lastName: 'Alex',
  userStatus: UserStatus.Rejected,
};

describe('<InActive />', () => {
  const initialEntries = ['/inactive'];
  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <MockedProvider addTypename={false}>
          <AuthProvider client={client} initialUser={user}>
            <MemoryRouter initialEntries={initialEntries}>
              <InActive userStatus="REJECTED" handleLogout={vi.fn()} />
            </MemoryRouter>
          </AuthProvider>
        </MockedProvider>,
      );
    });
  });

  afterAll(() => {
    cleanup();
  });

  test('InActive Component rendering', () => {
    const { getByTestId } = mocked;
    const inActiveEle = getByTestId('rejectedContainer');
    const titleEle = getByTestId('inActiveTitle');
    const inActiveSubTitle = getByTestId('inActiveSubTitle');
    expect(inActiveEle).toBeInTheDocument();
    expect(titleEle).toBeInTheDocument();
    expect(inActiveSubTitle).toBeInTheDocument();
  });
});
