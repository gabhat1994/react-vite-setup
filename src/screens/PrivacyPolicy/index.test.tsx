import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { render, type RenderResult, cleanup, act } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import AppRoutes from '@/routes';
import { client } from '@/apollo/client';

const user = {
  _id: 'someId',
};

describe('<PrivacyPolicy />', () => {
  const initialEntries = ['/my-account/privacy-policy'];

  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <MockedProvider addTypename={false}>
          <AuthProvider client={client} initialUser={user}>
            <MemoryRouter initialEntries={initialEntries}>
              <AppRoutes />
            </MemoryRouter>
          </AuthProvider>
        </MockedProvider>,
      );
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('Testing for rendering', () => {
    const { container } = mocked;
    expect(container).toBeTruthy();
  });
});
