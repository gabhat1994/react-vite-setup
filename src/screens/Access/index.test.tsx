import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { render, type RenderResult, cleanup, act } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { client } from '@/apollo/client';
import Access from '.';

const user = {
  _id: 'someId',
  userStatus: 'UNREGISTERED',
};

describe('Access', () => {
  const initialEntries = ['/access'];

  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <MockedProvider addTypename={false}>
          <AuthProvider client={client} initialUser={user}>
            <MemoryRouter initialEntries={initialEntries}>
              <Access />
            </MemoryRouter>
          </AuthProvider>
        </MockedProvider>,
      );
    });
  });

  afterAll(() => {
    cleanup();
  });

  test('Testing for rendering', () => {
    const { container } = mocked;
    expect(container).toBeTruthy();
  });

  test('Page container rendering', () => {
    const { container, getByTestId } = mocked;
    const inActiveEle = getByTestId('t-nm-login');

    expect(container).toBeTruthy();
    expect(inActiveEle).toBeTruthy();
    expect(inActiveEle).toHaveStyle(`
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--bg-body-neutral-alt-highlighted);;
      height: 100vh; 
      `);
  });
});
