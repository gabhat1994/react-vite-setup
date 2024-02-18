import { client } from '@/apollo/client';
import { AuthProvider } from '@/features/auth/contexts';
import AppRoutes from '@/routes';
import { act, cleanup, render, type RenderResult } from '@/test-utils';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import { getSpaceByIdMock } from '@/apollo/utils/mocks';

const mocks = (): MockedResponse[] => [getSpaceByIdMock];

const user = {
  _id: 'someId',
};

describe('<HomeNoum />', () => {
  const initialEntries = ['/profile'];

  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <MockedProvider addTypename={false} mocks={mocks()}>
          <AuthProvider client={client} initialUser={user}>
            <QueryClientProvider client={new QueryClient()}>
              <MemoryRouter initialEntries={initialEntries}>
                <AppRoutes />
              </MemoryRouter>
            </QueryClientProvider>
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
