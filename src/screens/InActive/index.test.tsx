import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { render, type RenderResult, cleanup, act } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { client } from '@/apollo/client';
import { ActionType } from '@/apollo/generated/types';
import InActiveScreen from '.';

const user = {
  _id: 'someId',
  firstName: 'James',
  lastName: 'Alex',
  userStatus: ActionType.Rejected,
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
              <InActiveScreen />
            </MemoryRouter>
          </AuthProvider>
        </MockedProvider>,
      );
    });
  });

  afterAll(() => {
    cleanup();
  });

  test('Testing for rendering', async () => {
    await act(async () => {
      const { container } = render(
        <MockedProvider addTypename={false}>
          <AuthProvider client={client} initialUser={user}>
            <MemoryRouter initialEntries={initialEntries}>
              <InActiveScreen />
            </MemoryRouter>
          </AuthProvider>
        </MockedProvider>,
      );
      expect(container).toBeTruthy();
    });
  });

  test('InActive Wrapper rendering', () => {
    const { container, getByTestId } = mocked;
    const inActiveEle = getByTestId('inActive');

    expect(container).toBeTruthy();
    expect(inActiveEle).toBeTruthy();
    expect(inActiveEle).toHaveStyle(`
        background-color:  var(--bg-body-neutral-alt-highlighted);
        display: flex;
        height: 100vh;
      `);
  });

  test('InActive Component rendering', () => {
    const { container, getByTestId } = mocked;
    const inActiveEle = getByTestId('rejectedContainer');

    expect(container).toBeTruthy();
    expect(inActiveEle).toBeTruthy();
  });
});
